"use server";
import axiosInstance from "@/lib/AxiosInstance";
import { IUser, IUserUpdate } from "@/types";
import { revalidateTag } from "next/cache";

export const getProfile = async () => {
  const fetchOption = {
    next: {
      tags: ["profile"],
    },
  };
  const res = await axiosInstance.get(`/profile`);
  // console.log("profile", res);
  return res.data;
};

export const updateProfile = async (payload: FormData): Promise<any> => {
  try {
    const res = await axiosInstance.put(`/profile`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    revalidateTag("posts");

    return res.data;
  } catch (error) {
    throw new Error("Failed to create post");
  }
};
