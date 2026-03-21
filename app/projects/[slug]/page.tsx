import { ProjectDetails } from "@/app/components/pages/project/project-details";
import { ProjectSections } from "@/app/components/pages/project/project-sections";
import { ProjectPageData, ProjectsPageStaticData } from "@/app/types/page-info";
import { fetchHygraphQuery } from "@/app/utils/fetch-hygraph-query";
import { Metadata } from "next";

type ProjectProps = {
  params: {
    slug: string;
  };
};

export const revalidate = 60; // Automatic ISR every 60s

const getProjectDetails = async (
  slug: string,
): Promise<{ project: ProjectPageData["project"]; page: any }> => {
  const query = `
    query ProjectQuery {
        page(where: {slug: "home"}) {
            profilePicture {
                url
            }
            socials {
                url
                iconSvg
            }
        }
        project(where: { slug: "${slug}" }) {
            pageThumbnail {
                url
            }
            thumbnail {
                url
            }
            sections {
                title
                image {
                    url
                }
            }
            title
            shortDescription
            description {
                raw
                text
            }
            technologies {
                name
            }
            liveProjectUrl
            githubUrl
            anopublicacao
            jornalcongresso {
                raw
            }
        }
    }
    `;
  return fetchHygraphQuery(query);
};

import { DynamicNav } from "@/app/components/dynamic-nav";

export default async function Project({ params: { slug } }: ProjectProps) {
  const { project, page } = await getProjectDetails(slug);

  if (!project) {
    return <div>Projeto não encontrado.</div>;
  }

  return (
    <>
      <DynamicNav />
      <ProjectDetails project={project} />
      <ProjectSections sections={project.sections || []} />

      <footer className="w-full border-t-4 border-black bg-zinc-50">
        <div className="flex justify-center items-center px-10 py-12 w-full max-w-screen-2xl mx-auto text-black font-body text-sm tracking-tight font-bold">
          <div>© 2026 Luiz Vedoato</div>
        </div>
      </footer>
    </>
  );
}

export async function generateStaticParams() {
  const query = `
        query ProjectsSlugsQuery {
            projects(first: 100) {
                slug
            }
        }
    `;

  const { projects } = await fetchHygraphQuery<ProjectsPageStaticData>(query);

  return projects;
}

export async function generateMetadata({
  params: { slug },
}: ProjectProps): Promise<Metadata> {
  const data = await getProjectDetails(slug);
  const project = data.project;

  if (!project) {
    return {
      title: "Projeto não encontrado",
      description: "",
    };
  }

  return {
    title: project.title,
    description: project.description.text,
    openGraph: {
      images: project.thumbnail?.url
        ? [
            {
              url: project.thumbnail.url,
              width: 1200,
              height: 630,
            },
          ]
        : [],
    },
  };
}
