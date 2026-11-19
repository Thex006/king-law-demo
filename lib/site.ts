/**
 * Every fact on the site lives here. All of it is verified (sources below); nothing is invented.
 * Sources, checked 2026-11-19:
 *  - Google Maps listing "The King Law Office, LLC" (5.0, 11 reviews, no website on the listing)
 *  - Avvo profile 5371609 (licence, education, work history, fees, payment methods)
 */
export const site = {
  name: "The King Law Office",
  legalName: "The King Law Office, LLC",
  attorney: "Taylor Anne King",
  attorneyShort: "Taylor King",
  practice: "Criminal defense",
  url: "http://localhost:3003",
  description:
    "Criminal defense in Savannah from Taylor King, a former Georgia public defender. Free 60 minute consultation at 100 Bull Street.",
  phone: { display: "(912) 470-9324", href: "tel:+19124709324" },
  address: {
    street: "100 Bull St, Suite 200",
    city: "Savannah",
    region: "GA",
    zip: "31401",
    full: "100 Bull St, Suite 200, Savannah, GA 31401",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=The+King+Law+Office+LLC+100+Bull+St+Suite+200+Savannah+GA+31401",
  },
  rating: { value: "5.0", count: 11, source: "Google" },
  licensed: { state: "Georgia", year: 2016, standing: "Active member in good standing" },
  education: [
    { year: 2016, school: "University of Georgia", degree: "Juris Doctor" },
    { year: 2013, school: "Clemson University", degree: "Philosophy and history" },
  ],
  career: [
    { years: "2024 to now", role: "Owner and solo attorney", org: "The King Law Office, LLC" },
    {
      years: "2018 to 2024",
      role: "Assistant public defender",
      org: "Office of the Public Defender, Eastern Judicial Circuit",
    },
    { years: "2017 to 2018", role: "Associate attorney", org: "Jarrett & Price, LLC" },
    {
      years: "2017",
      role: "Assistant public defender",
      org: "Office of the Public Defender, Middle Judicial Circuit",
    },
    { years: "2016", role: "Legal intern", org: "Office of the Public Defender, Piedmont Judicial Circuit" },
  ],
  fees: {
    consultation: "Free for the first 60 minutes",
    hourly: "$250 per hour",
    payment: ["Cash", "Check", "Credit card"],
  },
} as const;

export const navLinks = [
  { href: "#record", label: "Record" },
  { href: "#process", label: "Your case" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "Questions" },
] as const;

/** Real Google reviews, quoted word for word. Cuts are marked with an ellipsis; only spacing was tidied. */
export type Review = { name: string; when: string; quote: string; highlight?: string };
export const reviews: Review[] = [
  {
    name: "Tyrone Oliver",
    when: "a year ago",
    highlight: "My case has been dismissed",
    quote:
      "Because of her my case has been dismissed due to her professional work ethic. I would highly recommend.",
  },
  {
    name: "Quintrell Roundtree",
    when: "2 months ago",
    highlight: "She kept me informed",
    quote:
      "From beginning to end, she was professional, knowledgeable, and dedicated to making sure I was taken care of. She kept me informed, answered my questions, and made sure I understood what was happening every step of the way.",
  },
  {
    name: "WISEMAN",
    when: "2 months ago",
    highlight: "Charges dismissed",
    quote:
      "Ms. KING from my experience is one of the Best Criminal Defense lawyer in Chatham County for sure… Charges Dismissed and have since referred Ms. KING to friends and family.",
  },
  {
    name: "Jen Jones",
    when: "11 months ago",
    highlight: "I never felt alone",
    quote:
      "She approached my case with compassion, confidence, and determination, and I always felt heard and supported. Her guidance was calm, steady, and incredibly effective. I never felt alone—I knew I had someone in my corner who was fighting for the best possible outcome.",
  },
  {
    name: "Tommie King-Bey",
    when: "2 months ago",
    highlight: "Well worth it",
    quote:
      "She did a great job with my case and helped get me back in good standing, which I’m very grateful for. I know everyone’s case and costs can be different, but I personally felt that the money I spent was well worth it for the quality of representation and peace of mind I received.",
  },
  {
    name: "Shquavia Shiggs",
    when: "2 months ago",
    highlight: "She will fight for you",
    quote: "We couldn’t ask for a better lawyer who actually know the law. She will fight for you.",
  },
  {
    name: "Jamee j Chalker",
    when: "a year ago",
    highlight: "Responsive",
    quote: "Extremely professional, caring, responsive, and handles her cases like they are her babies.",
  },
  {
    name: "bunni",
    when: "6 months ago",
    highlight: "Always there when you call",
    quote: "…she is always there when you call and she definitely means business…",
  },
];

