import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject, ProjectUpdatePayload } from "../api/projects";
import { Project } from "../../../types/project";
import { Task } from "../../../types/task";

type ProjectDetails = { project: Project; tasks: Task[] };

type Context = { previous?: ProjectDetails };

export const useUpdateProject = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation<Project, unknown, ProjectUpdatePayload, Context>({
    mutationFn: (updates) => updateProject(projectId, updates),
    onMutate: async (updates) => {
      await queryClient.cancelQueries({ queryKey: ["project", projectId] });

      const previous = queryClient.getQueryData<ProjectDetails>([
        "project",
        projectId,
      ]);

      if (previous) {
        const optimisticProject: Project = {
          ...previous.project,
          ...updates,
          updated_at: new Date().toISOString(),
        } as Project;

        queryClient.setQueryData<ProjectDetails>(["project", projectId], {
          project: optimisticProject,
          tasks: previous.tasks,
        });
      }

      return { previous };
    },
    onError: (_error, _updates, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["project", projectId], context.previous);
      }
    },
    onSuccess: (project) => {
      const previous = queryClient.getQueryData<ProjectDetails>([
        "project",
        projectId,
      ]);

      queryClient.setQueryData<ProjectDetails>(["project", projectId], {
        project,
        tasks: previous?.tasks ?? [],
      });

      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
  });
};
