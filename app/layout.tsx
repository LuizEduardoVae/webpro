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

import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Luiz Vedoato | Pesquisador em Data Science & Engenharia Elétrica - UFES",
  description:
    "Portfólio de Luiz Vedoato, pesquisador em Data Science e estudante de Engenharia Elétrica na UFES. Projetos em Machine Learning, Medição Multifásica e conteúdo educativo no YouTube.",
  keywords: [
    "Data Science",
    "Engenharia Elétrica",
    "UFES",
    "Machine Learning",
    "Medição Multifásica",
    "Pesquisador",
    "Luiz Vedoato",
  ],
  authors: [{ name: "Luiz Vedoato" }],
  metadataBase: new URL("https://luizvedoatowebsite.vercel.app"),
  openGraph: {
    title:
      "Luiz Vedoato | Pesquisador em Data Science & Engenharia Elétrica - UFES",
    description:
      "Portfólio de Luiz Vedoato, pesquisador em Data Science e estudante de Engenharia Elétrica na UFES. Projetos em Machine Learning, Medição Multifásica e conteúdo educativo no YouTube.",
    url: "https://luizvedoatowebsite.vercel.app",
    siteName: "Luiz Vedoato Website",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Luiz Vedoato | Pesquisador em Data Science & Engenharia Elétrica - UFES",
    description:
      "Portfólio de Luiz Vedoato, pesquisador em Data Science e estudante de Engenharia Elétrica na UFES. Projetos em Machine Learning, Medição Multifásica e conteúdo educativo no YouTube.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Luiz Vedoato",
              url: "https://luizvedoatowebsite.vercel.app",
              jobTitle:
                "Pesquisador em Data Science & Estudante de Engenharia Elétrica",
              worksFor: {
                "@type": "Organization",
                name: "UFES",
              },
            }),
          }}
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
