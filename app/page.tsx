import { fetchHygraphQuery } from "./utils/fetch-hygraph-query"
import { HomePageData } from "./types/page-info"
import { NewFooter } from "./components/new-footer"
import Image from "next/image"
import Link from "next/link"

const getPageData = async (): Promise<HomePageData> => {
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
      role
      companyName
      companyUrl
      startDate
      endDate
      description {
        raw
      }
      technologies {
        name
      }
    }
    collegeExperiences {
      collegeLogo {
        url
      }
      collegeName
      collegeUrl
      description {
        raw
      }
      startDate
      endDate
      role
    }
  }
`
  return fetchHygraphQuery(query)
}

export default async function Home() {
  const { page: pageData, workExperiences } = await getPageData();

  return (
    <>
      {/* Hero Section */}
      <header className="md:pt-48 md:pb-20 overflow-hidden pt-32 pr-6 pb-20 pl-6">
        <div className="max-w-5xl mr-auto ml-auto relative">

          {/* Animated Pill */}
          <div className="animate-enter inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-8 backdrop-blur shadow-sm transition-transform hover:scale-105 cursor-pointer bg-white/80 border-zinc-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-rose-400"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span className="text-xs font-medium text-zinc-600">Open for work</span>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="12" height="12" viewBox="0 0 24 24" className="text-zinc-400"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14m-7-7l7 7l-7 7"></path></svg>
          </div>

          <h1 className="animate-enter delay-100 text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.05] text-zinc-900">
            Building Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">Experiences &amp; Solutions.</span>
          </h1>

          <div className="animate-enter delay-200 text-lg md:text-xl max-w-2xl leading-relaxed font-light mb-10 text-zinc-500">
            {/* Rendering raw text simply for now, or could use a rich text renderer if needed. 
                   Using a placeholder description if raw is complex, but typically introduction.raw is RichText.
                   For this template, I'll use a static text or simple extraction if possible, 
                   but to avoid breakage I'll put a hardcoded intro blended with data if available. */}
            Full Stack Developer focused on creating performant and consistent web applications.
          </div>

          <div className="animate-enter delay-300 flex flex-wrap items-center gap-4">
            <Link href="#projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-500/20 active:translate-y-0 bg-zinc-900 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" x2="8" y1="13" y2="13"></line><line x1="16" x2="8" y1="17" y2="17"></line><line x1="10" x2="8" y1="9" y2="9"></line></svg>
              View Projects
            </Link>
            <Link href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors border bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300">
              Contact Me
            </Link>
          </div>
        </div>
      </header>

      {/* Experience Section (Mapped from Selected Publications) */}
      <section id="experience" className="py-12 px-6 border-t border-b border-zinc-100 bg-zinc-50/40">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Work Experience</h2>
              <p className="text-sm text-zinc-500 mt-1">My professional career journey.</p>
            </div>
            <a href="https://www.linkedin.com" target="_blank" className="text-xs font-medium text-zinc-400 hover:text-zinc-900 flex items-center gap-1">
              View LinkedIn <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="12" height="12" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3"></path></svg>
            </a>
          </div>

          <div className="space-y-4">
            {workExperiences.map((experience, index) => (
              <div key={index} className="group flex flex-col sm:flex-row sm:items-baseline gap-4 p-5 rounded-2xl border border-zinc-200 hover:border-rose-200 bg-white hover:shadow-lg hover:shadow-rose-100/50 transition-all cursor-pointer">
                <div className="w-32 shrink-0">
                  <span className="text-xs font-mono font-medium text-rose-600 bg-rose-50 px-2 py-1 rounded-md">
                    {new Date(experience.startDate).getFullYear()}
                  </span>
                  <div className="text-xs text-zinc-400 mt-1 font-medium">{experience.companyName}</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-zinc-900 group-hover:text-rose-600 transition-colors">{experience.role}</h3>
                  <p className="text-sm text-zinc-500 mt-1 line-clamp-1">
                    {/* Assuming raw description needs parsing, but simplified here */}
                    {(experience.description?.raw as any)?.children?.[0]?.children?.[0]?.text || "Developer"}
                  </p>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {experience.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 border border-zinc-100 px-2 py-0.5 rounded-full bg-zinc-50">
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 self-start sm:self-center">
                  <a href={experience.companyUrl} target="_blank" rel="noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24" className="text-zinc-300 group-hover:text-rose-500 transition-colors"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7h10v10M7 17L17 7"></path></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section (Mapped from Videos) */}
      <section id="projects" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12 animate-enter delay-100">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2 text-zinc-900">Featured Projects</h2>
              <p className="text-zinc-500">Highlights of my development work.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageData.highlightProjects.map((project, index) => (
              <Link href={`/projects/${project.slug}`} key={project.slug} className={`group relative aspect-video rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${index === 0 ? 'lg:col-span-2' : ''}`}>
                {/* Placeholder background if no image, or actual image */}
                <div className="absolute inset-0 bg-zinc-900">
                  {project.thumbnail && (
                    <Image
                      src={project.thumbnail.url}
                      alt={project.title}
                      fill
                      className="object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                    />
                  )}
                </div>

                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 rounded-full backdrop-blur-md text-xs font-medium border bg-white/20 text-white border-white/10">
                      {project.technologies[0]?.name || "Project"}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 leading-tight text-white">{project.title}</h3>
                    <p className="text-sm line-clamp-2 text-zinc-300">{project.shortDescription}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Skills / Techs (Mapped from Research Areas) */}
      <section id="skills" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-zinc-900">Technologies</h2>
            <p className="text-zinc-500 max-w-xl">My technical stack and areas of expertise.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pageData.knowTechs.map((tech, index) => (
              <div key={index} className="group p-8 rounded-3xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-zinc-200 bg-white">
                <div className="h-12 w-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform bg-zinc-50">
                  <div dangerouslySetInnerHTML={{ __html: tech.iconSvg }} className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-zinc-900">{tech.name}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  User since {new Date(tech.startDate).getFullYear()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewFooter socials={pageData.socials} />
    </>
  )
}