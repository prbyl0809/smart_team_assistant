import { Container, Typography, CircularProgress, Box } from "@mui/material";
import ProjectAccordion from "../components/ProjectAccordion";
import { useProjects } from "../hooks/useProjects";

export default function DashboardPage() {
  const { data: projects, isLoading, isError, error } = useProjects();

  if (isLoading) return <CircularProgress />;
  if (isError || !projects)
    return <Typography>Error: {error?.message}</Typography>;

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom mt={4}>
        My Projects
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        {projects.map((project) => (
          <ProjectAccordion key={project.id} project={project} />
        ))}
      </Box>
    </Container>
  );
}
