import {
  Inter,
  IBM_Plex_Mono,
  Playfair_Display,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "./components/toaster";
import { BackToTop } from "./components/back-to-top";
import ScrollToTop from "./components/scroll-to-top";
import { ScrollReset } from "./components/scroll-reset";

export const metadata = {
  title: {
    default: "Home",
    template: "%s | Luiz.Vedoato",
  },
  icons: [
    {
      url: "/favicon.svg",
    },
  ],
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${plexMono.variable} ${playfair.variable} scroll-smooth`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-black selection:text-white bg-surface text-primary font-body">
        <ScrollReset />
        <ScrollToTop />
        <Toaster />
        <BackToTop />
        {children}
      </body>
    </html>
  );
}
