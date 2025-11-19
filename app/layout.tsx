import { IBM_Plex_Mono, Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import { Header } from './components/header'
import { ContactForm } from './components/contact-form'
import { Toaster } from './components/toaster'
import { BackToTop } from './components/back-to-top'
import { Footer } from './components/footer'



export const metadata = {
  title: {
    default: 'Home',
    template: '%s | Luiz.Vedoato'
  },
  icons: [
    {
      url: '/favicon.svg'
    }
  ]
}

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${plexMono.variable} ${playfair.variable}`}>
      <body>
        <div className="noise-overlay" />
        <Toaster />
        <BackToTop />

        <Header />
        {children}
        <ContactForm />
        <Footer />
      </body>
    </html>
  )
}
