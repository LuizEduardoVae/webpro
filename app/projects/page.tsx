import { fetchHygraphQuery } from "../utils/fetch-hygraph-query";
import { HomePageData } from "../types/page-info";
import { Project } from "../types/projects";
import Link from "next/link";
import Image from "next/image";
import { DynamicNav } from "../components/dynamic-nav";

const getPageData = async (): Promise<
  HomePageData & { projects: Project[] }
> => {
  const query = `
    query PageInfoQuery {
      page(where: {slug: "home"}) {
        introduction {
          raw
        }
        technologies {
          name
        }
        profilePicture {
          url
        }
        socials {
          url
          iconSvg
        }
        knowTechs {
          iconSvg
          name
          startDate
        }
      }
      projects(first: 100, orderBy: anopublicacao_DESC) {
        slug
        thumbnail {
          url
        }
        title
        shortDescription
        technologies {
          name
        }
        anopublicacao
        jornalcongresso {
          raw
        }
      }
    }
  `;
  return fetchHygraphQuery(query);
};

export const revalidate = 60;

export default async function Projects() {
  const { page: pageData, projects } = await getPageData();

  return (
    <>
      <DynamicNav />

      <main className="pt-32 pb-24 px-6 bg-surface-container-low min-h-screen">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-16">
            <h1 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter">
              All Projects
            </h1>
            <p className="text-xl italic text-secondary mt-4">
              A comprehensive archive of research and engineering work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <div
                key={project.slug}
                className="bg-white p-8 scribble-border-sm flex flex-col gap-6 hover:-translate-y-2 transition-transform"
              >
                <div className="aspect-video bg-surface-container overflow-hidden border border-black relative">
                  {project.thumbnail?.url && (
                    <Image
                      src={project.thumbnail.url}
                      alt={project.title}
                      fill
                      className="w-full h-full object-cover grayscale"
                    />
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-headline text-2xl font-bold uppercase">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-xs font-bold text-secondary uppercase tracking-widest">
                    {project.anopublicacao
                      ? new Date(project.anopublicacao).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        )
                      : ""}
                  </p>
                </div>

                <p className="text-secondary text-sm leading-snug line-clamp-3 flex-1">
                  {(project.jornalcongresso?.raw as any)?.children?.[0]
                    ?.children?.[0]?.text || project.shortDescription}
                </p>

                <div className="mt-auto flex justify-between items-center pt-4">
                  <span className="font-mono text-xs uppercase bg-black text-white px-2 py-1 truncate max-w-[200px]">
                    {project.technologies[0]?.name || "Project"}
                  </span>
                  <Link href={`/projects/${project.slug}`}>
                    <span className="material-symbols-outlined hover:scale-110 transition-transform">
                      arrow_outward
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="w-full border-t-4 border-black bg-zinc-50">
        <div className="flex flex-col md:flex-row justify-between items-center px-10 py-12 w-full max-w-screen-2xl mx-auto gap-6 text-black font-body text-sm tracking-tight">
          <div className="font-headline font-bold uppercase text-lg">
            LUIZ.ENG
          </div>
          <div className="flex gap-8 flex-wrap justify-center ml-auto">
            {pageData.socials.map((social, i) => {
              const nameMatch = social.url.match(
                /github|linkedin|youtube|lattes|researchgate/i,
              );
              const name = nameMatch ? nameMatch[0] : `Link ${i + 1}`;
              return (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-600 hover:italic transition-all uppercase text-xs font-bold"
                >
                  {name}
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </>
  );
}
