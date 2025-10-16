import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask, TaskUpdatePayload } from "../api/tasks";
import { Task } from "../../../types/task";
import { Project } from "../../../types/project";

type ProjectDetails = { project: Project; tasks: Task[] };

type Variables = {
  taskId: number;
  updates: TaskUpdatePayload;
};

type Context = {
  previous?: ProjectDetails;
};

export const useUpdateTask = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation<Task, unknown, Variables, Context>({
    mutationFn: ({ taskId, updates }) =>
      updateTask(projectId, taskId, updates),
    onMutate: async ({ taskId, updates }) => {
      await queryClient.cancelQueries({ queryKey: ["project", projectId] });

      const previous = queryClient.getQueryData<ProjectDetails>([
        "project",
        projectId,
      ]);

      if (previous) {
        queryClient.setQueryData<ProjectDetails>(["project", projectId], {
          ...previous,
          tasks: previous.tasks.map((task) =>
            task.id === taskId ? { ...task, ...updates } : task
          ),
        });
      }

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["project", projectId], context.previous);
      }
    },
    onSuccess: (updatedTask) => {
      const previous = queryClient.getQueryData<ProjectDetails>([
        "project",
        projectId,
      ]);

      if (previous) {
        queryClient.setQueryData<ProjectDetails>(["project", projectId], {
          ...previous,
          tasks: previous.tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          ),
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
  });
};
