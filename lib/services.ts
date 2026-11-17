export type Service = {
  number: string;
  title: string;
  color: "pink" | "teal" | "orange";
  intro: string;
  detail: string;
  includes: string[];
  idealFor: string[];
};

export const services: Service[] = [
  {
    number: "01",
    title: "Website Design",
    color: "pink",
    intro: "A clear, polished online home built to turn visitors into customers.",
    detail:
      "We design and build a focused, mobile-friendly site that says who you are, what you offer, and why it matters—then makes the next step obvious. No bloated templates, no confusing menus, just a clean path from first visit to first contact.",
    includes: [
      "Custom, mobile-friendly page design",
      "Sales-focused copy and calls to action",
      "Contact forms and social links",
      "Launch support for your domain and hosting",
    ],
    idealFor: ["New businesses launching online", "Brands outgrowing a DIY site", "Service providers who need to convert visitors"],
  },
  {
    number: "02",
    title: "Photo Editing",
    color: "teal",
    intro: "Clean, professional images ready for print, web, social, or personal use.",
    detail:
      "Send us the raw shots and we return polished, consistent images. From subtle retouching to full background swaps, every file is delivered in the exact sizes and formats you need across every channel.",
    includes: [
      "Retouching and color correction",
      "Background removal or replacement",
      "Cropping, resizing, and cleanup",
      "Files delivered in the formats you need",
    ],
    idealFor: ["Product and e-commerce listings", "Headshots and team photos", "Event and portfolio galleries"],
  },
  {
    number: "03",
    title: "Voice-Over",
    color: "orange",
    intro: "Warm, engaging narration that gives your message a confident voice.",
    detail:
      "A great read makes people listen. We record, clean, and master narration that fits your tone—whether that is a polished commercial, an explainer, or an on-brand social clip—complete with direction and a revision round.",
    includes: [
      "Commercial and promotional reads",
      "Social, web, and presentation audio",
      "Cleaned and mastered audio files",
      "Direction and one revision round",
    ],
    idealFor: ["Ads and promos", "Explainer and training videos", "Phone systems and presentations"],
  },
  {
    number: "04",
    title: "Voice Commercials",
    color: "orange",
    intro: "Professional voice ads for radio, websites, social media, and more.",
    detail:
      "We create polished, voice-led commercials that make your message clear and memorable. From concept and script to a confident recorded read, we deliver clean, ready-to-use audio for radio and online placements.",
    includes: [
      "Concept and script development",
      "Professional voice recording",
      "Audio editing and mastering",
      "Files prepared for radio, web, and social",
    ],
    idealFor: ["Radio ads", "Website and social media promotions", "Business, product, and service launches"],
  },
  {
    number: "05",
    title: "Digital Marketing",
    color: "pink",
    intro: "Bold, on-brand graphics that make your offer impossible to miss.",
    detail:
      "Flyers, posters, and social graphics that stop the scroll and read clearly at a glance. Every asset is built from one visual direction so your campaign feels cohesive across print and screen.",
    includes: [
      "Flyers and event posters",
      "Social media graphics",
      "Promotional campaign assets",
      "Print-ready and digital files",
    ],
    idealFor: ["Events and grand openings", "Seasonal promotions", "Multi-channel campaigns"],
  },
  {
    number: "06",
    title: "Programs & Playbills",
    color: "teal",
    intro: "Well-organized programs that help every event feel thoughtfully produced.",
    detail:
      "We lay out programs that are easy to read and a pleasure to keep. Covers, cast and sponsor pages, agendas, and ad placements—all arranged into a clean, print-ready keepsake.",
    includes: [
      "Custom cover and interior design",
      "Cast, speaker, sponsor, or agenda layouts",
      "Photo and advertisement placement",
      "Print-ready final files",
    ],
    idealFor: ["Theater and performances", "Galas and fundraisers", "Conferences and ceremonies"],
  },
];
