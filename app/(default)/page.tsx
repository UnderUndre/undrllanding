import { getActiveProjectHome } from "@/lib/project-pages";
import { getActiveProjectConfig } from "@/lib/project-config";

export function generateMetadata() {
  const config = getActiveProjectConfig();

  return {
    title: config.title,
    description: config.description,
  };
}

export default function Home() {
  const ProjectHome = getActiveProjectHome();
  return <ProjectHome />;
}
