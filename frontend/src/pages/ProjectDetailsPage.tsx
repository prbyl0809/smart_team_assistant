import { useParams } from "react-router-dom";
import { useProjectDetails } from "../hooks/useProjectDetails";
import { CircularProgress, Container, Box, Typography } from "@mui/material";
import CreateTaskForm from "../components/CreateTaskForm";
import TaskList from "../components/TaskList";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const projectId = Number(id);

  const { data, isLoading, isError, error } = useProjectDetails(projectId);

  if (isLoading) return <CircularProgress />;
  if (isError || !data)
    return <div>Error loading project details. {error?.message}</div>;

  return (
    <Container maxWidth="xl">
      <Box
        mt={4}
        p={3}
        borderRadius={2}
        sx={{ backgroundColor: "background.paper" }}
      >
        <Typography variant="h4" gutterBottom>
          {data.project.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {data.project.description}
        </Typography>
        <Typography>
          Created at: {new Date(data.project.created_at).toLocaleDateString()}
        </Typography>

        <Typography variant="h6" mt={4}>
          Tasks
        </Typography>
        <TaskList tasks={data.tasks} projectId={projectId} />
        <CreateTaskForm projectId={projectId} />
      </Box>
    </Container>
  );
}
