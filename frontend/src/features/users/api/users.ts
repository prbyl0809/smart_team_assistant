import api from "../../../shared/api/axios";
import { User } from "../../../types/user";

export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get("users/");
  return response.data;
};

export const fetchCurrentUser = async (): Promise<User> => {
  const response = await api.get("users/me");
  return response.data;
};
