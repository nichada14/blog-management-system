import axiosInstance from "./axiosInstance";
import type { RegisterPayload, LoginPayload, AuthResponse } from "../types/auth";

//Register a new user
export const register = async (data: RegisterPayload): Promise<AuthResponse> => {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data;
};

//Login user
export const login = async (data: LoginPayload): Promise<AuthResponse> => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};
