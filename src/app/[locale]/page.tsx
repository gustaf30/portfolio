import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Timeline } from "@/components/timeline";
import { Contact } from "@/components/contact";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main-content">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Timeline />
      <Contact />
    </main>
  );
}
