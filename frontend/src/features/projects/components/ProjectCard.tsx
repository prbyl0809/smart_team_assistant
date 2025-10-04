import { Button, Card, CardContent, Typography } from "@mui/material";
import { Project } from "../../../types/project";
import { Link } from "react-router-dom";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  return (
    <Card sx={{ backgroundColor: "primary", mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{project.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {project.description}
        </Typography>
        <Button
          component={Link}
          to={`/projects/${project.id}`}
          sx={{ mt: 2 }}
          variant="contained"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
