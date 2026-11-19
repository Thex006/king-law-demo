import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Privacy | The King Law Office" };

export default function Privacy() {
  return (
    <LegalPage title="Privacy">
      <p>This page explains what happens to the information you send through the consultation form.</p>
      <h2>What we collect</h2>
      <p>Your name, phone number, optional email, a short description of the charge, an optional court date and an optional note. Nothing else is tracked: no advertising cookies and no analytics.</p>
      <h2>How it is used</h2>
      <p>Only to call you back about a consultation. It is never sold or shared.</p>
      <h2>Keep details out of the form</h2>
      <p>Please do not describe the facts of your case in the form. Save that for the consultation, where it is protected by attorney client confidentiality once representation is agreed.</p>
      <h2>This concept build</h2>
      <p>In this demonstration, form requests are stored only on the computer running the site and are not sent anywhere.</p>
    </LegalPage>
  );
}
