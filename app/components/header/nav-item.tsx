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
                "text-gray-300 flex items-center gap-2 font-medium font-mono transition-colors duration-300",
                isActive && 'text-[#d1bcff]'
            )}
        >
            <span className={cn("text-gray-300", isActive && 'text-[#d1bcff]')}>#</span>
            {label}
        </Link>
    );
};