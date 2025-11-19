import { cn } from "@/app/lib/utils";
import Link from "next/link";
import { usePathname } from 'next/navigation';

type NavItemProps = {
    label: string;
    href: string;
};

export const NavItem = ({ label, href }: NavItemProps) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={cn(
                "text-text-secondary flex items-center gap-2 font-medium font-mono text-sm hover:text-primary transition-colors",
                isActive && "text-text-primary"
            )}
        >
            {label}
        </Link>
    );
};