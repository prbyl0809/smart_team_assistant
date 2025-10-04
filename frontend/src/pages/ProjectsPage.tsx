import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useProjects } from "../features/projects/hooks/useProjects";
import ProjectCard from "../features/projects/components/ProjectCard";
import ProjectForm from "../features/projects/components/ProjectForm";

export default function ProjectsPage() {
  const { data: projects, isLoading, isError } = useProjects();

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Your Projects
        </Typography>

        <ProjectForm />

        {isLoading && <CircularProgress />}
        {isError && (
          <Typography color="error">Failed to load projects</Typography>
        )}

        {projects?.length === 0 && <Typography>No projects found.</Typography>}

        {projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </Box>
    </Container>
  );
}
