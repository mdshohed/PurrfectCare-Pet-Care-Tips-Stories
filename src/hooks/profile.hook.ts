'use server'
import { getProfile, updateProfile } from "@/services/profile";
import { IUser, IUserUpdate } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";


export const useGetProfile = () => {
  return useQuery({
    queryKey: ["GET_Profile"],
    queryFn: async () => {
      const data = await getProfile();
      if (!data) throw new Error("Profile data is undefined");
      return data;
    },
  });
};

export const useUpdateProfile = () => {
  return useMutation<any, Error,  IUserUpdate>({
    mutationKey: ["UPDATE_PROFILE"],
    mutationFn: async (payload) => await updateProfile(payload),
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};