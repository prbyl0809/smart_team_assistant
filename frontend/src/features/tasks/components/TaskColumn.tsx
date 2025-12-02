import { Paper, Typography, Box, Chip, Stack } from "@mui/material";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task } from "../../../types/task";
import SortableTask from "./SortableTask";
import { useDroppable } from "@dnd-kit/core";
import { colors } from "../../../shared/styles/colors";
import { alpha } from "@mui/material/styles";
import { User } from "../../../types/user";

type Props = {
  status: Task["status"];
  label: string;
  tasks: Task[];
  users: User[];
};

export default function TaskColumn({ status, label, tasks, users }: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: {
      status,
    },
  });
  const accent = colors.accent.primary.main;

  return (
    <Paper
      ref={setNodeRef}
      sx={{
        p: { xs: 1.75, md: 2 },
        background: colors.kanban.columnBg,
        borderRadius: 2.5,
        border: `1px solid ${colors.border.default}`,
        boxShadow: isOver
          ? `0 14px 28px ${alpha(colors.border.default, 0.45)}`
          : `0 10px 24px ${alpha(colors.border.default, 0.25)}`,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 1.25,
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 0.5, pr: 0.5 }}
      >
        <Stack spacing={0.5}>
          <Typography
            variant="subtitle2"
            sx={{
              color: colors.text.tertiary,
              letterSpacing: 0.4,
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            {label}
          </Typography>
          <Box
            sx={{
              width: 36,
              height: 2,
              borderRadius: 99,
              background: `linear-gradient(90deg, ${alpha(
                accent,
                0.3
              )}, ${alpha(accent, 0.05)})`,
            }}
          />
        </Stack>
        <Chip
          label={`${tasks.length} item${tasks.length === 1 ? "" : "s"}`}
          size="small"
          sx={{
            borderRadius: 1.5,
            bgcolor: colors.base.surfaceAlt,
            border: `1px solid ${colors.border.default}`,
            color: colors.text.secondary,
            fontWeight: 600,
          }}
        />
      </Stack>

      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap={1.1}
          flexGrow={1}
          sx={{
            minHeight: 220,
            backgroundColor: colors.base.surfaceAlt,
            borderRadius: 2,
            border: `1px dashed ${alpha(accent, isOver ? 0.35 : 0.18)}`,
            p: 0.75,
            transition: "border-color 0.2s ease, background-color 0.2s ease",
            outline: isOver
              ? `1px solid ${alpha(accent, 0.35)}`
              : "1px solid transparent",
          }}
        >
          {tasks.length === 0 ? (
            <Box
              sx={{
                flexGrow: 1,
                display: "grid",
                placeItems: "center",
                color: colors.text.tertiary,
                borderRadius: 2,
                textAlign: "center",
                fontSize: "0.85rem",
                px: 1,
              }}
            >
              Drop tasks here
            </Box>
          ) : (
            tasks.map((task) => (
              <SortableTask
                key={task.id}
                task={task}
                status={status}
                users={users}
              />
            ))
          )}
        </Box>
      </SortableContext>
    </Paper>
  );
}
