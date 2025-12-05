"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        // Force scroll to top on route change or initial load
        // We use setTimeout to ensure it runs after Next.js scroll restoration
        const handleScroll = () => {
            window.scrollTo(0, 0);
        };

        // Try immediate and with a small delay for effectiveness
        handleScroll();
        const timeoutId = setTimeout(handleScroll, 10);

        // Also disable native scroll restoration if possible
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        return () => clearTimeout(timeoutId);
    }, [pathname]);

    return null;
}
