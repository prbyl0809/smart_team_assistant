import api from "../../../shared/api/axios";
import { ProjectComment } from "../../../types/comment";

export type CommentCreatePayload = {
  body: string;
};

export type CommentUpdatePayload = {
  body: string;
};

export const fetchProjectComments = async (
  projectId: number
): Promise<ProjectComment[]> => {
  const response = await api.get(`projects/${projectId}/comments/`);
  return response.data;
};

export const createProjectComment = async (
  projectId: number,
  payload: CommentCreatePayload
): Promise<ProjectComment> => {
  const response = await api.post(`projects/${projectId}/comments/`, payload);
  return response.data;
};

export const updateProjectComment = async (
  projectId: number,
  commentId: number,
  payload: CommentUpdatePayload
): Promise<ProjectComment> => {
  const response = await api.patch(
    `projects/${projectId}/comments/${commentId}`,
    payload
  );
  return response.data;
};

export const deleteProjectComment = async (
  projectId: number,
  commentId: number
): Promise<void> => {
  await api.delete(`projects/${projectId}/comments/${commentId}`);
};