/**
 * The stages of a Georgia criminal case. General process information, not legal advice,
 * so nothing here is a claim about a particular result.
 */
export const stages = [
  {
    n: "01",
    title: "Arrest and bond",
    image: "/images/savannah-street-night.jpg",
    alt: "A Savannah street at night with string lights over the road and cars passing",
    what: "After an arrest you go before a judge for a first appearance, usually within 48 to 72 hours, where bond is often set.",
    move: "Do not explain the facts to anyone. Ask for a lawyer, then call. The free consultation can start the same week.",
  },
  {
    n: "02",
    title: "Arraignment",
    image: "/images/columns.jpg",
    alt: "Stone columns of a courthouse portico seen from below against a cloudy sky",
    what: "The formal charges are read in court and you enter a plea. Deadlines for motions start running from here.",
    move: "Walk in knowing exactly what the State has charged and what each count can carry.",
  },
  {
    n: "03",
    title: "Discovery",
    image: "/images/gavel-spot.jpg",
    alt: "A single wooden gavel standing upright under a spotlight on a dark background",
    what: "The State hands over its evidence: police reports, body camera video, lab results and witness statements.",
    move: "Every page and every minute of video gets read against the story the State wants to tell.",
  },
  {
    n: "04",
    title: "Motions and negotiation",
    image: "/images/signing.jpg",
    alt: "Two people at a dark table, one signing a document",
    what: "Your lawyer can challenge how evidence was gathered, and talks with the prosecutor about the case.",
    move: "Weak evidence gets challenged. Any offer is explained to you plainly, and the decision stays yours.",
  },
  {
    n: "05",
    title: "Resolution or trial",
    image: "/images/gavel-dark.jpg",
    alt: "A wooden gavel resting on its block in low light",
    what: "A case can end in dismissal, a negotiated outcome, or a trial before a judge or jury.",
    move: "You get a straight assessment of your options at every step, never a promise no lawyer can keep.",
  },
] as const;

export const faqs = [
  {
    q: "Is the first consultation really free?",
    a: "Yes. The first 60 minutes with Taylor King cost nothing. You can talk through what happened, the charge and the next court date before you decide anything.",
  },
  {
    q: "What does it cost after that?",
    a: "Her listed rate is $250 per hour, and she takes cash, check or credit card. You will know how billing works for your case before any paid work starts.",
  },
  {
    q: "What kinds of cases does she take?",
    a: "Criminal defense only. If you have been arrested, charged, or think charges are coming, that is exactly the work this office does.",
  },
  {
    q: "I was just arrested. What should I do right now?",
    a: "Stay calm and be polite, but do not discuss the facts with police, other inmates or anyone on a recorded jail phone. Ask for a lawyer, then call (912) 470-9324.",
  },
  {
    q: "Was she really a public defender?",
    a: "Yes. She was an assistant public defender in Georgia's Middle Judicial Circuit in 2017 and in the Eastern Judicial Circuit, which covers Chatham County, from 2018 to 2024.",
  },
  {
    q: "Can you promise my case will be dismissed?",
    a: "No honest lawyer can promise an outcome. What you get is a clear read of the evidence, your options at every stage, and a lawyer who fights for the best result the facts allow.",
  },
  {
    q: "Where is the office?",
    a: "100 Bull St, Suite 200, Savannah, GA 31401, in the historic district.",
  },
] as const;
