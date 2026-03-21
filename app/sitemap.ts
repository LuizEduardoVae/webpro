import { MetadataRoute } from "next";
import { fetchHygraphQuery } from "./utils/fetch-hygraph-query";
import { ProjectsPageStaticData } from "./types/page-info";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let projectEntries: MetadataRoute.Sitemap = [];

  try {
    const query = `
      query ProjectsSlugsQuery {
        projects(first: 100) {
          slug
        }
      }
    `;

    const data = await fetchHygraphQuery<ProjectsPageStaticData>(query);

    if (data && data.projects) {
      projectEntries = data.projects.map((project) => ({
        url: `https://luizvedoatowebsite.vercel.app/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error("Failed to fetch projects for sitemap", error);
  }

  return [
    {
      url: "https://luizvedoatowebsite.vercel.app",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://luizvedoatowebsite.vercel.app/projects",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...projectEntries,
  ];
}
