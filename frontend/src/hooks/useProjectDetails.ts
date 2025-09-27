import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getProjectWithTasks } from "../api/projects";
import { Project } from "../types/project";
import { Task } from "../types/task";

export const useProjectDetails = (
  projectId: number,
  options?: UseQueryOptions<{ project: Project; tasks: Task[] }>
) => {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectWithTasks(projectId),
    enabled: !!projectId,
    ...options,
  });
};
