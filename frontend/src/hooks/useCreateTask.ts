import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, TaskCreate } from "../api/tasks";

export const useCreateTask = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskData: TaskCreate) => createTask(projectId, taskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
  });
};
