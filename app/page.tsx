import { fetchHygraphQuery } from "./utils/fetch-hygraph-query";
import { HomePageData } from "./types/page-info";
import Image from "next/image";
import Link from "next/link";
import { getLatestVideos } from "./lib/youtube";
import { RichText } from "./components/rich-text";
import { DynamicNav } from "./components/dynamic-nav";
import { ContactEmailForm } from "./components/contact-email-form";

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
      knowTechs {
        iconSvg
        name
        startDate
      }
    }
    highlightProjects: projects(first: 3, orderBy: anopublicacao_DESC) {
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
`;
  return fetchHygraphQuery(query);
};

export const revalidate = 60;

export default async function Home() {
  const {
    page: pageData,
    workExperiences,
    collegeExperiences,
    highlightProjects,
  } = await getPageData();
  const videos = await getLatestVideos();

  function sortExperiences<
    T extends { startDate: string; endDate?: string | null }
  >(experiences: T[]): T[] {
    if (!experiences) return [];

    return [...experiences].sort((a, b) => {
      const endDateA = a.endDate ? new Date(a.endDate).getTime() : Infinity;
      const endDateB = b.endDate ? new Date(b.endDate).getTime() : Infinity;

      if (endDateA !== endDateB) {
        return endDateB - endDateA;
      }

      const startDateA = new Date(a.startDate).getTime();
      const startDateB = new Date(b.startDate).getTime();

      return startDateB - startDateA;
    });
  }

  const sortedWorkExperiences = sortExperiences(workExperiences);
  const sortedCollegeExperiences = sortExperiences(collegeExperiences);

  return (
    <>
      <DynamicNav />

      <main className="pt-24">
        {/* Section 1: Hero */}
        <section className="max-w-screen-2xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          <div className="flex-1 space-y-8">
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter">
              Hi, I'm Luiz
              <br />
              <span className="text-outline">
                Researcher & Engineering Student
              </span>
            </h1>
            <p className="text-lg md:text-xl max-w-2xl leading-relaxed text-secondary italic">
              I'm a Data Science researcher and an Electrical Engineering
              student at the Federal University of Espírito Santo. I also create
              educational content on YouTube.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                className="bg-primary text-white px-8 py-4 font-headline font-bold uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                href="#projects"
              >
                View Projects
              </Link>
              <Link
                className="scribble-border px-8 py-4 font-headline font-bold uppercase tracking-widest hover:bg-surface-container-low transition-all"
                href="#videos"
              >
                Watch Videos
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/3 aspect-square relative">
            <div className="absolute inset-0 scribble-border rotate-3 bg-white"></div>
            <div className="absolute inset-0 scribble-border -rotate-2 bg-white flex items-center justify-center overflow-hidden">
              {pageData.profilePicture?.url && (
                <Image
                  src={pageData.profilePicture.url}
                  alt="Profile Picture"
                  fill
                  className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply opacity-90"
                />
              )}
            </div>
          </div>
        </section>

        {/* Section 2: Featured Projects */}
        <section className="bg-surface-container-low py-24" id="projects">
          <div className="max-w-screen-2xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <h2 className="font-headline text-4xl font-black uppercase flex items-center gap-4">
                <span className="material-symbols-outlined text-4xl">
                  architecture
                </span>
                Featured Projects
              </h2>
              <Link
                href="/projects"
                className="bg-primary text-white px-6 py-2 font-headline font-bold uppercase tracking-widest active:translate-x-1 active:translate-y-1 transition-all inline-flex items-center gap-2 self-start"
              >
                All Projects{" "}
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {highlightProjects.map((project) => (
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
                  <h3 className="font-headline text-2xl font-bold uppercase">
                    {project.title}
                  </h3>
                  <p className="text-secondary text-sm leading-snug line-clamp-3">
                    {(project.jornalcongresso?.raw as any)?.children?.[0]
                      ?.children?.[0]?.text || project.shortDescription}
                  </p>
                  <div className="mt-auto flex justify-between items-center">
                    <span className="font-mono text-xs uppercase bg-black text-white px-2 py-1">
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
        </section>

        {/* Section 3: Latest Videos */}
        <section className="py-24 max-w-screen-2xl mx-auto px-6" id="videos">
          <h2 className="font-headline text-4xl font-black uppercase mb-12 flex items-center gap-4">
            <span className="material-symbols-outlined text-4xl">videocam</span>
            LATEST VIDEOS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.slice(0, 4).map((video) => {
              const isPlaylist = video.url.includes("playlist?list=");
              const badgeLabel = isPlaylist ? "PLAYLIST" : "VIDEO";

              return (
                <a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group cursor-pointer block relative"
                >
                  <div className="aspect-video scribble-border-sm mb-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all z-10"></div>
                    {video.thumbnail && (
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <span className="material-symbols-outlined text-5xl text-white drop-shadow-md">
                        play_circle
                      </span>
                    </div>
                  </div>

                  <div className="mb-2">
                    <span className="inline-block border border-black text-black px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-white">
                      {badgeLabel}
                    </span>
                  </div>

                  <h4
                    className="font-bold text-sm uppercase leading-tight px-1 line-clamp-2"
                    title={video.title}
                  >
                    {video.title}
                  </h4>
                </a>
              );
            })}
          </div>
        </section>

        {/* Section 4: Academic Research */}
        <section className="py-24 bg-black text-white" id="research">
          <div className="max-w-screen-2xl mx-auto px-6">
            <h2 className="font-headline text-4xl font-black uppercase mb-12 flex items-center gap-4">
              <span className="material-symbols-outlined text-4xl">
                science
              </span>
              RESEARCH AREAS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {pageData.knowTechs.slice(0, 4).map((tech) => (
                <div
                  key={tech.name}
                  className="border-2 border-white p-10 flex gap-8"
                >
                  <div className="shrink-0">
                    {tech.iconSvg ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: tech.iconSvg }}
                        className="w-12 h-12 [&>svg]:w-full [&>svg]:h-full fill-white"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-6xl">
                        neurology
                      </span>
                    )}
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-headline text-3xl font-bold uppercase tracking-tight">
                      {tech.name}
                    </h3>
                    <p className="text-on-primary-fixed-variant leading-relaxed">
                      Since {new Date(tech.startDate).getFullYear()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Journey */}
        <section className="py-24 max-w-screen-2xl mx-auto px-6" id="journey">
          <h2 className="font-headline text-4xl font-black uppercase mb-20 text-center">
            My Engineering Journey
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 relative max-w-5xl mx-auto">
            {/* Work Experience Column */}
            <div className="relative">
              <h3 className="font-headline text-2xl font-bold uppercase mb-12 flex items-center gap-3">
                <span className="material-symbols-outlined">work</span>
                Work Experience
              </h3>

              <div className="space-y-12">
                {sortedWorkExperiences.map((exp, index) => (
                  <div key={index} className="relative">
                    <div className="scribble-border-sm p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5">
                        {new Date(exp.startDate).getFullYear()} -{" "}
                        {exp.endDate
                          ? new Date(exp.endDate).getFullYear()
                          : "PRESENT"}
                      </span>
                      <h4 className="font-headline text-xl font-black uppercase mt-2">
                        {exp.role}
                      </h4>
                      <p className="text-sm font-bold text-secondary mb-2">
                        {exp.companyName}
                      </p>
                      {exp.description?.raw && (
                        <div className="text-sm leading-relaxed text-zinc-600">
                          <RichText content={exp.description.raw} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Column */}
            <div className="relative">
              <h3 className="font-headline text-2xl font-bold uppercase mb-12 flex items-center gap-3">
                <span className="material-symbols-outlined">school</span>
                Education
              </h3>

              <div className="space-y-12">
                {sortedCollegeExperiences.map((exp, index) => (
                  <div key={index} className="relative">
                    <div className="scribble-border-sm p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5">
                        {new Date(exp.startDate).getFullYear()} -{" "}
                        {exp.endDate
                          ? new Date(exp.endDate).getFullYear()
                          : "PRESENT"}
                      </span>
                      <h4 className="font-headline text-xl font-black uppercase mt-2">
                        {exp.collegeName}
                      </h4>
                      <p className="text-sm font-bold text-secondary mb-2">
                        {exp.role}
                      </p>
                      {exp.description?.raw && (
                        <div className="text-sm leading-relaxed text-zinc-600">
                          <RichText content={exp.description.raw} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Let's Collaborate */}
        <section className="py-24 border-t-4 border-black" id="contact">
          <div className="max-w-screen-xl mx-auto px-6 text-center space-y-12">
            <h2 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter">
              Let's Collaborate
            </h2>
            <p className="text-xl max-w-2xl mx-auto italic text-secondary">
              Collaborations, sponsorships, or just saying hello. I check my
              emails frequently.
            </p>

            <ContactEmailForm />

            <div className="flex justify-center gap-10 pt-10 flex-wrap">
              {pageData.socials.map((social, index) => {
                let iconName = "link";
                const urlLower = social.url.toLowerCase();
                if (urlLower.includes("linkedin")) iconName = "work";
                if (urlLower.includes("github")) iconName = "code";
                if (urlLower.includes("lattes")) iconName = "school";
                if (urlLower.includes("researchgate")) iconName = "menu_book";
                if (
                  urlLower.includes("youtube") ||
                  urlLower.includes("youtu.be")
                )
                  iconName = "smart_display";

                const nameMatch = social.url.match(
                  /github|linkedin|youtube|lattes|researchgate/i
                );
                const name = nameMatch ? nameMatch[0] : `Link ${index + 1}`;

                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-12 h-12 scribble-border flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all bg-white">
                      {social.iconSvg ? (
                        <div
                          dangerouslySetInnerHTML={{ __html: social.iconSvg }}
                          className="w-6 h-6 [&>svg]:w-full [&>svg]:h-full fill-current"
                        />
                      ) : (
                        <span className="material-symbols-outlined">
                          {iconName}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold uppercase">{name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t-4 border-black bg-zinc-50">
        <div className="flex justify-center items-center px-10 py-12 w-full max-w-screen-2xl mx-auto text-black font-body text-sm tracking-tight font-bold">
          <div>© 2026 Luiz Vedoato</div>
        </div>
      </footer>
    </>
  );
}
