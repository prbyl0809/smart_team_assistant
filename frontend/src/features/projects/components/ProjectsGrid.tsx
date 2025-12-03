import Grid from "@mui/material/Grid";
import ProjectCard, { ProjectCardSkeleton } from "./ProjectCard";
import { Project } from "../../../types/project";

type ProjectsGridProps = {
  projects: Project[] | undefined;
  isLoading: boolean;
  isEmpty: boolean;
};

export function ProjectsGrid({
  projects,
  isLoading,
  isEmpty,
}: ProjectsGridProps) {
  if (isLoading) {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: 4 }).map(() => (
          <Grid size={4} key={Math.random()}>
            <ProjectCardSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (isEmpty || !projects) {
    return null;
  }

  return (
    <Grid container spacing={3}>
      {projects.map((project) => (
        <Grid size={4} key={project.id}>
          <ProjectCard project={project} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProjectsGrid;
