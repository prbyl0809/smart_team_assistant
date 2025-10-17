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

const columns = [
  { status: "todo", label: "To Do" },
  { status: "in_progress", label: "In Progress" },
  { status: "done", label: "Done" },
] as const;

type Props = {
  tasks: Task[];
  projectId: number;
};

export default function TaskBoard({ tasks: incomingTasks, projectId }: Props) {
  const [tasks, setTasks] = useState<Task[]>(incomingTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const { mutate: updateStatus } = useUpdateTaskStatus(projectId);

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
        display="flex"
        gap={2}
        justifyContent="space-between"
        alignItems="stretch"
        data-project-id={projectId}
      >
        {columns.map((col) => (
          <Box key={col.status} flex={1} minWidth={300}>
            <TaskColumn
              status={col.status}
              label={col.label}
              tasks={tasks.filter((t) => t.status === col.status)}
            />
          </Box>
        ))}
      </Box>

      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
