'use server'
import { getProfile } from "@/services/profile";
import { useQuery } from "@tanstack/react-query";


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
