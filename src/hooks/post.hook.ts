import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  addComments,
  createPost,
  getAllPosts,
  getMyPosts,
  getPremiumPosts,
  updateLikes,
  updatePremiumContent,
} from "../services/post";

export const useCreatePost = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success("Post created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ["GET_POST"],
    queryFn: async () => await getAllPosts(),
  });
};

export const useGetMyPosts = () => {
  return useQuery({
    queryKey: ["GET_MY_POST"],
    queryFn: async () => await getMyPosts(),
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

export const useUpdatePostLike = () => {
  return useMutation<any, Error, { postId: string }>({
    mutationKey: ["UPDATE_LIKE"],
    mutationFn: async (postData) => await updateLikes(postData),
    // onSuccess: () => {
    //   toast.success(" successfully");
    // },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useAddPostComment = () => {
  return useMutation<any, Error, { postId: string; userId: string; text: string }>({
    mutationKey: ["ADD_COMMENT"],
    mutationFn: async (payload) => await addComments(payload),
    onSuccess: () => {
      toast.success("Comment successfully");
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
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
