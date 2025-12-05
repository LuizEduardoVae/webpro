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
        <ScrollToTop />
        <div className="fixed inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] bg-white"></div>
        <Toaster />
        <BackToTop />

        {/* Note: ProfilePicture needs to be fetched. RootLayout is a server component but it's tricky to pass async data to client components if not careful. 
            However, NewHeader is a Client Component (it was marked "use client" in my previous thought, but let me check).
            Actually, NewHeader was not "use client" in the file content I wrote (Step 35), but it imports Link.
            Wait, I need to fetch the profile picture here to pass it. 
            BUT RootLayout wraps everything. 
            I'll temporarily mock it or fetch it if I can make RootLayout async (Next.js 13+ supports it).
            However, I already have `getPageData` in `page.tsx`.
            To avoid prop drilling or double fetching, I will remove NewHeader from RootLayout and add it to page.tsx 
            where I have the data, as discussed before.
            
            Let's REMOVE NewHeader from here.
         */}
        {/* <NewHeader /> moved to page.tsx to access data */}
        {children}
        {/* ContactForm might be redundant with the new footer contact section, but keeping it for now if needed, though the new design has a footer with email. I'll comment it out to match new design aesthetics strictly. */}
        {/* <ContactForm /> */}
      </body>
    </html>
  )
}
