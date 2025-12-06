"use client"

import Link from "next/link"
import Image from "next/image"

interface NewHeaderProps {
    profilePicture?: string
}

export function NewHeader({ profilePicture }: NewHeaderProps) {
    return (
        <nav className="fixed top-0 w-full z-50 glass-nav border-b border-zinc-100/50">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs transition-transform group-hover:rotate-12 bg-zinc-900 text-white overflow-hidden relative">
                        {profilePicture ? (
                            <Image
                                src={profilePicture}
                                alt="Profile"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            "LV"
                        )}
                    </div>
                    <span className="text-sm font-semibold tracking-tight text-zinc-900">
                        Luiz.Vedoato
                    </span>
                </Link>
                <div className="hidden md:flex items-center gap-1 p-1 rounded-full border backdrop-blur-sm border-zinc-200/50 bg-white/50">
                    <Link
                        href="#projects"
                        className="px-4 py-1.5 text-xs font-medium text-zinc-500 rounded-full transition-all hover:text-zinc-900 hover:bg-zinc-100"
                    >
                        Projects
                    </Link>
                    <Link
                        href="#videos"
                        className="px-4 py-1.5 text-xs font-medium text-zinc-500 rounded-full transition-all hover:text-zinc-900 hover:bg-zinc-100"
                    >
                        Videos
                    </Link>
                    <Link
                        href="#research"
                        className="px-4 py-1.5 text-xs font-medium text-zinc-500 rounded-full transition-all hover:text-zinc-900 hover:bg-zinc-100"
                    >
                        Research Area
                    </Link>
                    <Link
                        href="#me"
                        className="px-4 py-1.5 text-xs font-medium text-zinc-500 rounded-full transition-all hover:text-zinc-900 hover:bg-zinc-100"
                    >
                        Me
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <Link
                        href="#contact"
                        className="hidden sm:inline-flex items-center justify-center h-9 px-4 text-xs font-medium rounded-full transition-transform active:scale-95 shadow-lg text-white bg-zinc-900 hover:bg-zinc-800 shadow-zinc-200"
                    >
                        Entre em contato
                    </Link>
                </div>
            </div>
        </nav>
    )
}

