"use server";

import axiosInstance from "@/lib/AxiosInstance";


export const getCategories = async () => {
  try {
    const { data } = await axiosInstance.get("/post-categories");

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
