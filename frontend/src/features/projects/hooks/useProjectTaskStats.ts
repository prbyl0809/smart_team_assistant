import { useMemo } from "react";
import { Task } from "../../../types/task";
import { colors } from "../../../shared/styles/colors";

export type TaskSummaryStat = {
  label: string;
  value: number;
  color: string;
};

export const useProjectTaskStats = (tasks: Task[]): TaskSummaryStat[] =>
  useMemo(() => {
    const total = tasks.length;
    const todo = tasks.filter((task) => task.status === "todo").length;
    const inProgress = tasks.filter(
      (task) => task.status === "in_progress"
    ).length;
    const done = tasks.filter((task) => task.status === "done").length;

    return [
      { label: "Total issues", value: total, color: colors.text.primary },
      { label: "To do", value: todo, color: colors.statusUi.todo.text },
      {
        label: "In progress",
        value: inProgress,
        color: colors.statusUi.inProgress.text,
      },
      { label: "Done", value: done, color: colors.statusUi.done.text },
    ];
  }, [tasks]);
