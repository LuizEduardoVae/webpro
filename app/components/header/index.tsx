'use client';

import Link from "next/link";
import { motion } from "framer-motion";

const NAV_ITEMS = [
    { label: 'HOME', href: '/' },
    { label: 'WORKS', href: '/#projects' },
    { label: 'BOOKMARKS', href: '/#bookmarks' },
    { label: 'DESIGN GALLERY', href: '/#gallery' },
];

export const Header = () => {
    return (
        <motion.header
            className="absolute top-0 w-full z-50 flex items-center justify-between px-8 py-8 text-sm font-semibold tracking-wide text-gray-800 uppercase"
            initial={{ top: -100 }}
            animate={{ top: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Left: Navigation */}
            <nav className="flex items-center gap-8">
                {NAV_ITEMS.map((item) => (
                    <Link href={item.href} key={item.label} className="hover:text-black transition-colors">
                        {item.label}
                    </Link>
                ))}
            </nav>

            {/* Right: Location & Time */}
            <div className="flex items-center gap-12 hidden sm:flex">
                <span>RIO DE JANEIRO, BRASIL</span>
                <span>09:00 PM GMT-3</span>
            </div>
        </motion.header>
    );
};