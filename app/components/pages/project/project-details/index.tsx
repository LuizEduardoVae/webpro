'use client'

import { Button } from "@/app/components/button";
import { SectionTitle } from "@/app/components/section-title";
import { TechBadge } from "@/app/components/tech-badge";
import { TbBrandGithub } from "react-icons/tb";
import { FiGlobe } from "react-icons/fi";
import { Link } from "@/app/components/link";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { Project } from "@/app/types/projects";
import { RichText } from "@/app/components/rich-text";

type ProjectDetailsProps = {
    project: Project;
};

export const ProjectDetails = ({ project }: ProjectDetailsProps) => {
    return (
        <section className="w-full relative pt-32 pb-12 px-6 overflow-hidden bg-zinc-50/50">
            {/* Background Decoration */}
            <div className="absolute inset-0 z-0">
                {/* Optional: Add a very subtle blur of the project thumbnail as background wash */}
                {project.pageThumbnail?.url && (
                    <div
                        className="absolute inset-0 opacity-[0.03] bg-cover bg-center grayscale"
                        style={{ backgroundImage: `url(${project.pageThumbnail.url})` }}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-zinc-50/80"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto text-center">

                <SectionTitle
                    subtitle="Project Details"
                    title={project.title}
                    className="text-center items-center sm:[&>h3]:text-4xl [&>h3]:text-zinc-900 mb-8"
                />

                <div className="text-zinc-600 leading-relaxed space-y-4 max-w-2xl mx-auto mb-8 font-sans">
                    <RichText content={project.description.raw} />
                </div>

                <div className="flex flex-wrap gap-2 items-center justify-center mb-10">
                    {project.technologies.map((tech) => (
                        <span key={tech.name} className="px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-medium text-zinc-600 shadow-sm">
                            {tech.name}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-4 flex-col sm:flex-row">
                    {project?.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noreferrer">
                            <Button className="min-w-[160px] bg-zinc-900 text-white hover:bg-zinc-800 rounded-full shadow-lg hover:shadow-xl transition-all h-12">
                                <TbBrandGithub size={20} className="mr-2" />
                                Repository
                            </Button>
                        </a>
                    )}
                    {project?.liveProjectUrl && (
                        <a href={project.liveProjectUrl} target="_blank" rel="noreferrer">
                            <Button className="min-w-[160px] bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 rounded-full shadow-sm hover:shadow-md transition-all h-12">
                                <FiGlobe size={20} className="mr-2" />
                                Live Demo
                            </Button>
                        </a>
                    )}
                </div>

                <Link
                    href="/projects"
                    className="mt-12 text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-2 text-sm font-medium"
                >
                    <HiArrowNarrowLeft size={16} />
                    Back to Projects
                </Link>
            </div>
        </section>
    );
};


// 'use client'

// import { Button } from "@/app/components/button";
// import { SectionTitle } from "@/app/components/section-title";
// import { TechBadge } from "@/app/components/tech-badge";
// import { TbBrandGithub } from "react-icons/tb";
// import { FiGlobe } from "react-icons/fi";
// import { Link } from "@/app/components/link";
// import { HiArrowNarrowLeft } from "react-icons/hi";
// import { Project } from "@/app/types/projects";
// import { RichText } from "@/app/components/rich-text";

// type ProjectDetailsProps = {
//     project: Project;
// };

// export const ProjectDetails = ({ project }: ProjectDetailsProps) => {
//     return (
//         <section className="w-full sm:min-h-[750px] flex flex-col items-center justify-end relative pb-10 sm:pb-24 py-24 px-6 overflow-hidden">
//             <div
//                 className="absolute inset-0 z-[-1]"
//                 style={{
//                     background: `url(/images/hero-bg.png) no-repeat center/cover, url(${project.pageThumbnail?.url}) no-repeat center/cover`,
//                 }}
//             ></div>
//             <SectionTitle
//                 subtitle="Projects"
//                 title={project.title}
//                 className="text-center items-center sm:[&>h3]:text-4xl"
//             />
//             <div className="max-w-[640px] my-4 sm:my-6 text-sm sm:text-base text-justify leading-relaxed text-gray-300">
//                 {/* Ajuste a cor e o espaçamento para melhor legibilidade */}
//                 <RichText content={project.description.raw} />
//             </div>
//             <div className="w-full max-w-[330px] flex flex-wrap gap-2 items-center justify-center">
//                 {project.technologies.map((tech) => (
//                     <TechBadge key={tech.name} name={tech.name} />
//                 ))}
//             </div>

//             <div className="my-6 sm:my-12 flex items-center gap-2 sm:gap-4 flex-col sm:flex-row">
//                 {project?.githubUrl && (
//                     <a href={project.githubUrl} target="_blank">
//                         <Button className="min-w-[180px]">
//                             <TbBrandGithub size={20} />
//                             Repository
//                         </Button>
//                     </a>
//                 )}
//                 {project?.liveProjectUrl && (
//                     <a href={project.liveProjectUrl} target="_blank">
//                         <Button className="min-w-[180px]">
//                             <FiGlobe size={20} />
//                             Project
//                         </Button>
//                     </a>
//                 )}
//             </div>
//             <Link href="/projects" className="text-gray-400 hover:text-[#d1bcff] transition-colors">
//                 <HiArrowNarrowLeft size={20} />
//                 Back to Projects
//             </Link>
//         </section>
//     );
// };
// //1231dewqedasdasa