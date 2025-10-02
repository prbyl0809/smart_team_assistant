import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskStatus } from "../api/tasks";
import { TaskStatus, Task } from "../types/task";
import { Project } from "../types/project";

type ProjectDetails = { project: Project; tasks: Task[] };

export const useUpdateTaskStatus = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      taskId,
      status,
    }: {
      taskId: number;
      status: TaskStatus;
    }) => updateTaskStatus(projectId, taskId, status),
    onMutate: async ({ taskId, status }) => {
      await queryClient.cancelQueries({ queryKey: ["project", projectId] });

      const previous = queryClient.getQueryData<ProjectDetails>([
        "project",
        projectId,
      ]);

      if (previous) {
        queryClient.setQueryData<ProjectDetails>(["project", projectId], {
          ...previous,
          tasks: previous.tasks.map((task) =>
            task.id === taskId ? { ...task, status } : task
          ),
        });
      }

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["project", projectId], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
  });
};
