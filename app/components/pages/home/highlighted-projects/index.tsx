import { SectionTitle } from "@/app/components/section-title";
import { HorizontalDivider } from "@/app/components/divider/horizontal";
import { ProjectCard } from "./project-card";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "@/app/components/link";
import { Project } from "@/app/types/projects";

type HighLightedProjectsProps = {
  projects: Project[];
};

export const HighLightedProjects = ({ projects }: HighLightedProjectsProps) => {
  return (
    <section className="container py-16">
      <SectionTitle subtitle="Highlight" title="Featured Projects" />
      <HorizontalDivider className="mb-16" />

      <div>
        {projects?.map((project) => (
          <div key={project.slug}>
            <ProjectCard project={project} />
            <HorizontalDivider className="my-16" />
          </div>
        ))}

        <p className="flex items-center gap-1.5">
          <span className="text-black">Are you interested?</span>
          <Link
            href="/projects"
            className="inline-flex text-[#23abff] hover:text-black transition-colors"
          >
            See All
            <HiArrowNarrowRight />
          </Link>
        </p>
      </div>
    </section>
  );
};



// import { SectionTitle } from "@/app/components/section-title";
// import { HorizontalDivider } from "@/app/components/divider/horizontal";
// import { ProjectCard } from "./project-card";
// import { HiArrowNarrowRight } from "react-icons/hi";
// import { Link } from "@/app/components/link";
// import { Project } from "@/app/types/projects";

// type HighLightedProjectsProps = {
//   projects: Project[];
// };

// export const HighLightedProjects = ({ projects }: HighLightedProjectsProps) => {
//   return (
//     <section className="container py-16">
//       <SectionTitle subtitle="Highlight" title="Featured Projects" />
//       <HorizontalDivider className="mb-16" />
//       <div>
//         {projects?.map((project) => (
//           <div key={project.slug}>
//             <ProjectCard project={project} />
//             <HorizontalDivider className="my-16" />
//           </div>
//         ))}

//         <p className="flex items-center gap-1.5">
//           <span className="text-[#ffffff]">Are you interested?</span>
//           <Link href="/projects" className="inline-flex text-[#d1bcff] hover:text-[#ffffff] transition-colors">
//             See All
//             <HiArrowNarrowRight />
//           </Link>
//         </p>
//       </div>
//     </section>
//   );
// };