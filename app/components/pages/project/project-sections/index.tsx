import Image from "next/image"
import { ProjectSection } from "@/app/types/projects"

type ProjectSectionsProps = {
    sections?: ProjectSection[]
}

export const ProjectSections = ({ sections }: ProjectSectionsProps) => {
    if (!Array.isArray(sections)) return null;

    return (
        <section className="container my-12 md:my-32 flex flex-col gap-8 md:gap-32">
            {sections.map((section, index) => (
                <div key={section.title || index} className="flex flex-col items-center gap-6 md:gap-12">
                    {section.title && (
                        <h2 className="text-2xl md:text-3xl text-white">
                            {section.title}
                        </h2>
                    )}
                    {section.image?.url && (
                        <Image
                            src={section.image.url}
                            width={1080}
                            height={672}
                            alt={`Imagem da Sessão ${section.title || ''}`}
                            className="w-full aspect-auto rounded-lg object-cover"
                            unoptimized
                        />
                    )}
                </div>
            ))}
        </section>
    )
}