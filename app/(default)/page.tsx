import { getActiveProjectHome } from "@/lib/project-pages";

// Spec 005 FR-018: page-level generateMetadata removed — the root layout
// (app/layout.tsx) is the single metadata source; this page previously
// duplicated title/description metadata tags.
export default function Home() {
  const ProjectHome = getActiveProjectHome();
  return <ProjectHome />;
}
