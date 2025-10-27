import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchProjectComments } from "../api/comments";
import { ProjectComment } from "../../../types/comment";

export const useProjectComments = (
  projectId: number,
  options?: UseQueryOptions<ProjectComment[], Error>
) => {
  return useQuery<ProjectComment[], Error>({
    queryKey: ["project", projectId, "comments"],
    queryFn: () => fetchProjectComments(projectId),
    enabled: !!projectId,
    staleTime: 15_000,
    ...options,
  });
};
