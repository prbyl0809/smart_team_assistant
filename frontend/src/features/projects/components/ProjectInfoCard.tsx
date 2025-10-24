import type { ReactNode } from "react";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Project } from "../../../types/project";
import { glassPanel } from "../../../shared/styles/glassPanel";
import { projectPriorityOptions, projectStatusOptions } from "./constants";

type ProjectInfoCardProps = {
  project: Project;
};

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

export default function ProjectInfoCard({ project }: ProjectInfoCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        ...glassPanel(),
      }}
    >
      <Typography variant="h6" gutterBottom>
        Project info
      </Typography>
      <Stack spacing={1.5}>
        <InfoRow label="Created" value={formatDateTime(project.created_at)} />
        <InfoRow label="Updated" value={formatDateTime(project.updated_at)} />
        <InfoRow
          label="Status"
          value={
            <Chip
              size="small"
              label={
                projectStatusOptions.find(
                  (option) => option.value === project.status
                )?.label ?? project.status
              }
              sx={(theme) => ({
                bgcolor: alpha(theme.palette.secondary.main, 0.14),
                color: theme.palette.secondary.light,
                border: `1px solid ${alpha(
                  theme.palette.secondary.main,
                  0.32
                )}`,
                fontWeight: 500,
                letterSpacing: "0.02em",
              })}
            />
          }
        />
        <InfoRow
          label="Priority"
          value={
            <Chip
              size="small"
              label={
                projectPriorityOptions.find(
                  (option) => option.value === project.priority
                )?.label ?? project.priority
              }
              sx={(theme) => ({
                bgcolor: alpha(theme.palette.primary.main, 0.12),
                color: theme.palette.primary.light,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                fontWeight: 500,
                letterSpacing: "0.02em",
              })}
            />
          }
        />
        <InfoRow label="Archived" value={project.is_archived ? "Yes" : "No"} />
      </Stack>
    </Paper>
  );
}

type InfoRowProps = {
  label: string;
  value: string | number | ReactNode;
};

function InfoRow({ label, value }: InfoRowProps) {
  const content =
    typeof value === "string" || typeof value === "number" ? (
      <Typography fontWeight={500}>{value}</Typography>
    ) : (
      <Box>{value}</Box>
    );

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      gap={2}
    >
      <Typography color="text.secondary">{label}</Typography>
      {content}
    </Stack>
  );
}
