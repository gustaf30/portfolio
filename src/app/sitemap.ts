import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";
import { siteConfig } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const homeEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          "pt-BR": baseUrl,
          en: `${baseUrl}/en`,
        },
      },
    },
  ];

  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: {
      languages: {
        "pt-BR": `${baseUrl}/projects/${p.slug}`,
        en: `${baseUrl}/en/projects/${p.slug}`,
      },
    },
  }));

  return [...homeEntries, ...projectEntries];
}
