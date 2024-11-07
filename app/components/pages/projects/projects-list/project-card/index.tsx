import { Project } from "@/app/types/projects";
import Image from "next/image";

type ProjectCardProps = {
  project: Project;
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const technologies = project.technologies.map((x) => x.name).join(",");

  return (
    <div className="rounded-lg h-[436px] flex flex-col bg-[#2e2e2e] overflow-hidden border-2 border-transparent hover:border-[#d1bcff] opacity-80 hover:opacity-100 transition-all group">
      <div className="w-full h-48 overflow-hidden">
        <Image
          width={380}
          height={200}
          src={project.thumbnail.url}
          alt={`Thumbnail do projeto ${project.title}`}
          unoptimized
          className="w-full h-full object-cover group-hover:scale-110 duration-500 transition-all"
        />
      </div>

      <div className="flex-1 flex flex-col p-8">
        <strong className="font-medium text-[#ffffff] group-hover:text-[#d1bcff] transition-all">
          {project.title}
        </strong>
        <p className="mt-2 !text-white line-clamp-4">
          {project.shortDescription}
        </p>
        <span className="text-[#ffffff] text-sm font-medium block mt-auto">
          {technologies}
        </span>
      </div>
    </div>
  );
};