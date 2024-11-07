'use client'

import { Link } from "@/app/components/link";
import { TechBadge } from "@/app/components/tech-badge";
import Image from "next/image";
import { HiArrowNarrowRight } from "react-icons/hi";
import { motion } from 'framer-motion';
import { fadeUpAnimation } from "@/app/lib/animation";
import { Project } from "@/app/types/projects";

type ProjectCardProps = {
  project: Project;
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      className="flex gap-6 lg:gap-12 flex-col lg:flex-row"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full h-[200px] sm:h-[300px] lg:w-[300px] lg:h-[300px] overflow-hidden rounded-lg" // Ajuste largura e altura para quadrado em telas grandes
        initial={{ opacity: 0, y: 100, scale: 0.5 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.5 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Image
          src={project.thumbnail.url}
          width={300} // Proporção quadrada ajustada
          height={300} // Proporção quadrada ajustada
          alt={`Thumbnail do projeto ${project.title}`}
          className="object-cover w-full h-full"
        />
      </motion.div>

      <div>
        <motion.h3
          className="flex items-center gap-3 font-medium text-lg bg-gradient-to-r from-[#ffffff] via-[#d1bcff] to-[#64558e] text-transparent bg-clip-text"
          {...fadeUpAnimation}
          transition={{ duration: 0.7 }}
        >
          <Image
            width={20}
            height={20}
            alt=""
            src="/images/icons/project-title-icon.svg"
          />
          {project.title}
        </motion.h3>
        <motion.p className="text-gray-100 my-6">
          {project.shortDescription}
        </motion.p>
        <div className="flex gap-x-2 gap-y-3 flex-wrap mb-8 lg:max-w-[350px]">
          {project.technologies.map((tech) => (
            <TechBadge key={`${project.title}-tech-${tech.name}`} name={tech.name} />
          ))}
        </div>

        <Link href={`/projects/${project.slug}`} className="text-[#d1bcff] hover:text-[#ffffff] transition-colors">
          Go to Project
          <HiArrowNarrowRight />
        </Link>
      </div>
    </motion.div>
  );
};


// tetesss