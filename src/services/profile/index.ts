"use server";
import envConfig from "@/config/envConfig";
import axiosInstance from "@/lib/AxiosInstance";
import { IUser, IUserUpdate } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { getCurrentUser } from "../AuthService";

// export const getProfile = async () => {
//   const fetchOption = {
//     next: {
//       tags: ["profile"],
//     },
//   };
//   const res = await axiosInstance.get(`/profile`);
//   // console.log("profile", res);
//   return res.data;
// };

export const getProfile = async () => {
  const fetchOption = {
    next: {
      tags: ["profile"],
    },
  };
  const user = await getCurrentUser();

  const res = await fetch(
    `${envConfig.baseApi}/profile/${user?._id}`,
    // fetchOption,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch profile');
  }
  const data = res.json();  
  return data; 
};

// export const getProfile = async () => {

//   const accessToken = cookies().get("accessToken")?.value;
//   if (!accessToken) {
//     throw new Error('No access token found');
//   }
//   const fetchOption = {

//     headers: {
//       Authorization: accessToken, 
//       'Content-Type': 'application/json',
//     },
//     next: {
//       tags: ['profile'], 
//     },
//   };

//   const res = await fetch(`/profile`, fetchOption);
//   const data = await res.json();

//   console.log("res Profile", data, accessToken);
  
//   if (!res.ok) {
//     throw new Error('Failed to fetch profile');
//   }

//   return data;
// };


export const updateProfile = async (payload: FormData): Promise<any> => {
  try {
    const res = await axiosInstance.put(`/profile`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // revalidateTag("posts");

    return res.data;
  } catch (error) {
    throw new Error("Failed to create post");
  }
};
