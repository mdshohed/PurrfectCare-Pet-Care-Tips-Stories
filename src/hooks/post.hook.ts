import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  addComments,
  createPost,
  deleteComments,
  getAllPosts,
  getAllPostsForAdmin,
  getAllPostsWithParams,
  getAllPostsWithScroll,
  getComments,
  getMyPosts,
  getPost,
  getPremiumPosts,
  getSomeOnePosts,
  updateComments,
  updateLikes,
  updatePost,
  updatePremiumContent,
} from "../services/post";
import { queryClient } from "@/lib/Providers";

export const useCreatePost = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success("Post created successfully");
      queryClient.invalidateQueries({queryKey:[ "GET_MY_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_SINGLE_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_SOMEONE_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_PREMIUM_POST"]})
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllPostsForAdmin = () => {
  return useQuery({
    queryKey: ["GET_POST_ADMIN"],
    queryFn: async () => await getAllPostsForAdmin(),
  });
};

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ["GET_POST"],
    queryFn: async () => await getAllPosts(),
  });
};

export const useGetAllPostsWithParams = (params: {searchTerm: string, category: string}) => {
  return useQuery({
    queryKey: ["GET_POST"],
    queryFn: async () => await getAllPostsWithParams(params),
  });
};

export const useGetAllPostsWithScrolls = (page: number,limit: number) => {
  return useQuery({
    queryKey: ["GET_POST", page, limit],
    queryFn: async () => await getAllPostsWithScroll({page: page, limit: limit})
  });
};
// export const useGetAllPostsWithScrolls = () => {
//   return useMutation<any, Error, {page: number,limit: number}>({
//     mutationKey: ["GET_POST_WITH_SCROLL"],
//     mutationFn: async (postData) => await getAllPostsWithScroll(postData),
//     // onSuccess: () => {
//     //   toast.success("Post Retrieve successfully");
//     // },
//     // onError: (error) => {
//     //   toast.error(error.message);
//     // },
//   });
// };

export const useGetMyPosts = () => {
  return useQuery({
    queryKey: ["GET_POST"],
    queryFn: async () => await getMyPosts(),
  });
};

export const useGetSomeOnePosts = (param:string) => {
  return useQuery({
    queryKey: ["GET_POST"],
    queryFn: async () => {
      const res = await getSomeOnePosts(param)
      return res.data; 
    },
  });
};

export const useSinglePost = (id: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_POST"],
    queryFn: async () => await getPost(id),
  });
};

export const useGetPremiumPosts = () => {
  return useQuery({
    queryKey: ["GET_PREMIUM_POST"],
    queryFn: async () => {
      const data = await getPremiumPosts();
      return data;
    },
  });
};



export const useUpdatePost = () => {
  return useMutation<any, Error, {params: string, payload: any}>({
    mutationKey: ["UPDATE_POST"],
    mutationFn: async (payload) => await updatePost(payload),
    onSuccess: () => {
      toast.success("Post Updated successfully");
      
      queryClient.invalidateQueries({queryKey:[ "GET_MY_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_SINGLE_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_SOMEONE_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_PREMIUM_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_POST_WITH_SCROLL"]})
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdatePremiumContent = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["UPDATE_PremiumContent"],
    mutationFn: async (params) => await updatePremiumContent(params),
    onSuccess: () => {
      toast.success("Post Updated successfully");
      
      queryClient.invalidateQueries({queryKey:[ "GET_MY_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_SINGLE_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_SOMEONE_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_PREMIUM_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_POST_WITH_SCROLL"]})
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};


export const useUpdatePostLike = () => {
  return useMutation<any, Error, { postId: string, type: string }>({
    mutationKey: ["UPDATE_LIKE"],
    mutationFn: async (postData) => await updateLikes(postData),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:[ "GET_POST_WITH_SCROLL"]})
      
      queryClient.invalidateQueries({queryKey:[ "GET_MY_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_SINGLE_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_SOMEONE_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_PREMIUM_POST"]})
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};


// comment CRUD

export const useAddPostComment = () => {
  return useMutation<any, Error, { postId: string; userId: string; text: string }>({
    mutationKey: ["ADD_COMMENT"],
    mutationFn: async (payload) => await addComments(payload),
    onSuccess: () => {
      toast.success("Comment successfully");
      queryClient.invalidateQueries({queryKey:[ "GET_POST_WITH_SCROLL"]})

      
      queryClient.invalidateQueries({queryKey:[ "GET_MY_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_SINGLE_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_SOMEONE_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_PREMIUM_POST"]})
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetComment = (id:string) => {
  return useQuery({
    queryKey: ["GET_COMMENT"],
    queryFn: async () => await getComments(id),
  });
};

export const useUpdateComment = () => {
  return useMutation<any, Error, { postId: string; index: number; text: string }>({
    mutationKey: ["UPDATE_COMMENT"],
    mutationFn: async (payload) => await updateComments(payload),
    onSuccess: () => {
      toast.success("Comment updated successfully");

      
      queryClient.invalidateQueries({queryKey:[ "GET_MY_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_SINGLE_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_SOMEONE_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_PREMIUM_POST"]})
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteComment = () => {
  return useMutation<any, Error, { postId: string; index: number }>({
    mutationKey: ["DELETE_COMMENT"],
    mutationFn: async (payload) => await deleteComments(payload),
    onSuccess: () => {
      toast.success("Comment deleted successfully");
      
      queryClient.invalidateQueries({queryKey:[ "GET_MY_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_SINGLE_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_SOMEONE_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_POST"]})
      queryClient.invalidateQueries({queryKey:[ "GET_PREMIUM_POST"]})
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

