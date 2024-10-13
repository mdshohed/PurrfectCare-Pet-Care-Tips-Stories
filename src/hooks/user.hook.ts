import { getAllUser, getSingleUser, updateUserFollowing } from "@/services/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateUserFollowing = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async (connectUser) => await updateUserFollowing(connectUser),
    onSuccess: () => {
      toast.success("Success");
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

// export const useGetProfile = () => {
//   return useQuery({
//     queryKey: ["GET_ALL_USER"],
//     queryFn: async (userId) => await getSingleUser(userId),
//   });
// };


