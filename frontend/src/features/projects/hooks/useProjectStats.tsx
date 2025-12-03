import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useMemo } from "react";
import { StatCardData } from "../components/ProjectsStatsGrid";
import { Project } from "../../../types/project";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const statsIcons: Record<StatCardData["palette"], React.ReactElement> = {
  primary: <FolderOpenIcon fontSize="small" />,
  success: <TrendingUpIcon fontSize="small" />,
  warning: <EventBusyIcon fontSize="small" />,
  info: <CheckCircleOutlineIcon fontSize="small" />,
};

const computeStats = (projects: Project[]) => {
  const now = new Date();
  const total = projects.length;
  let active = 0;
  let completed = 0;
  let dueSoon = 0;

  projects.forEach((project) => {
    if (project.status === "active") active += 1;
    if (project.status === "completed") completed += 1;
    if (project.due_date) {
      const dueDate = new Date(project.due_date);
      if (!Number.isNaN(dueDate.getTime())) {
        const diffDays = Math.ceil(
          (dueDate.getTime() - now.getTime()) / DAY_IN_MS
        );
        if (diffDays >= 0 && diffDays <= 7) dueSoon += 1;
      }
    }
  });

  return { total, active, completed, dueSoon };
};

export function useProjectStats(projects: Project[] | undefined) {
  return useMemo<StatCardData[]>(() => {
    const stats = computeStats(projects ?? []);
    return [
      {
        label: "Total projects",
        value: stats.total,
        caption: "Across every stage",
        icon: statsIcons.primary,
        palette: "primary",
      },
      {
        label: "Active now",
        value: stats.active,
        caption: "Moving work forward",
        icon: statsIcons.success,
        palette: "success",
      },
      {
        label: "Due within 7 days",
        value: stats.dueSoon,
        caption: "Deadlines approaching",
        icon: statsIcons.warning,
        palette: "warning",
      },
      {
        label: "Completed",
        value: stats.completed,
        caption: "Wrapped and delivered",
        icon: statsIcons.info,
        palette: "info",
      },
    ];
  }, [projects]);
}

export default useProjectStats;
