import { ImageResponse } from "next/og";
import { projects } from "@/lib/data";
import { getTranslations } from "next-intl/server";

export const alt = "Project preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#0a0a0f",
          display: "flex",
        }}
      />,
      { ...size }
    );
  }

  const t = await getTranslations({ locale, namespace: "projects" });

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0f",
        color: "#e0e0e0",
        fontFamily: "sans-serif",
        padding: "60px",
      }}
    >
      <div
        style={{
          fontSize: "20px",
          color: "#4361ee",
          letterSpacing: "0.1em",
          marginBottom: "16px",
        }}
      >
        Gustavo Ferraz — {t("sectionTitle")}
      </div>
      <div
        style={{
          fontSize: "56px",
          fontWeight: 700,
          textAlign: "center",
          marginBottom: "24px",
        }}
      >
        {t(`${slug}.title`)}
      </div>
      <div
        style={{
          fontSize: "20px",
          color: "#8888aa",
          textAlign: "center",
          maxWidth: "800px",
          marginBottom: "32px",
        }}
      >
        {t(`${slug}.description`)}
      </div>
      <div style={{ display: "flex", gap: "12px" }}>
        {project.tags.map((tag) => (
          <div
            key={tag}
            style={{
              backgroundColor: "#1a1a2e",
              color: "#6b83f2",
              padding: "8px 16px",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>,
    { ...size }
  );
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
