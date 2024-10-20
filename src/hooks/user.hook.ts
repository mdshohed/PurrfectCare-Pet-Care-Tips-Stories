import { queryClient } from "@/lib/Providers";
import { getAllUser, getSingleUser, updateUserFollowing } from "@/services/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateUserFollowing = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async (connectUser) => await updateUserFollowing(connectUser),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:[ "GET_ALL_USER"]})
      queryClient.invalidateQueries({queryKey:[ "GET_SINGLE_USER"]})
      queryClient.invalidateQueries({queryKey:[ "GET_PROFILE"]})
      // toast.success("Success");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["GET_ALL_USER"],
    queryFn: async () => await getAllUser(),
  });
};

export const useGetSingleUser = (param: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_USER"],
    queryFn: async () =>{ 
      const res = await getSingleUser(param)
      return res?.data
    },
  });
};

// export const useGetProfile = () => {
//   return useQuery({
//     queryKey: ["GET_ALL_USER"],
//     queryFn: async (userId) => await getSingleUser(userId),
//   });
// };


