'use client'

import Image from "next/image"
import Link from "next/link"
import { NavItem } from "./nav-item";
import { motion } from 'framer-motion'

const NAV_ITEM = [
    { 
        label: 'Home',
        href: '/'
    },
    {
        label: 'Projects',
        href: '/projects'
    }
]

export const Header = () => {
    return (
        <motion.header className="absolute top-0 w-full z-10 h-24 flex items-center justify-center" initial={{ top: -100 }}
        animate={{ top: 0 }}
        transition={{ duration: 0.5 }}>
            <div className="container flex items-center justify-between">
                <Link href="/">
                    <Image 
                    width={58} 
                    height={49} 
                    src="/images/logo.svg" 
                    alt="Logo"/>
                </Link>

                <nav className="flex item-center gap-4 sm:gap10">
                    {NAV_ITEM.map(item => (
                        <NavItem {...item} key={item.label}/>
                    ))}
                </nav>
            </div>
        </motion.header>
    );
}