import { useParams } from "react-router-dom";
import { useProjectDetails } from "../hooks/useProjectDetails";
import {
  CircularProgress,
  Container,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CreateTaskForm from "../components/CreateTaskForm";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const projectId = Number(id);
  const { data, isLoading, isError, error } = useProjectDetails(projectId!);

  if (isLoading) return <CircularProgress />;
  if (isError || !data)
    return <div>Error loading project details. {error?.message}</div>;

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          {data.project.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {data.project.description}
        </Typography>

        <Typography variant="h6" mt={4}>
          Tasks
        </Typography>
        <List>
          {data.tasks.map((task) => (
            <ListItem key={task.id}>
              <ListItemText
                primary={task.title}
                secondary={`Status: ${task.status} | Priority: ${task.priority}`}
              />
            </ListItem>
          ))}
          {data.tasks.length === 0 && <Typography>No tasks yet.</Typography>}
        </List>
      </Box>

      <CreateTaskForm projectId={data.project.id} />
    </Container>
  );
}
