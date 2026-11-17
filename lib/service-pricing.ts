export type PricingOption = {
  name: string;
  price: string;
  detail?: string;
  secondaryPrice?: string;
};

export type PricingGroup = {
  title: string;
  options: PricingOption[];
};

export type ServicePricingPage = {
  title: string;
  description: string;
  groups: PricingGroup[];
};

export const servicePricing: Record<string, ServicePricingPage> = {
  "website-design": {
    title: "Website Design",
    description: "Choose a clear starting point for your website, then add the features, hosting, and support that fit your business.",
    groups: [
      {
        title: "Starter options",
        options: [
          { name: "Starter Landing Page", price: "$300", detail: "A focused, mobile-friendly one-page site." },
          { name: "Basic Website", price: "$500", detail: "Up to 3 pages." },
          { name: "Small Business Website", price: "$750", detail: "Up to 5 pages." },
        ],
      },
      {
        title: "Business packages",
        options: [
          { name: "Professional Website", price: "$1,100", detail: "Up to 8 pages." },
          { name: "Advanced Website", price: "$1,500", detail: "Up to 10 pages." },
          { name: "Website Redesign", price: "From $600", detail: "Refresh your existing site." },
        ],
      },
      {
        title: "Specialty options",
        options: [
          { name: "E-commerce Starter Site", price: "From $1,500", detail: "Online store setup." },
          { name: "Custom / Advanced Website", price: "Quote required", detail: "Tailored features and functionality." },
        ],
      },
      {
        title: "Website add-ons",
        options: [
          { name: "Additional Page", price: "$65" },
          { name: "Landing Page", price: "$150" },
          { name: "Basic Logo", price: "$100" },
          { name: "Branding Package", price: "$200" },
          { name: "Copywriting", price: "$50 / page" },
          { name: "Advanced Form", price: "$100" },
          { name: "Booking System", price: "$150" },
          { name: "Payment Integration", price: "$150" },
          { name: "Blog / News Section", price: "$125" },
          { name: "Newsletter Signup", price: "$75" },
          { name: "Google Business Setup", price: "$100" },
          { name: "Local SEO Setup", price: "$175" },
          { name: "Photo Editing", price: "$15 / image" },
          { name: "Gallery / Portfolio", price: "$75" },
          { name: "Extra Revision Round", price: "$50" },
          { name: "Rush Service", price: "+25%", detail: "Surcharge." },
        ],
      },
      {
        title: "Website hosting & care",
        options: [
          { name: "Basic Hosting", price: "$15 / month", secondaryPrice: "$150 / year", detail: "Hosting, SSL or security certificate, basic uptime management, and deployment." },
          { name: "Managed Hosting", price: "$25 / month", secondaryPrice: "$250 / year", detail: "Everything in Basic, DNS or domain assistance, and minor technical troubleshooting." },
          { name: "Business Hosting + Maintenance", price: "$40 / month", secondaryPrice: "$400 / year", detail: "Hosting, minor content updates, routine maintenance, form testing, and basic technical support." },
          { name: "Premium Managed Website", price: "$60 / month", secondaryPrice: "$600 / year", detail: "Hosting, maintenance, priority support, and monthly website changes." },
        ],
      },
    ],
  },
  "photo-editing": {
    title: "Photo Editing",
    description: "Straightforward per-image pricing for quick corrections, detailed retouching, and advanced image work.",
    groups: [
      {
        title: "Editing tiers",
        options: [
          { name: "Basic Edit", price: "$10 / image", detail: "Color correction, lighting adjustment, cropping, resizing, and minor cleanup." },
          { name: "Professional Edit", price: "$15 / image", detail: "Retouching, blemish and background cleanup, moderate object removal, and detailed corrections." },
          { name: "Advanced Edit", price: "From $25 / image", detail: "Background replacement, people or object removal, composites, major restoration, and extensive manipulation." },
        ],
      },
      {
        title: "Bulk editing",
        options: [
          { name: "Bulk Editing", price: "Custom quote", detail: "For 10 or more images, including product catalogs, events, and business photography." },
        ],
      },
    ],
  },
  "voice-over-commercials": {
    title: "Voice-Over & Commercials",
    description: "Voice-only commercial and narration rates for radio, websites, social media, and other online placements. The catalog notes broadcast-ready MP3 or WAV delivery and three months of local radio or digital use.",
    groups: [
      {
        title: "Voice commercial pricing",
        options: [
          { name: "15-Second Voice Commercial", price: "$50", detail: "15 seconds." },
          { name: "30-Second Voice Commercial", price: "$75", detail: "30 seconds." },
          { name: "60-Second Voice Commercial", price: "$100", detail: "60 seconds." },
          { name: "90-Second Voice Commercial", price: "$125", detail: "90 seconds." },
          { name: "Voiceover Only", price: "$65", detail: "Up to 60 seconds." },
        ],
      },
      {
        title: "Commercial packages",
        options: [
          { name: "Quick Spot", price: "$75", detail: "15 seconds. Voice and basic editing." },
          { name: "Local Business", price: "$150", detail: "30 seconds. Script, voice, music, and editing." },
          { name: "Full Commercial", price: "$225", detail: "60 seconds. Script, voice, music, sound effects, and a professional mix." },
          { name: "Campaign Pack", price: "$500", detail: "Three commercials, up to 60 seconds each." },
        ],
      },
      {
        title: "Audio add-ons",
        options: [
          { name: "Additional Voice / Character", price: "+$40" },
          { name: "Scriptwriting", price: "+$40" },
          { name: "Background Music", price: "+$25" },
          { name: "Sound Effects", price: "+$20" },
          { name: "Advanced Audio Editing", price: "+$35" },
          { name: "Extra Revision", price: "+$20" },
          { name: "24-Hour Rush", price: "+25%", detail: "Surcharge applied to the total price." },
        ],
      },
    ],
  },
  "digital-marketing": {
    title: "Digital Marketing & Event Design",
    description: "Promotional design pricing for flyers, posters, social graphics, and coordinated event campaigns.",
    groups: [
      {
        title: "Flyers & posters",
        options: [
          { name: "Event Flyer – Single Side", price: "$40", detail: "Promotions, fundraisers, and events." },
          { name: "Double-Sided Flyer", price: "$60", detail: "More space for details." },
          { name: "Event Poster", price: "$50", detail: "Poster design for any event." },
          { name: "Theatre Show Poster", price: "$75", detail: "Productions and performances." },
        ],
      },
      {
        title: "Social & event graphics",
        options: [
          { name: "Social Media Event Graphic", price: "$25" },
          { name: "Matching Facebook Event Cover", price: "$25" },
          { name: "Digital Screen / Marquee Graphic", price: "$35" },
          { name: "Event Ticket Design", price: "$35" },
          { name: "Event Invitation", price: "$45" },
          { name: "Rush Service", price: "+25%", detail: "Surcharge for faster turnaround." },
        ],
      },
      {
        title: "Promotional packages",
        options: [
          { name: "Show Starter", price: "$125", detail: "Event or theatre poster, flyer, social media graphic, and Facebook cover." },
          { name: "Opening Night", price: "$225", detail: "Poster, flyer, social media graphics, 8-page program or playbill, and ticket design." },
          { name: "Full Production", price: "$350", detail: "Poster, flyer, social media graphics, 12-page program or playbill, ticket design, and up to 2 sponsor or ad layouts." },
          { name: "Full Season / Large Event", price: "From $500", detail: "Custom program or playbill and a complete promotional package. Quote depends on pages and pieces needed." },
        ],
      },
    ],
  },
  "programs-playbills": {
    title: "Programs & Playbills",
    description: "Clear page-count pricing for event programs and playbills, plus the extras that complete the package.",
    groups: [
      {
        title: "Program & playbill packages",
        options: [
          { name: "Simple 4-Page Event Program", price: "$100", detail: "For small events." },
          { name: "8-Page Program / Playbill", price: "$150", detail: "For theatres and larger events." },
          { name: "12-Page Program / Playbill", price: "$200", detail: "More room for cast, sponsors, and content." },
          { name: "16-Page Program / Playbill", price: "$250", detail: "For shows and full productions." },
          { name: "20-Page Program / Playbill", price: "$300", detail: "For larger events with more content." },
          { name: "24-Page Program / Playbill", price: "$350" },
        ],
      },
      {
        title: "Program add-ons",
        options: [
          { name: "Additional Program Pages", price: "$15 / page" },
          { name: "Program Advertisement Design", price: "$35 / ad" },
          { name: "QR Code / Sponsor Page Layout", price: "$30" },
          { name: "Program Content Changes After Approval", price: "$30 / hour" },
          { name: "Rush Service", price: "+25%", detail: "Surcharge for faster turnaround." },
        ],
      },
      {
        title: "Popular event packages",
        options: [
          { name: "Opening Night", price: "$225", detail: "Includes an 8-page program or playbill with matching promotional pieces." },
          { name: "Full Production", price: "$350", detail: "Includes a 12-page program or playbill and up to 2 sponsor or ad layouts." },
          { name: "Full Season / Large Event", price: "From $500", detail: "Custom program or playbill and a complete promotional package. Quote depends on pages and pieces needed." },
        ],
      },
    ],
  },
};

export const pricingSlugs = Object.keys(servicePricing);
