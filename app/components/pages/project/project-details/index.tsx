"use client";

import { Button } from "@/app/components/button";
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
    <section className="w-full relative pt-32 pb-12 px-6 overflow-hidden bg-surface">
      {/* Background Decoration */}
      <div className="absolute inset-0 z-0">
        {project.pageThumbnail?.url && (
          <div
            className="absolute inset-0 opacity-[0.03] bg-cover bg-center grayscale mix-blend-multiply"
            style={{ backgroundImage: `url(${project.pageThumbnail.url})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-surface/90"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto text-center">
        <div className="mb-4 flex flex-col items-center gap-2">
          <span className="font-mono text-xs uppercase bg-black text-white px-3 py-1 tracking-widest inline-block">
            {project.anopublicacao
              ? new Date(project.anopublicacao).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Project"}
          </span>
          {(project.jornalcongresso?.raw as any)?.children?.[0]?.children?.[0]
            ?.text && (
            <span className="text-xs font-bold text-secondary uppercase tracking-widest">
              {
                (project.jornalcongresso?.raw as any)?.children?.[0]
                  ?.children?.[0]?.text
              }
            </span>
          )}
        </div>

        <h1 className="font-headline text-4xl sm:text-6xl font-black text-primary tracking-tighter uppercase mb-8">
          {project.title}
        </h1>

        <div className="text-secondary leading-relaxed space-y-4 max-w-2xl mx-auto mb-10 text-lg">
          <RichText content={project.description.raw} />
        </div>

        <div className="flex flex-wrap gap-2 items-center justify-center mb-12">
          {project.technologies.map((tech) => (
            <span
              key={tech.name}
              className="px-4 py-1.5 scribble-border-sm bg-white border-2 border-black text-xs font-bold text-primary uppercase"
            >
              {tech.name}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-6 flex-col sm:flex-row">
          {project?.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer">
              <button className="flex items-center justify-center min-w-[200px] bg-primary text-white font-headline font-bold uppercase tracking-widest px-8 py-4 border-2 border-black active:translate-x-1 active:translate-y-1 transition-all">
                <TbBrandGithub size={20} className="mr-3" />
                Repository
              </button>
            </a>
          )}
          {project?.liveProjectUrl && (
            <a href={project.liveProjectUrl} target="_blank" rel="noreferrer">
              <button className="flex items-center justify-center min-w-[200px] bg-white text-primary font-headline font-bold uppercase tracking-widest px-8 py-4 border-2 border-black hover:bg-surface-container-low active:translate-x-1 active:translate-y-1 transition-all">
                <FiGlobe size={20} className="mr-3" />
                Live Demo
              </button>
            </a>
          )}
        </div>

        <Link
          href="/projects"
          className="mt-16 text-secondary hover:text-primary transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
        >
          <HiArrowNarrowLeft size={16} />
          Back to Projects
        </Link>
      </div>
    </section>
  );
};
