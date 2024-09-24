import { SectionTitle } from "@/app/components/section-title"
import { HorizontalDivider } from "@/app/components/divider/horizontal"
import { ProjectCard } from "./project-card"
import { HiArrowNarrowRight } from "react-icons/hi"
import { Link } from "@/app/components/link"
import { Project } from "@/app/types/projects"


type HighLightedProjectsProps = {
    projects: Project[]
}

export const HighLightedProjects = ({ projects }: HighLightedProjectsProps) => {
    return(
        <section className="container py-16">
            <SectionTitle subtitle="destaque" title="Projetos em destaque"/>
            <HorizontalDivider className="mb-16"/>
            <div>
                {projects?.map(project => (
                    <div key={project.slug}>
                        <ProjectCard project={project}/>
                        <HorizontalDivider className="my-16"/>
                    </div>   
                ))}
            
                <p className="flex items-center gap-1.5">
                    <span className="text-gray-700">Se Interessou?</span> 
                    <Link href="/projects" className="inline-flex">
                        Ver Todos
                        <HiArrowNarrowRight/>
                    </Link>
                </p>
            </div>
        </section> 
    )
}
