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


export const getPost = async (params: string) => {
  let fetchOptions = {};

  fetchOptions = {
    cache: "no-store",
  };

  const res = await fetch(`${envConfig.baseApi}/posts/${params}`, fetchOptions);  
  return res.json();
};

export const getMyPosts = async () => {
  const user = await getCurrentUser();
  const res = await axiosInstance.get(`/posts/me/${user?._id}`);
  return res.data;
};

export const getSomeOnePosts = async ( param:string) => {
  const {data} = await axiosInstance.get(`/posts/me/${param}`);
  return data;
};

export const getAllPostsWithScroll = async (page: number,limit: number) => {
  const res = await axiosInstance.get(`/posts?page=${page}&limit=${limit}`);
  return res.data;
};

export const getAllPosts = async () => {
  const res = await axiosInstance.get(`/posts`);
  return res.data;
};
export const getAllPostsForAdmin = async () => {
  const res = await axiosInstance.get(`/posts/admin`);
  return res.data;
};

export const getAllPostsWithSearchParams = async (searchParams: {searchTerm: string, category: string}) => {
  const res = await axiosInstance.post(`/posts/search`, searchParams);
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

export const updateLikes = async (formData: { postId: string, type: string}): Promise<any> => {
  try {
    const user = await getCurrentUser();
    const { data } = await axiosInstance.put(`/posts/likes/${formData.postId}`, {userId:user?._id, type: formData.type}, {
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
