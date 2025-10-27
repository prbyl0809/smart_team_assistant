import { ReactNode } from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { Project } from "../../../types/project";
import { colors } from "../../../shared/styles/colors";
import { formatDateTime } from "../../../shared/utils/date";
import { projectPriorityOptions, projectStatusOptions } from "./constants";

type ProjectInfoCardProps = {
  project: Project;
  ownerName: string;
};

export default function ProjectInfoCard({
  project,
  ownerName,
}: ProjectInfoCardProps) {
  const statusChipLabel =
    projectStatusOptions.find((option) => option.value === project.status)
      ?.label ?? project.status;
  const priorityChipLabel =
    projectPriorityOptions.find((option) => option.value === project.priority)
      ?.label ?? project.priority;

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
      <Typography variant="h6">Project info</Typography>
      <Typography variant="body2" color="text.secondary">
        Key details and metadata about this project.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
        }}
      >
        <InfoCell label="Created" value={formatDateTime(project.created_at)} />
        <InfoCell label="Updated" value={formatDateTime(project.updated_at)} />
        <InfoCell label="Owner" value={ownerName} />
        <InfoCell
          label="Status"
          value={<StatusChip label={statusChipLabel} />}
        />
        <InfoCell
          label="Priority"
          value={<PriorityChip label={priorityChipLabel} />}
        />
        <InfoCell label="Archived" value={project.is_archived ? "Yes" : "No"} />
      </Box>
    </Box>
  );
}

type InfoCellProps = {
  label: string;
  value: ReactNode;
};

function InfoCell({ label, value }: InfoCellProps) {
  return (
    <Stack spacing={0.5}>
      <Typography
        variant="caption"
        sx={{ textTransform: "uppercase", color: colors.text.secondary }}
      >
        {label}
      </Typography>
      <Typography component="div" sx={{ fontWeight: 500 }}>
        {value}
      </Typography>
    </Stack>
  );
}

const StatusChip = ({ label }: { label: string }) => (
  <Chip
    size="small"
    label={label}
    sx={(theme) => ({
      bgcolor: alpha(theme.palette.secondary.main, 0.16),
      color: theme.palette.secondary.light,
      border: `1px solid ${alpha(theme.palette.secondary.main, 0.32)}`,
      fontWeight: 500,
      textTransform: "capitalize",
    })}
  />
);

const PriorityChip = ({ label }: { label: string }) => (
  <Chip
    size="small"
    label={label}
    sx={(theme) => ({
      bgcolor: alpha(theme.palette.primary.main, 0.12),
      color: theme.palette.primary.light,
      border: `1px solid ${alpha(theme.palette.primary.main, 0.32)}`,
      fontWeight: 500,
      textTransform: "capitalize",
    })}
  />
);
