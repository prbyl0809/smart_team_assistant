import { useMemo } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";

import InlineEditableText from "../../../shared/components/inline/InlineEditableText";
import InlineEditableSelect from "../../../shared/components/inline/InlineEditableSelect";
import InlineEditableDate from "../../../shared/components/inline/InlineEditableDate";
import InlineEditableSwitch from "../../../shared/components/inline/InlineEditableSwitch";

import {
  Project,
  ProjectPriority,
  ProjectStatus,
} from "../../../types/project";
import { ProjectUpdatePayload } from "../api/projects";
import { projectPriorityOptions, projectStatusOptions } from "./constants";
import { User } from "../../../types/user";
import { colors } from "../../../shared/styles/colors";

type ProjectDetailsHeaderProps = {
  project: Project;
  onUpdate: (payload: ProjectUpdatePayload) => Promise<void>;
  users: User[];
  isUsersLoading: boolean;
};

export default function ProjectDetailsHeader({
  project,
  onUpdate,
  users,
  isUsersLoading,
}: ProjectDetailsHeaderProps) {
  const ownerValue = String(project.owner_id);

  const ownerOptions = useMemo(() => {
    const mapped = users
      .map((user) => ({
        value: String(user.id),
        label: user.username,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    const options = [...mapped];

    if (
      project.owner_id &&
      !options.some((option) => option.value === ownerValue)
    ) {
      options.push({
        value: ownerValue,
        label: `Owner #${project.owner_id}`,
      });
    }

    return options;
  }, [users, project.owner_id, ownerValue]);

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
        gap: 2.5,
      }}
    >
      <Stack
        spacing={0.5}
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
      >
        <Typography variant="h6">Project summary</Typography>
        <Typography variant="body2" color="text.secondary">
          Manage project details and settings.
        </Typography>
      </Stack>

      <InlineEditableText
        value={project.name}
        label="Project name"
        placeholder="Name your project"
        validate={(value) => (value ? null : "Project name is required")}
        onSave={(value) => onUpdate({ name: value })}
      />

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems={{ xs: "flex-start", md: "center" }}
        flexWrap="wrap"
        useFlexGap
      >
        <InlineEditableSelect<ProjectStatus>
          value={project.status}
          options={projectStatusOptions}
          onSave={(status) => onUpdate({ status })}
          placeholder="Select status"
          label="Choose project status"
        />
        <InlineEditableSelect<ProjectPriority>
          value={project.priority}
          options={projectPriorityOptions}
          onSave={(priority) => onUpdate({ priority })}
          placeholder="Select priority"
          label="Choose project priority"
        />
        <InlineEditableDate
          value={project.due_date}
          onSave={(due_date) => onUpdate({ due_date })}
          label="Due date"
        />
        <InlineEditableSelect<string>
          value={ownerValue}
          options={ownerOptions}
          onSave={(value) => onUpdate({ owner_id: Number(value) })}
          placeholder={
            isUsersLoading ? "Loading owners..." : "Select project owner"
          }
          label="Choose project owner"
          disabled={isUsersLoading || ownerOptions.length === 0}
        />
      </Stack>

      <Divider sx={{ borderColor: colors.border.subtle }} />

      <InlineEditableSwitch
        value={project.is_archived}
        label={project.is_archived ? "Archived" : "Active"}
        description="Toggle archive state for this project"
        onSave={(is_archived) => onUpdate({ is_archived })}
      />
    </Box>
  );
}
