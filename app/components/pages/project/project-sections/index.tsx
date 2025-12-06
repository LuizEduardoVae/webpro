// import Image from "next/image"
// import { ProjectSection } from "@/app/types/projects"

// type ProjectSectionsProps = {
//     sections?: ProjectSection[]
// }

// export const ProjectSections = ({ sections }: ProjectSectionsProps) => {
//     if (!Array.isArray(sections)) return null;

//     return (
//         <section className="container my-12 md:my-32 flex flex-col gap-8 md:gap-32">
//             {sections.map((section, index) => (
//                 <div key={section.title || index} className="flex flex-col items-center gap-6 md:gap-12">
//                     {section.title && (
//                         <h2 className="text-2xl md:text-3xl text-white">
//                             {section.title}
//                         </h2>
//                     )}
//                     {section.image?.url && (
//                         <Image
//                             src={section.image.url}
//                             width={1080}
//                             height={672}
//                             alt={`Imagem da Sessão ${section.title || ''}`}
//                             className="w-full aspect-auto rounded-lg object-cover"
//                             unoptimized
//                         />
//                     )}
//                 </div>
//             ))}
//         </section>
//     )
// }


import Image from "next/image"
import { ProjectSection } from "@/app/types/projects"

type ProjectSectionsProps = {
    sections?: ProjectSection[]
}

export const ProjectSections = ({ sections }: ProjectSectionsProps) => {
    if (!Array.isArray(sections)) return null;

    return (
        <section className="container max-w-5xl mx-auto my-12 md:my-24 flex flex-col gap-16 md:gap-32 px-6">
            {sections.map((section, index) => (
                <div key={section.title || index} className="flex flex-col items-center gap-6 md:gap-8 group">
                    {section.title && (
                        <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight">
                            {section.title}
                        </h2>
                    )}
                    {section.image?.url && (
                        <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-zinc-200/50 bg-zinc-100 transition-transform duration-700 group-hover:scale-[1.01]">
                            <Image
                                src={section.image.url}
                                width={1080}
                                height={672}
                                alt={`Imagem da Sessão ${section.title || ''}`}
                                className="w-full h-auto aspect-auto object-cover"
                                unoptimized
                            />
                        </div>
                    )}
                </div>
            ))}
        </section>
    )
}