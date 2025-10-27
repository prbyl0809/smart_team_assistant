import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchCurrentUser } from "../api/users";
import { User } from "../../../types/user";

export const useCurrentUser = (
  options?: UseQueryOptions<User, Error>
) => {
  return useQuery<User, Error>({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    staleTime: 60_000,
    ...options,
  });
};
