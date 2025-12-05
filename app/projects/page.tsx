import { fetchHygraphQuery } from "../utils/fetch-hygraph-query"
import { NewFooter } from "../components/new-footer"
import { NewHeader } from "../components/new-header"
import { HomePageData } from "../types/page-info"
import Link from "next/link"

const getPageData = async (): Promise<HomePageData> => {
  // Reusing the same query or similar one to get all projects
  // In a real app we might have a dedicated query for all projects
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
        highlightProjects {
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
        knowTechs {
          iconSvg
          name
          startDate
        }
      }
      workExperiences {
        companyLogo {
           url
        }
      }
      collegeExperiences {
         collegeName
      }
    }
  `
  return fetchHygraphQuery(query)
}

export default async function Projects() {
  const { page: pageData } = await getPageData();

  return (
    <>
      <NewHeader profilePicture={pageData.profilePicture?.url} />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 mb-4">All Projects</h1>
            <p className="text-zinc-500">A collection of my work.</p>
          </div>

          <div className="space-y-4">
            {pageData.highlightProjects.map((project, index) => (
              <Link href={`/projects/${project.slug}`} key={project.slug} className="group flex flex-col sm:flex-row sm:items-baseline gap-4 p-5 rounded-2xl border border-zinc-200 hover:border-rose-200 bg-white hover:shadow-lg hover:shadow-rose-100/50 transition-all cursor-pointer">
                <div className="w-32 shrink-0">
                  <div className="text-xs font-mono font-medium text-rose-600 bg-rose-50 px-2 py-1 rounded-md inline-block">
                    {project.anopublicacao ? new Date(project.anopublicacao).getFullYear() : (project.technologies[0]?.name || "2024")}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-zinc-900 group-hover:text-rose-600 transition-colors">{project.title}</h3>
                  <p className="text-sm text-zinc-500 mt-1 line-clamp-1">
                    {(project.jornalcongresso?.raw as any)?.children?.[0]?.children?.[0]?.text || project.shortDescription}
                  </p>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 border border-zinc-100 px-2 py-0.5 rounded-full bg-zinc-50">
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 self-start sm:self-center">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24" className="text-zinc-300 group-hover:text-rose-500 transition-colors"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7h10v10M7 17L17 7"></path></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <NewFooter socials={pageData.socials} />
    </>
  )
}