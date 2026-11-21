import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scottney & Co. | Websites, Design, Voice & Video",
  description: "Bold creative services for businesses: website design, photo editing, voice-over and commercials, digital marketing, flyers, posters, programs, and playbills.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  verification: {
    google: [
      "Em-I2ORHcjBWKneRMSj-Egg_MXpu_HE61jyWh8ISCds",
      "tz8dPF9ImSe6BjXCEwGZx8bHHPfMvrs_2MooND5IFZs",
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
