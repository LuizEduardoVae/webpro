import { fetchHygraphQuery } from "./utils/fetch-hygraph-query"
import { HomePageData } from "./types/page-info"
import { NewFooter } from "./components/new-footer"
import { NewHeader } from "./components/new-header"
import Image from "next/image"
import Link from "next/link"
import { getLatestVideos } from "./lib/youtube";

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

// Helper for relative time (simple version)
function getRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  return date.toLocaleDateString();
}

export default async function Home() {
  const { page: pageData, workExperiences, collegeExperiences } = await getPageData();
  const videos = await getLatestVideos();

  return (
    <>
      <NewHeader profilePicture={pageData.profilePicture?.url} />

      {/* Hero Section */}
      <header className="md:pt-48 md:pb-20 overflow-hidden pt-32 pr-6 pb-20 pl-6">
        <div className="max-w-5xl mr-auto ml-auto relative">

          {/* Animated Pill - Replaced Open for Work with Latest Paper/Project */}
          <Link href={`/projects/${pageData.highlightProjects[0]?.slug}`} className="animate-enter inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-8 backdrop-blur shadow-sm transition-transform hover:scale-105 cursor-pointer bg-white/80 border-zinc-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-rose-400"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span className="text-xs font-medium text-zinc-600">
              Check out my latest project: {pageData.highlightProjects[0]?.title || "New Video"}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="12" height="12" viewBox="0 0 24 24" className="text-zinc-400"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14m-7-7l7 7l-7 7"></path></svg>
          </Link>

          <h1 className="animate-enter delay-100 text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.05] text-zinc-900">
            Hi, my name is Luiz. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">Creator &amp; Researcher.</span>
          </h1>

          <p className="animate-enter delay-200 text-lg md:text-xl max-w-2xl leading-relaxed font-light mb-10 text-zinc-500">
            I’m the creator of the ‘LuizVedoato’ channel on Youtube, an Electrical Engineering student at the Federal University of Espírito Santo, and a researcher in the field of Data Science.
          </p>

          <div className="animate-enter delay-300 flex flex-wrap items-center gap-4">
            <Link href="#projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-500/20 active:translate-y-0 bg-zinc-900 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" x2="8" y1="13" y2="13"></line><line x1="16" x2="8" y1="17" y2="17"></line><line x1="10" x2="8" y1="9" y2="9"></line></svg>
              View Projects
            </Link>
            <Link href="#videos" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors border bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></circle><polygon points="10 8 16 12 10 16 10 8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></polygon></svg>
              Watch Videos
            </Link>
          </div>
        </div>
      </header>

      {/* Featured Projects (Was Experience list, now Projects list) */}
      <section id="projects" className="scroll-mt-32 py-12 px-6 border-t border-b border-zinc-100 bg-zinc-50/40">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Featured Projects</h2>
              <p className="text-sm text-zinc-500 mt-1">Selected works and applications.</p>
            </div>
            <Link href="/projects" className="text-xs font-medium text-zinc-400 hover:text-zinc-900 flex items-center gap-1">
              View All Projects <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="12" height="12" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3"></path></svg>
            </Link>
          </div>

          <div className="space-y-4">
            {pageData.highlightProjects.map((project, index) => (
              <Link href={`/projects/${project.slug}`} key={project.slug} className="group flex flex-col sm:flex-row sm:items-baseline gap-4 p-5 rounded-2xl border border-zinc-200 hover:border-rose-200 bg-white hover:shadow-lg hover:shadow-rose-100/50 transition-all cursor-pointer">
                <div className="w-32 shrink-0">
                  {/* Display Date (Year only) */}
                  <div className="text-xs font-mono font-medium text-rose-600 bg-rose-50 px-2 py-1 rounded-md inline-block">
                    {project.anopublicacao ? new Date(project.anopublicacao).getFullYear() : (project.technologies[0]?.name || "2024")}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-zinc-900 group-hover:text-rose-600 transition-colors">{project.title}</h3>
                  {/* Prioritize jornalcongresso, fallback to shortDescription */}
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
      </section>



      {/* Videos Section (New Dr. Sorel Style) */}
      <section id="videos" className="scroll-mt-32 py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12 animate-enter delay-100">
            <div>
              <h2 className="text-3xl tracking-tight mb-2 text-zinc-900 font-sans font-semibold">Latest Videos</h2>
              <p className="text-zinc-500 font-sans">Visualizing complex science for everyone.</p>
            </div>
            <a href="https://www.youtube.com/@LuizEduardoVedoato" target="_blank" className="hidden md:flex items-center gap-1 text-sm font-medium transition-colors text-rose-600 hover:text-rose-700 font-sans">
              View Channel <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14m-7-7l7 7l-7 7"></path></svg>
            </a>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">

            {/* Video 1 (Featured - Large: 2x2) */}
            {videos[0] && (
              <a href={videos[0].url} target="_blank" className="group relative md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                {/* Thumbnail Placeholder with Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br group-hover:scale-105 transition-transform duration-700 from-zinc-800 to-black"></div>
                {videos[0].thumbnail && (
                  <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{ backgroundImage: `url('${videos[0].thumbnail}')` }}></div>
                )}

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 rounded-full backdrop-blur-md text-xs font-medium border bg-white/20 text-white border-white/10 font-sans">New Release</span>
                    <div className="h-12 w-12 rounded-full backdrop-blur-md flex items-center justify-center group-hover:bg-rose-500 transition-colors bg-white/10 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path></svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl mb-3 leading-tight text-white font-sans font-semibold line-clamp-2">{videos[0].title}</h3>
                    <p className="text-sm line-clamp-2 text-zinc-300 font-sans">
                      {videos[0].viewCount ? `${videos[0].viewCount} views` : 'Watch now'} • {getRelativeTime(videos[0].publishedAt)}
                    </p>
                  </div>
                </div>
              </a>
            )}

            {/* Video 2 (Vertical - Tall: 1x2) */}
            {videos[1] && (
              <a href={videos[1].url} target="_blank" className="group relative md:col-span-1 md:row-span-2 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border bg-white border-zinc-200">
                <div className="absolute inset-0 bg-gradient-to-tr opacity-50 group-hover:opacity-100 transition-opacity from-rose-100 to-orange-50"></div>
                {videos[1].thumbnail && (
                  <Image src={videos[1].thumbnail} alt={videos[1].title} fill className="object-cover opacity-50 mix-blend-multiply group-hover:opacity-10 transition-opacity" />
                )}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="absolute top-6 right-6 h-10 w-10 rounded-full shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform bg-white text-zinc-900">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path></svg>
                  </div>
                  <span className="text-xs font-semibold mb-2 uppercase tracking-wide text-rose-600 font-sans">{videos[1].tags?.[0] || 'Latest'}</span>
                  <h3 className="text-xl font-bold leading-tight text-zinc-900 font-sans line-clamp-4 mb-2">{videos[1].title}</h3>
                  <p className="text-xs text-zinc-500 font-sans">{videos[1].duration || "10:00"} min • {getRelativeTime(videos[1].publishedAt)}</p>
                </div>
              </a>
            )}

            {/* Video 3 (Standard - 1x1) */}
            {videos[2] && (
              <a href={videos[2].url} target="_blank" className="group relative md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-zinc-900">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20"></div>
                {videos[2].thumbnail && (
                  <Image src={videos[2].thumbnail} alt={videos[2].title} fill className="object-cover opacity-60 group-hover:opacity-20 transition-opacity" />
                )}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex justify-end">
                    <div className="h-10 w-10 rounded-full backdrop-blur flex items-center justify-center group-hover:bg-white group-hover:text-zinc-900 transition-all bg-white/10 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path></svg>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-medium mb-1 block text-indigo-300 font-sans">{videos[2].tags?.[0] || 'Video'}</span>
                    <h3 className="text-lg font-bold leading-tight text-white font-sans line-clamp-2">{videos[2].title}</h3>
                  </div>
                </div>
              </a>
            )}

            {/* Video 4 (Wide - 2x1) */}
            {videos[3] && (
              <a href={videos[3].url} target="_blank" className="group relative md:col-span-2 md:row-span-1 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border bg-white border-zinc-200">
                <div className="absolute inset-0 flex items-center justify-center group-hover:bg-zinc-100 transition-colors bg-zinc-50">
                  <span className="group-hover:scale-110 transition-transform duration-500 text-zinc-300">
                    {/* Abstract geometric shape placeholder */}
                    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-10"><path d="M0 100L100 0H0V100Z" fill="currentColor"></path></svg>
                  </span>
                </div>
                {videos[3].thumbnail && (
                  <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-60 mask-image-linear-to-l from-black to-transparent">
                    <Image src={videos[3].thumbnail} alt={videos[3].title} fill className="object-cover" />
                  </div>
                )}
                <div className="absolute inset-0 p-8 flex items-center justify-between">
                  <div className="max-w-xs relative z-10">
                    <span className="text-xs font-semibold mb-2 block uppercase tracking-wide text-emerald-600 font-sans">{videos[3].tags?.[0] || 'Featured'}</span>
                    <h3 className="text-xl font-bold mb-2 text-zinc-900 font-sans line-clamp-2">{videos[3].title}</h3>
                    <p className="text-sm text-zinc-500 font-sans line-clamp-1">{videos[3].duration ? `${videos[3].duration} • ` : ''}{getRelativeTime(videos[3].publishedAt)}</p>
                  </div>
                  <div className="h-16 w-16 rounded-full shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform bg-zinc-900 text-white shrink-0 ml-4 relative z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path></svg>
                  </div>
                </div>
              </a>
            )}

          </div>
        </div>
      </section>

      {/* Research Areas (Was Technologies) */}
      <section id="research" className="scroll-mt-32 py-24 px-6 border-b border-zinc-100">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-zinc-900">Research Areas</h2>
            <p className="text-zinc-500 max-w-xl">Bridging the gap between software engineering and science.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pageData.knowTechs.map((tech, index) => (
              <div key={index} className="group p-8 rounded-3xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-zinc-200 bg-white">
                <div className="h-12 w-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform bg-zinc-50">
                  {tech.iconSvg ? (
                    <div dangerouslySetInnerHTML={{ __html: tech.iconSvg }} className="w-8 h-8 [&>svg]:w-full [&>svg]:h-full" />
                  ) : (
                    // Fallback icon if SVG is missing
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" /></svg>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-2 text-zinc-900">{tech.name}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  Expertise since {new Date(tech.startDate).getFullYear()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ME Section (Experience + Education) */}
      <section id="me" className="scroll-mt-32 py-24 px-6 bg-zinc-50/50">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-zinc-900">Me</h2>
            <p className="text-zinc-500 max-w-xl">My academic and professional journey.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Experiences */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-zinc-900 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                Experience
              </h3>
              <div className="space-y-8">
                {workExperiences.map((job, i) => (
                  <div key={i} className="relative pl-8 border-l border-zinc-200">
                    <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border border-white bg-zinc-300"></div>
                    <div className="text-sm text-zinc-400 mb-1">{new Date(job.startDate).getFullYear()} - {job.endDate ? new Date(job.endDate).getFullYear() : 'Present'}</div>
                    <h4 className="font-bold text-zinc-900">{job.role}</h4>
                    <div className="text-sm font-medium text-zinc-600 mb-2">{job.companyName}</div>
                    <p className="text-sm text-zinc-500">
                      {(job.description?.raw as any)?.children?.[0]?.children?.[0]?.text || "Role description"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-zinc-900 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                Education
              </h3>
              <div className="space-y-8">
                {collegeExperiences.map((edu, i) => (
                  <div key={i} className="relative pl-8 border-l border-zinc-200">
                    <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border border-white bg-zinc-300"></div>
                    <div className="text-sm text-zinc-400 mb-1">{new Date(edu.startDate).getFullYear()} - {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}</div>
                    <h4 className="font-bold text-zinc-900">{edu.collegeName}</h4>
                    <div className="text-sm font-medium text-zinc-600 mb-2">{edu.role}</div>
                    <p className="text-sm text-zinc-500">
                      {(edu.description?.raw as any)?.children?.[0]?.children?.[0]?.text || "Education details"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewFooter socials={pageData.socials} />
    </>
  )
}