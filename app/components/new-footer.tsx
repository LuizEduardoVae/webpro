import Link from "next/link"

interface Social {
    url: string
    iconSvg: string
}

interface NewFooterProps {
    socials?: Social[]
}

export function NewFooter({ socials = [] }: NewFooterProps) {
    const getSocialName = (url: string) => {
        if (url.includes('youtube')) return 'YouTube';
        if (url.includes('instagram')) return 'Instagram';
        if (url.includes('twitter') || url.includes('x.com')) return 'X / Twitter';
        if (url.includes('linkedin')) return 'LinkedIn';
        if (url.includes('github')) return 'GitHub';
        if (url.includes('lattes')) return 'Lattes Curriculum';
        if (url.includes('researchgate')) return 'ResearchGate';
        return 'Link';
    };

    return (
        <footer
            id="contact"
            className="py-12 px-6 mt-24 w-full bg-zinc-900 text-white"
        >
            <div className="max-w-5xl mx-auto py-12">
                <div className="flex flex-col md:flex-row justify-between gap-12 items-start">
                    <div>
                        <div className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm mb-6 bg-white text-zinc-900">
                            LV
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                            Let&apos;s build something.
                        </h2>
                        <p className="mb-8 max-w-sm text-zinc-400">
                            Collaborations, sponsorships, or just saying hello. I check my
                            emails frequently.
                        </p>
                        <a
                            href="mailto:retro-54.wicket@icloud.com"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors bg-white text-zinc-900 hover:bg-zinc-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                role="img"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                            >
                                <g
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                >
                                    <path d="m22 7l-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                </g>
                            </svg>
                            Send Email
                        </a>
                    </div>

                    <div className="grid grid-cols-2 gap-16">
                        <div>
                            <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-6">
                                Socials
                            </h4>
                            <ul className="space-y-4">
                                {socials.map((social, index) => (
                                    <li key={index}>
                                        <a
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="transition-colors flex items-center gap-2 text-zinc-300 hover:text-white"
                                        >
                                            <div
                                                dangerouslySetInnerHTML={{ __html: social.iconSvg }}
                                                className="w-4 h-4 [&>svg]:w-full [&>svg]:h-full"
                                            />
                                            {getSocialName(social.url)}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="pt-16 mt-16 border-t flex flex-col md:flex-row justify-between items-center gap-4 border-zinc-800">
                    <p className="text-xs text-zinc-500">
                        © {new Date().getFullYear()} Luiz Vedoato.
                    </p>
                </div>
            </div>
        </footer>
    )
}
