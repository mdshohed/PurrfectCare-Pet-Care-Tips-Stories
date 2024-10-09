import { updateUserFollowing } from "@/services/user";
import { useMutation } from "@tanstack/react-query";
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



