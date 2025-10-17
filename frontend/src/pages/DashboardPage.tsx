import { Container, Typography, CircularProgress, Box } from "@mui/material";
import ProjectAccordion from "../features/projects/components/ProjectAccordion";
import { useProjects } from "../features/projects/hooks/useProjects";
import HeroBanner from "../shared/components/HeroBanner";
import { pageShellSx } from "../shared/styles/layout";
import { colors } from "../shared/styles/colors";

export default function DashboardPage() {
  const { data: projects, isLoading, isError, error } = useProjects();

  if (isLoading) return <CircularProgress />;
  if (isError || !projects)
    return <Typography>Error: {error?.message}</Typography>;

  return (
    <Box sx={pageShellSx}>
      <HeroBanner containerProps={{ maxWidth: "xl" }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700 }} gutterBottom>
            Stay on top of every project
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: colors.text.tertiary,
              maxWidth: 520,
            }}
          >
            Manage tasks, track progress, and collaborate seamlessly with our
            intuitive project management tools designed for teams of all sizes.
          </Typography>
        </Box>
      </HeroBanner>

      <Container maxWidth="xl">
        <Typography
          variant="h4"
          gutterBottom
          sx={(theme) => ({
            color: theme.palette.text.primary,
          })}
        >
          Projects
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          {projects.map((project) => (
            <ProjectAccordion key={project.id} project={project} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
