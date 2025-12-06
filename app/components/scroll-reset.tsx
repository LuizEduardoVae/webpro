"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ScrollReset() {
    const pathname = usePathname()

    useEffect(() => {
        // Force scroll to top on mount (reload)
        window.scrollTo(0, 0);

        // If there's a hash in the URL, remove it without scrolling to it
        if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname);
        }
    }, [pathname]); // Runs on route change too, which is generally good for SPA nav

    return null
}
