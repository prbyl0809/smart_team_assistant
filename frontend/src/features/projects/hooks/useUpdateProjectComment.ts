import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentUpdatePayload, updateProjectComment } from "../api/comments";
import { ProjectComment } from "../../../types/comment";

type Variables = {
  commentId: number;
  payload: CommentUpdatePayload;
};

export const useUpdateProjectComment = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation<ProjectComment, unknown, Variables>({
    mutationFn: ({ commentId, payload }) =>
      updateProjectComment(projectId, commentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project", projectId, "comments"],
      });
    },
  });
};
