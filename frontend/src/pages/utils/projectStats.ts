import { Project } from "../../types/project";
import { DAY_IN_MS } from "../../shared/constants/dashboard";

export type ProjectStats = {
  total: number;
  active: number;
  blocked: number;
  dueSoon: number;
  overdue: number;
};

export const computeProjectStats = (projects: Project[]): ProjectStats => {
  const now = new Date();
  return projects.reduce(
    (acc, project) => {
      acc.total += 1;
      if (project.status === "active") acc.active += 1;
      if (project.status === "blocked") acc.blocked += 1;
      if (project.due_date) {
        const due = new Date(project.due_date);
        const diffDays = Math.ceil((due.getTime() - now.getTime()) / DAY_IN_MS);
        if (!Number.isNaN(diffDays)) {
          if (diffDays >= 0 && diffDays <= 7) acc.dueSoon += 1;
          if (diffDays < 0) acc.overdue += 1;
        }
      }
      return acc;
    },
    { total: 0, active: 0, blocked: 0, dueSoon: 0, overdue: 0 }
  );
};
