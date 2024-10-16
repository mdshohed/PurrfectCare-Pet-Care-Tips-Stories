"use server";

import { revalidateTag } from "next/cache";

import { getCurrentUser } from "../AuthService";

import envConfig from "@/config/envConfig";
import axiosInstance from "@/lib/AxiosInstance";

export const createPost = async (formData: FormData): Promise<any> => {
  try {
    
    const { data } = await axiosInstance.post("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    

    revalidateTag("posts");

    return data;
  } catch (error) {
    throw new Error("Failed to create post");
  }
};

export const updateLikes = async (formData: { postId: string}): Promise<any> => {
  try {
    const user = await getCurrentUser();
    const { data } = await axiosInstance.put(`/posts/likes/${formData.postId}`, {userId:user?._id}, {
      headers: {
        "Content-Type": "application/json",  
      },
    });
    revalidateTag("posts");
    return data;
  } catch (error) {
    throw new Error("Failed to Update Likes");
  }
};

export const addComments = async (payload: {postId: string, userId: string, text:string}): Promise<any> => {
  try {
    console.log("payload", payload);
    const { data } = await axiosInstance.put(`/posts/comments/${payload.postId}`, payload, {
      headers: {
        "Content-Type": "application/json",  
      },
    });
    revalidateTag("posts");
    return data;
  } catch (error) {
    throw new Error("Failed to add comment");
  }
};

export const updatePremiumContent = async ( params: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.put(`/posts/premium/${params}`, {
      headers: {
        "Content-Type": "application/json",  
      },
    });
    revalidateTag("posts");
    return data;
  } catch (error) {
    throw new Error("Failed to Update Likes");
  }
};

export const getPost = async (postId: string) => {
  let fetchOptions = {};

  fetchOptions = {
    cache: "no-store",
  };

  const res = await fetch(`${envConfig.baseApi}/posts/${postId}`, fetchOptions);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getMyPosts = async () => {
  const user = await getCurrentUser();
  const res = await axiosInstance.get(`/posts/${user?._id}`);
  return res.data;
};

export const getAllPosts = async () => {
  const res = await axiosInstance.get(`/posts`);
  return res.data;
};


export const getPremiumPosts = async (): Promise<any> => {
  const fetchOption = {
    next: {
      tags: ["items"],
    },
  };

  const res = await fetch(
    `${envConfig.baseApi}/posts/premium`,
    fetchOption,
  );

  return res.json();
}
