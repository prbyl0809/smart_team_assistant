import { Paper, Typography } from "@mui/material";
import InlineEditableText from "../../../shared/components/inline/InlineEditableText";
import { glassPanel } from "../../../shared/styles/glassPanel";
import { ProjectUpdatePayload } from "../api/projects";

type ProjectOverviewCardProps = {
  description: string;
  onUpdate: (payload: ProjectUpdatePayload) => Promise<void>;
};

export default function ProjectOverviewCard({
  description,
  onUpdate,
}: ProjectOverviewCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        ...glassPanel(),
      }}
    >
      <Typography variant="h6" gutterBottom>
        Overview
      </Typography>
      <InlineEditableText
        value={description}
        placeholder="Add a detailed description to align the team"
        onSave={(value) => onUpdate({ description: value })}
        multiline
        minRows={4}
      />
    </Paper>
  );
}
