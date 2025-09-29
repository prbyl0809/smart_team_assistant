import api from "./axios";
import { Task, TaskStatus } from "../types/task";

export const createTask = async (projectId: number, task: Task) => {
  const response = await api.post(`project/${projectId}/tasks`, task);
  return response.data;
};

export const fetchTasks = async (projectId: number): Promise<Task[]> => {
  const response = await api.get(`project/${projectId}/tasks`);
  return response.data;
};

export const updateTaskStatus = async (
  projectId: number,
  taskId: number,
  newStatus: TaskStatus
) => {
  const response = await api.patch(`project/${projectId}/tasks/${taskId}`, {
    status: newStatus,
  });
  return response.data;
};
