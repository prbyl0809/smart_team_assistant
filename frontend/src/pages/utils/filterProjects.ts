import { Project, ProjectStatus } from "../../types/project";
import { ProjectSortOption } from "../../shared/constants/dashboard";

type FilterOptions = {
  search: string;
  status: "all" | ProjectStatus;
  sort: ProjectSortOption;
};

export const filterProjects = (
  projects: Project[],
  { search, status, sort }: FilterOptions
) => {
  const query = search.trim().toLowerCase();

  const sorted = [...projects].sort((a, b) => {
    if (sort === "name") {
      return a.name.localeCompare(b.name);
    }
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

  return sorted.filter((project) => {
    const matchesStatus = status === "all" ? true : project.status === status;
    const matchesQuery =
      !query ||
      project.name.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query);
    return matchesStatus && matchesQuery;
  });
};
