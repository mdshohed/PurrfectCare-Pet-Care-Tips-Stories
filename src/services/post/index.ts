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

    // revalidateTag("posts");

    return data;
  } catch (error) {
    throw new Error("Failed to create post");
  }
};


export const getPost = async (params: string) => {
  let fetchOptions = {};

  fetchOptions = {
    cache: "no-store",
  };

  const res = await fetch(`${envConfig.baseApi}/posts/${params}`,
    fetchOptions
  );  
  return res.json();
};



export const updatePost = async ( body: {params: string, payload: any}): Promise<any> => {
  try {
    const { data } = await axiosInstance.put(`/posts/${body.params}`, body.payload, {
      headers: {
        "Content-Type": "application/json",  
      },
      
    });
    return data;
  } catch (error) {
    throw new Error("Failed to Update Post");
  }
};

export const deletePost = async ( param: string ): Promise<any> => {
  try {
    const { data } = await axiosInstance.put(`/posts/delete/${param}`, {
      headers: {
        "Content-Type": "application/json",  
      },
    });
    // revalidateTag("comments");
    return data;
  } catch (error) {
    throw new Error("Failed to Delete Post");
  }
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


// export const getAllPostsWithScroll = async (payload: {page: number,limit: number}) => {
 
//   const fetchOptions = {
//     // cache: "no-store",
//     next: {
//       tags: ["posts"],
//     },
//   };
//   const res = fetch(`/posts/scroll?page=${payload.page}&limit=${payload.limit}`, fetchOptions);
//   console.log("data", res);

//   return (await res).json();
// };

export const getAllPosts = async () => {
  const fetchOptions = {
    next: {
      tags: ["posts"],
    },
  };

  const res = await fetch(`${envConfig.baseApi}/posts`
    // fetchOptions
  );  
  return res.json();
};

export const getAllPostsWithScroll = async (payload: {page: number,limit: number}) => {  
  const res = await fetch(`${envConfig.baseApi}/posts/scroll?page=${payload.page}&limit=${payload.limit}`);
  return res.json();
};

export const getAllPostsWithParams = async (params: {searchTerm: string, category: string}) => {
  let fetchOptions = {};

  fetchOptions = {
    // cache: "no-store",
    next: {
      tags: ["posts"],
    },
  };
  const { data } = await axiosInstance.get(`/posts`, {params });
  return data;
  // const res = await fetch(`${envConfig.baseApi}/posts`, params  );  
  // return res.json();
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
      tags: ["posts"],
    },
  };

  const res = await fetch(
    `${envConfig.baseApi}/posts/premium`,
    // fetchOption,
  );

  return res.json();
}



export const updatePremiumContent = async ( params: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.put(`/posts/premium/${params}`, {
      headers: {
        "Content-Type": "application/json",  
      },
    });
    // revalidateTag("posts");
    return data;
  } catch (error) {
    throw new Error("Failed to Update Likes");
  }
};

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


// Comments Service 

export const addComments = async (payload: {postId: string, userId: string, text:string}): Promise<any> => {
  try {
    console.log("payload", payload);
    const { data } = await axiosInstance.post(`/posts/comments/${payload.postId}`, payload, {
      headers: {
        "Content-Type": "application/json",  
      },
    });
    // revalidateTag("posts");
    return data;
  } catch (error) {
    throw new Error("Failed to add comment");
  }
};

export const getComments = async (param:string) => {
  const fetchOption = {
    next: {
      tags: ["comments"],
    },
  };
  const res = await fetch(`/posts/comments/${param}`, fetchOption);
  return res.json();
};

export const updateComments = async ( payload: { postId:string, index: number, text: string}): Promise<any> => {
  try {
    const { data } = await axiosInstance.put(`/posts/comments/${payload.postId}`, { index: payload.index, text: payload.text}, {
      headers: {
        "Content-Type": "application/json",  
      },
    });
    // revalidateTag("comments");
    return data;
  } catch (error) {
    throw new Error("Failed to Update comments");
  }
};

// export const deleteComments = async (payload: { postId: string; index: number }) => {
//   // try {
//     const { data } = await fetch(`/posts/comments/delete/:${payload.postId}`, payload);
    
//     console.log("delete", data);
//   //   return data;
//   // } catch (error) {
//   //   console.error("Failed to delete comments:", error);
//   //   throw new Error("Failed to delete comments");
//   // }
// };

export const deleteComments = async ( payload: { postId: string; index: number }): Promise<any> => {
  try {
    const { data } = await axiosInstance.put(`/posts/comments/delete/${payload.postId}`, { index: payload.index}, {
      headers: {
        "Content-Type": "application/json",  
      },
    });
    // revalidateTag("comments");
    return data;
  } catch (error) {
    throw new Error("Failed to Update comments");
  }
};

// export const deleteComments = async (payload: { postId: string; index: number }) => {
//   try {
//     const response = await fetch(`/posts/comments/${payload.postId}`, {
//       method: 'DELETE', 
//       headers: {
//         'Content-Type': 'application/json', 
//       },
//       body: JSON.stringify({ index: payload.index }), 
//     });
    
//     const data = await response.json();  
//     console.log("delete", data);
//     return data;
//   } catch (error) {
//     console.error("Failed to delete comments:", error);  
//   }
// };

