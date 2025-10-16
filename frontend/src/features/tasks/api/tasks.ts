import api from "../../../shared/api/axios";
import { Task, TaskPriority, TaskStatus } from "../../../types/task";

export type TaskCreate = {
  title: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  due_date?: string | null;
  order?: number | null;
  assignee_id?: number | null;
};

export type TaskUpdatePayload = Partial<{
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string | null;
  order: number | null;
  assignee_id: number | null;
}>;

export const createTask = async (projectId: number, task: TaskCreate) => {
  const response = await api.post(`project/${projectId}/tasks/`, task);
  return response.data;
};

export const fetchTasks = async (projectId: number): Promise<Task[]> => {
  const response = await api.get(`project/${projectId}/tasks/`);
  return response.data;
};

export const updateTaskStatus = async (
  projectId: number,
  taskId: number,
  newStatus: TaskStatus
): Promise<Task> => {
  const response = await api.patch(`project/${projectId}/tasks/${taskId}`, {
    status: newStatus,
  });
  return response.data;
};

export const updateTask = async (
  projectId: number,
  taskId: number,
  updates: TaskUpdatePayload
): Promise<Task> => {
  const response = await api.patch(
    `project/${projectId}/tasks/${taskId}`,
    updates
  );
  return response.data;
};
