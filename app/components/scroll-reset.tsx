"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ScrollReset() {
    const pathname = usePathname()

    useEffect(() => {
        // 1. Force scroll restoration to manual
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        // 2. Force scroll to top on mount
        window.scrollTo(0, 0);

        // 3. Clear hash without scrolling
        if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname);
        }

        // 4. Force top on unload (refresh)
        const handleUnload = () => {
            window.scrollTo(0, 0);
        };
        window.addEventListener('beforeunload', handleUnload);

        return () => {
            window.removeEventListener('beforeunload', handleUnload);
        }
    }, [pathname]);

    return null
}
