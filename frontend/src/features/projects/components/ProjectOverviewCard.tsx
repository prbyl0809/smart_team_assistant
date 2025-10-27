import { Box, Typography } from "@mui/material";
import InlineEditableText from "../../../shared/components/inline/InlineEditableText";
import { ProjectUpdatePayload } from "../api/projects";
import { colors } from "../../../shared/styles/colors";

type ProjectOverviewCardProps = {
  description: string;
  onUpdate: (payload: ProjectUpdatePayload) => Promise<void>;
};

export default function ProjectOverviewCard({
  description,
  onUpdate,
}: ProjectOverviewCardProps) {
  return (
    <Box
      sx={{
        borderRadius: 2,
        border: `1px solid ${colors.border.subtle}`,
        backgroundColor: colors.base.surface,
        px: { xs: 2.5, md: 3 },
        py: { xs: 2.5, md: 3 },
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6">Overview</Typography>
      <Typography variant="body2" color="text.secondary">
        Share context, goals, and scope of this project with your team.
      </Typography>
      <InlineEditableText
        value={description}
        placeholder="Add a detailed description to align the team"
        onSave={(value) => onUpdate({ description: value })}
        multiline
        minRows={4}
      />
    </Box>
  );
}
