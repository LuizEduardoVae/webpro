import { ProjectDetails } from "@/app/components/pages/project/project-details";
import { ProjectSections } from "@/app/components/pages/project/project-sections";
import { ProjectPageData, ProjectsPageStaticData } from "@/app/types/page-info";
import { fetchHygraphQuery } from "@/app/utils/fetch-hygraph-query";
import { Metadata } from "next";


type ProjectProps = {
    params: {
        slug: string;
    }
}


const getProjectDetails = async (slug: string): Promise<{ project: ProjectPageData['project'], page: any }> => {
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
        }
    }
    `
    return fetchHygraphQuery(query)
}

import { NewHeader } from "@/app/components/new-header";
import { NewFooter } from "@/app/components/new-footer";

export default async function Project({ params: { slug } }: ProjectProps) {
    const { project, page } = await getProjectDetails(slug)

    if (!project) {
        return <div>Projeto não encontrado.</div>
    }

    return (
        <>
            <NewHeader profilePicture={page.profilePicture?.url} />
            <ProjectDetails project={project} />
            <ProjectSections sections={project.sections || []} />
            <NewFooter socials={page.socials} />
        </>
    )
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
    params: { slug }
}: ProjectProps): Promise<Metadata> {
    const data = await getProjectDetails(slug)
    const project = data.project;

    if (!project) {
        return {
            title: "Projeto não encontrado",
            description: ""
        }
    }

    return {
        title: project.title,
        description: project.description.text,
        openGraph: {
            images: [
                {
                    url: project.thumbnail.url,
                    width: 1200,
                    height: 630,
                }

            ]
        }
    }
}
//12