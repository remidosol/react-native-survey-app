import { LoginRequest, LoginResponse, User } from "../types/auth";
import apiClient from "./apiClient";

export const addUserApi = async (user: User): Promise<{ id: number }> => {
  const response = await apiClient.post<{ id: number }>(`/users/`);

  return response.data;
};

export const getUserApi = async (id: number): Promise<User> => {
  const response = await apiClient.get<User>(`/users/${id}`);

  return response.data;
};

export const loginApi = async (loginPayload: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(`/auth/login`, loginPayload);
  return response.data;
};
