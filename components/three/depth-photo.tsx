"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Real 3D from a real photograph: the photo is displaced by a depth map (Depth Anything V2, computed offline)
 * so near things (the bench, the railing, the lantern) move against the far dome as the pointer or the scroll moves.
 * Fullscreen quad, one texture fetch per channel, runs at display refresh rate.
 */

const vert = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const frag = /* glsl */ `
precision highp float;
uniform sampler2D uTex;
uniform sampler2D uDepth;
uniform vec2 uPointer;
uniform float uScroll;
uniform float uReveal;
uniform vec2 uCover;   // scale applied to uv so the photo covers the canvas
uniform vec2 uFocus;   // which part of the photo stays in frame on narrow screens
varying vec2 vUv;

void main() {
  vec2 uv = (vUv - 0.5) * uCover + uFocus;
  float d = texture2D(uDepth, uv).r;
  // Parallax: near pixels travel further than far ones.
  vec2 off = uPointer * (d - 0.35) * 0.028;
  // Scroll dolly: the camera pushes in, the foreground comes toward you faster than the dome.
  float push = uScroll * (0.10 + d * 0.10);
  vec2 p = (uv - uFocus) * (1.0 - push) + uFocus + off;
  // Reveal: starts slightly pushed in and settles back.
  p = (p - uFocus) * (1.0 - (1.0 - uReveal) * 0.08) + uFocus;
  vec3 c = texture2D(uTex, clamp(p, 0.001, 0.999)).rgb;
  // Night grade: lift the sodium lamps, sink everything else.
  float lum = dot(c, vec3(0.299, 0.587, 0.114));
  c = mix(c * 0.62, c, smoothstep(0.55, 0.95, lum));
  c *= mix(1.0, 0.45, uScroll);
  // Vignette
  vec2 q = vUv - 0.5;
  c *= 1.0 - dot(q, q) * 0.9;
  // Premultiplied alpha: the still photo underneath shows until the 3D version has faded in.
  gl_FragColor = vec4(c * uReveal, uReveal);
}
`;

type Props = {
  src: string;
  depth: string;
  imageAspect: number;
  /** Horizontal focus point (0..1) kept in frame when the screen is narrower than the photo. */
  focusX?: number;
  progress: { current: number };
};

function Plane({ src, depth, imageAspect, focusX = 0.5, progress }: Props) {
  const { size, gl } = useThree();
  const pointer = useRef(new THREE.Vector2());
  const target = useRef(new THREE.Vector2());
  const reveal = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTex: { value: null as THREE.Texture | null },
      uDepth: { value: null as THREE.Texture | null },
      uPointer: { value: new THREE.Vector2() },
      uScroll: { value: 0 },
      uReveal: { value: 0 },
      uCover: { value: new THREE.Vector2(1, 1) },
      uFocus: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [],
  );

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    let alive = true;
    loader.load(src, (t) => {
      if (!alive) return;
      // Keep sRGB values as they are: the raw shader writes them straight out.
      t.colorSpace = THREE.NoColorSpace;
      t.anisotropy = gl.capabilities.getMaxAnisotropy();
      t.minFilter = THREE.LinearMipmapLinearFilter;
      uniforms.uTex.value = t;
    });
    loader.load(depth, (t) => {
      if (!alive) return;
      t.colorSpace = THREE.NoColorSpace;
      uniforms.uDepth.value = t;
    });
    return () => {
      alive = false;
      uniforms.uTex.value?.dispose();
      uniforms.uDepth.value?.dispose();
    };
  }, [src, depth, gl, uniforms]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.current.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    // Cover fit, with an overscan margin so the parallax never shows an edge.
    const canvasAspect = size.width / size.height;
    const over = 0.9;
    const cover =
      canvasAspect > imageAspect
        ? new THREE.Vector2(over, (imageAspect / canvasAspect) * over)
        : new THREE.Vector2((canvasAspect / imageAspect) * over, over);
    uniforms.uCover.value.copy(cover);
    const half = cover.x / 2;
    uniforms.uFocus.value.set(Math.min(Math.max(focusX, half + 0.02), 1 - half - 0.02), 0.5);
  }, [size, imageAspect, focusX, uniforms]);

  useFrame((state, dt) => {
    if (!uniforms.uTex.value || !uniforms.uDepth.value) return;
    const t = state.clock.elapsedTime;
    const coarse = !matchMedia("(pointer: fine)").matches;
    // Touch screens get a slow orbit instead of the pointer.
    if (coarse) target.current.set(Math.sin(t * 0.35) * 0.8, Math.cos(t * 0.27) * 0.45);
    const k = 1 - Math.exp(-dt * 3.2);
    pointer.current.lerp(target.current, k);
    uniforms.uPointer.value.copy(pointer.current);
    uniforms.uScroll.value += (progress.current - uniforms.uScroll.value) * (1 - Math.exp(-dt * 8));
    reveal.current = Math.min(1, reveal.current + dt / 1.6);
    uniforms.uReveal.value = 1 - Math.pow(1 - reveal.current, 3);
  });

  // Built imperatively so the material holds this exact uniforms object (a JSX prop would be copied,
  // and textures assigned later would never reach the GPU).
  const material = useMemo(
    () => new THREE.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms, depthTest: false, depthWrite: false }),
    [uniforms],
  );
  useEffect(() => () => material.dispose(), [material]);

  return (
    <mesh frustumCulled={false} material={material}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
}

export function DepthPhoto(props: Props) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      flat
      linear={false}
      className="!absolute inset-0"
      aria-hidden
    >
      <Plane {...props} />
    </Canvas>
  );
}
