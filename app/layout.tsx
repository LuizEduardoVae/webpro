import { Inter, IBM_Plex_Mono, Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import { NewHeader } from './components/new-header'
import { ContactForm } from './components/contact-form'
import { Toaster } from './components/toaster'
import { BackToTop } from './components/back-to-top'
import { NewFooter } from './components/new-footer'

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

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

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
    <html lang="pt-BR" className={`${inter.variable} ${dmSans.variable} ${plexMono.variable} ${playfair.variable} scroll-smooth`}>
      <body className="antialiased selection:bg-rose-200 selection:text-rose-900 bg-white text-zinc-800">
        <div className="fixed inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] bg-white"></div>
        <Toaster />
        <BackToTop />

        <NewHeader />
        {children}
        {/* ContactForm might be redundant with the new footer contact section, but keeping it for now if needed, though the new design has a footer with email. I'll comment it out to match new design aesthetics strictly. */}
        {/* <ContactForm /> */}
        {/* Actually, the new footer expects props. I'll need to fetch them or pass them. 
            Layout server components can't easily fetch page-specific data unless I move the footer to page.tsx or fetch globally.
            For now, I'll render NewFooter without props in Layout, or move NewFooter to page.tsx. 
            The design has the footer as part of the page flow. 
            However, usually Footer is in Layout. 
            The `NewFooter` takes `socials`. I can't fetch `pageData` in RootLayout easily without making it async and fetching the same query.
            I will keep NewFooter in Layout but I'll need to handle the data. 
            Alternatively, I can accept that `socials` might be empty in the layout for now, or move Footer to page.tsx.
            Given the user wants to "replace layout", I'll stick to Layout.tsx for structural components.
            But wait, `RootLayout` doesn't fetch data.
            I will remove `NewFooter` from `RootLayout` and put it in `page.tsx` so I can pass the fetched data.
            Same for `NewHeader`? No, Header is static links mostly.
        */}
      </body>
    </html>
  )
}
