'use server'
import envConfig from "@/config/envConfig";
import { getCurrentUser } from "../AuthService";
import axiosInstance from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
// import { revalidateTag } from "next/cache";

export const getAllUser = async () => {
  const fetchOption = {
    next: {
      tags: ["users"],
    },
  };
  
  const res = await fetch(`${envConfig.baseApi}/users`,fetchOption);
  
  return res.json();
}

export const getSingleUser = async (params: string) => {
  
  const fetchOption = {
    next: {
      tags: ["users"],
    },
  };

  const res = await fetch(
    `${envConfig.baseApi}/users/${params}`,
    fetchOption,
  );

  return res.json();
}

export const updateUserFollowing = async (connectUser: string): Promise<any> => {
  try {
    const user = await getCurrentUser();
    const { data } = await axiosInstance.put(`/users/${user?._id}`, {connectUser:connectUser}, {
      headers: {
        "Content-Type": "application/json",  
      },
    });
    revalidateTag('users');
    return data;
  } catch (error) {
    throw new Error("Failed to Update Likes");
  }
};
