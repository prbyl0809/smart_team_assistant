import { useMemo, useState } from "react";
import { Task } from "../../../types/task";

export type TaskFilterValue = "all" | "todo" | "in_progress" | "done";
export type TaskSortOption = "created_desc" | "created_asc" | "title_asc";

export const useTaskFilters = (tasks: Task[]) => {
  const [filter, setFilter] = useState<TaskFilterValue>("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<TaskSortOption>("created_desc");

  const filteredTasks = useMemo(() => {
    let result = tasks;

    if (filter !== "all") {
      result = result.filter((task) => task.status === filter);
    }

    if (search) {
      const query = search.toLowerCase().trim();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query)
      );
    }

    switch (sort) {
      case "created_asc":
        result = [...result].sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        break;
      case "title_asc":
        result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        result = [...result].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }

    return result;
  }, [tasks, filter, search, sort]);

  return {
    filteredTasks,
    filter,
    setFilter,
    search,
    setSearch,
    sort,
    setSort,
  };
};
