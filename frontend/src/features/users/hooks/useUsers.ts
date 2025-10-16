import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchUsers } from "../api/users";
import { User } from "../../../types/user";

export const useUsers = (options?: UseQueryOptions<User[], Error>) => {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    ...options,
  });
};
