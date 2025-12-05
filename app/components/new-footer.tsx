import Link from "next/link"

interface Social {
    url: string
    iconSvg: string
}

interface NewFooterProps {
    socials?: Social[]
}

export function NewFooter({ socials = [] }: NewFooterProps) {
    return (
        <footer
            id="contact"
            className="py-12 px-6 mt-12 rounded-t-[3rem] mx-2 mb-2 shadow-2xl bg-zinc-900 text-white"
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
                            href="mailto:contact@luizvedoato.com"
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
                                            Link
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="pt-16 mt-16 border-t flex flex-col md:flex-row justify-between items-center gap-4 border-zinc-800">
                    <p className="text-xs text-zinc-500">
                        © {new Date().getFullYear()} Luiz Vedoato. Designed with Code.
                    </p>
                </div>
            </div>
        </footer>
    )
}
