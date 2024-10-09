'use server'
import axiosInstance from "@/lib/AxiosInstance";
import { IUser } from "@/types";

export const getProfile = async () => {
  const res = await axiosInstance.get(`/profile`);
  // console.log("profile", res);
  
  return res.data;
};

export const updateProfile = async (payload: IUser) => {
  const res = await axiosInstance.get(`/profile/${payload}`);
  return res.data;
};