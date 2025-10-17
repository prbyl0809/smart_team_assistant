import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Project } from "../../../types/project";
import { useProjectDetails } from "../hooks/useProjectDetails";
import TaskBoard from "../../tasks/components/TaskBoard";
import { Link } from "react-router-dom";

type Props = {
  project: Project;
};

export default function ProjectAccordion({ project }: Props) {
  const [expanded, setExpanded] = useState(true);

  const { data, isLoading, isError } = useProjectDetails(project.id);

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography
          component={Link}
          to={`/projects/${project.id}`}
          onClick={(e) => e.stopPropagation()}
          color="textPrimary"
          sx={{ fontWeight: "bold", textDecoration: "none" }}
        >
          {project.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {isLoading && <CircularProgress />}
        {isError && (
          <Typography color="error">Failed to load tasks.</Typography>
        )}
        {data && <TaskBoard tasks={data.tasks} projectId={project.id} />}
      </AccordionDetails>
    </Accordion>
  );
}
