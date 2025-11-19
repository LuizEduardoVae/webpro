'use client'

import Link from 'next/link'
import { NavItem } from './nav-item'

const NAV_ITEMS = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'About',
        href: '/#about',
    },
    {
        label: 'Contact',
        href: '/#contact',
    },
]

export const Header = () => {
    return (
        <header className="absolute top-0 w-full z-10 h-24 flex items-center justify-center">
            <div className="container flex items-center justify-between">
                <Link href="/">
                    <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-text-primary">Pulse Robot</span>
                    </div>
                </Link>

                <nav className="flex items-center gap-8 sm:gap-10">
                    {NAV_ITEMS.map((item) => (
                        <NavItem {...item} key={item.label} />
                    ))}
                </nav>
            </div>
        </header>
    )
}