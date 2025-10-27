import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentCreatePayload, createProjectComment } from "../api/comments";
import { ProjectComment } from "../../../types/comment";

export const useCreateProjectComment = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation<ProjectComment, unknown, CommentCreatePayload>({
    mutationFn: (payload) => createProjectComment(projectId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project", projectId, "comments"],
      });
    },
  });
};
