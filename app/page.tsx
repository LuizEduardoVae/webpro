import { fetchHygraphQuery } from "./utils/fetch-hygraph-query"
import { HomePageData } from "./types/page-info"
import { NewFooter } from "./components/new-footer"
import { NewHeader } from "./components/new-header"
import Image from "next/image"
import Link from "next/link"
import { getLatestVideos } from "./lib/youtube";
import { RichText } from "./components/rich-text";

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
    workExperiences(orderBy: startDate_DESC) {
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
    collegeExperiences(orderBy: startDate_DESC) {
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


  // Helper for sorting experiences (LinkedIn style: Newest Start Date first, tie-break with End Date)
  function sortExperiences<T extends { startDate: string; endDate?: string | null }>(experiences: T[] | undefined): T[] {
    if (!experiences) return [];

    return [...experiences].sort((a, b) => {
      // 1. Compare Start Date (Desc - Newest first)
      const startDateA = new Date(a.startDate).getTime();
      const startDateB = new Date(b.startDate).getTime();

      if (startDateA !== startDateB) {
        return startDateB - startDateA;
      }

      // 2. Tie-breaker: End Date (Desc - "Present/Null" is newest/largest)
      // If endDate is missing/null, treat as "Present" (Future/Infinity)
      const endDateA = a.endDate ? new Date(a.endDate).getTime() : Infinity;
      const endDateB = b.endDate ? new Date(b.endDate).getTime() : Infinity;

      return endDateB - endDateA;
    });
  }


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
              <p className="text-zinc-500 font-sans">Classes, vlogs, and educational content.</p>
            </div>
            <a href="https://www.youtube.com/@LuizEduardoVedoato" target="_blank" className="hidden md:flex items-center gap-1 text-sm font-medium transition-colors text-rose-600 hover:text-rose-700 font-sans">
              View Channel <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14m-7-7l7 7l-7 7"></path></svg>
            </a>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.slice(0, 4).map((video, index) => {
              const isLarge = index === 0 || index === 3;
              // Reference strictly uses lg:col-span-2. MD is 1 col.
              // Single col items (index 1, 2) should stretch (aspect-auto) on LG to match row height.
              return (
                <a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 block 
                  ${isLarge ? "col-span-1 lg:col-span-2 aspect-video" : "col-span-1 aspect-video lg:aspect-auto"}
                `}
                >
                  {/* Image */}
                  {video.thumbnail && (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="absolute inset-0 h-full w-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                    />
                  )}

                  {/* Clean Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 flex flex-col justify-end">

                    {/* Label */}
                    <div className="mb-2">
                      <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium text-white border border-white/10 font-sans">
                        {index === 0 ? "Latest Upload" : (video.tags?.[0] || 'Technical Analysis')}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold leading-tight text-white mb-2 font-sans line-clamp-2">
                      {video.title}
                    </h3>

                    {/* Meta */}
                    <div className="flex items-center gap-2 text-sm text-zinc-300 font-sans">
                      <span>{video.viewCount ? `${video.viewCount} views` : 'Watch now'}</span>
                      <span>•</span>
                      <span>{getRelativeTime(video.publishedAt)}</span>
                      {video.duration && (
                        <>
                          <span>•</span>
                          <span>{video.duration}</span>
                        </>
                      )}
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Research Areas (Was Technologies) */}
      <section id="research" className="scroll-mt-32 py-24 px-6 border-b border-zinc-100">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-zinc-900">Research Areas</h2>
            <p className="text-zinc-500 max-w-xl">Areas of Learning & Interest.</p>
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
      {/* Me Section - New Design */}
      <section id="me" className="py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-zinc-900">Me</h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Experience */}
            <div>
              <h3 className="text-xl font-medium text-zinc-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-900"></span>
                Experience
              </h3>
              <div className="space-y-8 pl-3 border-l border-zinc-200">
                {sortExperiences(workExperiences).map((experience, index) => (
                  <div key={index} className="relative pl-6 group">
                    <span className="absolute -left-[17px] top-1.5 w-2 h-2 rounded-full bg-white border-2 border-zinc-300 group-hover:border-rose-500 transition-colors"></span>

                    <h4 className="text-lg font-bold text-zinc-900 leading-tight">{experience.role}</h4>

                    <a href={experience.companyUrl} target="_blank" className="text-base text-zinc-700 hover:text-rose-600 transition-colors font-medium block mt-1">
                      {experience.companyName}
                    </a>

                    <div className="text-xs text-zinc-400 font-sans mt-1 mb-3 uppercase tracking-wider">
                      {new Date(experience.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {experience.endDate ? new Date(experience.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "Present"}
                    </div>

                    <div className="text-sm text-zinc-600 leading-relaxed font-sans">
                      {experience.description?.raw && <RichText content={experience.description.raw} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-xl font-medium text-zinc-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-900"></span>
                Education
              </h3>
              <div className="space-y-8 pl-3 border-l border-zinc-200">
                {sortExperiences(collegeExperiences).map((experience, index) => (
                  <div key={index} className="relative pl-6 group">
                    <span className="absolute -left-[17px] top-1.5 w-2 h-2 rounded-full bg-white border-2 border-zinc-300 group-hover:border-rose-500 transition-colors"></span>

                    <h4 className="text-lg font-bold text-zinc-900 leading-tight">{experience.collegeName}</h4>

                    <div className="text-base text-zinc-700 font-medium mt-1">
                      {experience.role}
                    </div>

                    <div className="text-xs text-zinc-400 font-sans mt-1 mb-3 uppercase tracking-wider">
                      {new Date(experience.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {experience.endDate ? new Date(experience.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "Present"}
                    </div>

                    <div className="text-sm text-zinc-600 leading-relaxed font-sans">
                      {experience.description?.raw && <RichText content={experience.description.raw} />}
                    </div>
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