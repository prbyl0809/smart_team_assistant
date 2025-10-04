import api from "../../../shared/api/axios";
import {
  Project,
  ProjectPriority,
  ProjectStatus,
} from "../../../types/project";
import { Task } from "../../../types/task";

export type ProjectUpdatePayload = Partial<{
  name: string;
  description: string;
  due_date: string | null;
  status: ProjectStatus;
  priority: ProjectPriority;
  is_archived: boolean;
}>;

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await api.get("projects/");
  return response.data;
};

export const createProject = async (project: {
  name: string;
  description: string;
  due_date?: string | null;
  status?: ProjectStatus;
  priority?: ProjectPriority;
}) => {
  const response = await api.post("projects/", project);
  return response.data;
};

export const getProjectById = async (projectId: number): Promise<Project> => {
  const response = await api.get(`projects/${projectId}`);
  return response.data;
};

export const getProjectWithTasks = async (
  projectId: number
): Promise<{ project: Project; tasks: Task[] }> => {
  const projectRes = await api.get(`projects/${projectId}`);

  let tasks: Task[] = [];
  try {
    const tasksRes = await api.get(`project/${projectId}/tasks/`);
    tasks = tasksRes.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      tasks = [];
    } else {
      throw error;
    }
  }

  return { project: projectRes.data, tasks };
};

export const updateProject = async (
  projectId: number,
  updates: ProjectUpdatePayload
): Promise<Project> => {
  const response = await api.put(`projects/${projectId}`, updates);
  return response.data;
};
