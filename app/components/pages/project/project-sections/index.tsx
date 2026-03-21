import Image from "next/image";
import { ProjectSection } from "@/app/types/projects";

type ProjectSectionsProps = {
  sections?: ProjectSection[];
};

export const ProjectSections = ({ sections }: ProjectSectionsProps) => {
  if (!Array.isArray(sections)) return null;

  return (
    <section className="container max-w-5xl mx-auto my-12 md:my-24 flex flex-col gap-16 md:gap-32 px-6">
      {sections.map((section, index) => (
        <div
          key={section.title || index}
          className="flex flex-col items-center gap-6 md:gap-8 group"
        >
          {section.title && (
            <h2 className="font-headline text-3xl md:text-4xl font-black text-primary tracking-tight uppercase">
              {section.title}
            </h2>
          )}
          {section.image?.url && (
            <div className="relative w-full scribble-border-sm overflow-hidden bg-white hover:-translate-y-2 transition-transform">
              <Image
                src={section.image.url}
                width={1080}
                height={672}
                alt={`Imagem da Sessão ${section.title || ""}`}
                className="w-full h-auto aspect-auto object-cover grayscale"
                unoptimized
              />
            </div>
          )}
        </div>
      ))}
    </section>
  );
};
