import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/metadata";

export async function JsonLd() {
  const tMeta = await getTranslations("metadata");
  const tJsonLd = await getTranslations("jsonLd");

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: tJsonLd("jobTitle"),
    sameAs: [siteConfig.github, siteConfig.linkedin],
    email: siteConfig.email,
    knowsAbout: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: tMeta("description"),
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
