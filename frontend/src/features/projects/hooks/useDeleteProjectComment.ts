import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProjectComment } from "../api/comments";

type Variables = {
  commentId: number;
};

export const useDeleteProjectComment = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, Variables>({
    mutationFn: ({ commentId }) => deleteProjectComment(projectId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project", projectId, "comments"],
      });
    },
  });
};
