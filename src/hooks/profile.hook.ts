
import { queryClient } from "@/lib/Providers";
import { getProfile, updateProfile } from "@/services/profile";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";


export const useGetProfile = () => {
  return useQuery({
    queryKey: ["GET_PROFILE"],
    queryFn: async () => {
      const data = await getProfile();
      if (!data) throw new Error("Profile data is undefined");
      return data?.data;
    },
  });
};

export const useUpdateProfile = () => {
  return useMutation<any, Error,  FormData>({
    mutationKey: ["UPDATE_PROFILE"],
    mutationFn: async (payload) => await updateProfile(payload),
    
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({queryKey:["GET_PROFILE"]})
      queryClient.invalidateQueries({queryKey:["GET_ALL_USER"]})
      queryClient.invalidateQueries({queryKey:["GET_SINGLE_USER"]})
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};