import { HeroSection } from "./components/pages/home/hero-section"
import { KnowTechs } from "./components/pages/home/know-techs"
import { CollegeExperience } from "./components/pages/home/College"
import { HighLightedProjects } from "./components/pages/home/highlighted-projects"
import { WorkExperience } from "./components/pages/home/work-experience"
import { fetchHygraphQuery } from "./utils/fetch-hygraph-query"
import { HomePageData } from "./types/page-info"


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

  return fetchHygraphQuery(
    query,
  )

}

export default async function Home() {
  const { page: pageData, workExperiences, collegeExperiences } = await getPageData();

  return (
    <>
      <HeroSection homeInfo={pageData}></HeroSection>
      <KnowTechs techs={pageData.knowTechs}></KnowTechs>
      <CollegeExperience collegeexperiences={collegeExperiences}></CollegeExperience> 
      <HighLightedProjects projects={pageData.highlightProjects}></HighLightedProjects>
      <WorkExperience experiences={workExperiences}></WorkExperience>
    </>
  )
}


















// query PageInfoQuery {
//   page(where: {slug: "home"}) {
//     introduction {
//       raw
//     }
//     technologies {
//       name
//     }
//     profilePicture {
//       url
//     }
//     socials {
//       url
//       iconSvg
//     }
//     knownTechs {
//       iconSvg
//       name
//       startDate
//     }
//     College {
//       companyLogo {
//         url
//       }
//       course
//       companyName
//       companyUrl
//       startDate
//       endDate
//       description {
//         raw
//       }
//     }
//     highlightProjects {
//       slug
//       thumbnail {
//         url
//       }
//       title
//       shortDescription
//       technologies {
//         name
//       }
//     }
//   }
//   workExperiences {
//     companyLogo {
//       url
//     }
//     role
//     companyName
//     companyUrl
//     startDate
//     endDate
//     description {
//       raw
//     }
//     technologies {
//       name
//     }
//   }
// }
// `
// Testedsasddsa