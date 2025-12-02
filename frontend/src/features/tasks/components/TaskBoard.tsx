import {
  DndContext,
  closestCenter,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import TaskColumn from "./TaskColumn";
import TaskCard from "./TaskCard";
import { Task } from "../../../types/task";
import { Box } from "@mui/material";
import { useUpdateTaskStatus } from "../hooks/useUpdateTaskStatus";
import { colors } from "../../../shared/styles/colors";
import { alpha } from "@mui/material/styles";
import { useUsers } from "../../users/hooks/useUsers";
import { boardColumns } from "../../../shared/constants/dashboard";

type Props = {
  tasks: Task[];
  projectId: number;
};

export default function TaskBoard({ tasks: incomingTasks, projectId }: Props) {
  const [tasks, setTasks] = useState<Task[]>(incomingTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const { mutate: updateStatus } = useUpdateTaskStatus(projectId);
  const { data: users = [] } = useUsers();
  const userList = users ?? [];

  useEffect(() => {
    setTasks(incomingTasks);
  }, [incomingTasks]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over || active.id === over.id) return;

    const sourceTask = tasks.find((t) => t.id === active.id);
    const newStatus = over?.data?.current?.status as Task["status"] | undefined;
    if (!sourceTask || !newStatus) return;

    const updatedTasks = tasks.map((t) =>
      t.id === active.id ? { ...t, status: newStatus } : t
    );
    setTasks(updatedTasks);
    updateStatus({ taskId: sourceTask.id, status: newStatus });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          p: { xs: 1.25, md: 1.75 },
          borderRadius: 3,
          border: `1px solid ${colors.border.default}`,
          background: colors.base.surfaceAlt,
          boxShadow: `0 10px 26px ${alpha(colors.border.default, 0.35)}`,
          overflow: "hidden",
        }}
      >
        <Box
          data-project-id={projectId}
          sx={{
            display: "grid",
            gap: { xs: 1.25, md: 1.5 },
            gridTemplateColumns: {
              xs: `repeat(${boardColumns.length}, minmax(260px, 1fr))`,
              lg: `repeat(${boardColumns.length}, minmax(0, 1fr))`,
            },
            alignItems: "stretch",
            overflowX: "auto",
            pb: 0.5,
            pr: { xs: 1, md: 0 },
          }}
        >
          {boardColumns.map((col) => (
            <Box
              key={col.status}
              sx={{
                minWidth: { xs: 260, md: 0 },
              }}
            >
              <TaskColumn
                status={col.status}
                label={col.label}
                tasks={tasks.filter((t) => t.status === col.status)}
                users={userList}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} users={userList} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
