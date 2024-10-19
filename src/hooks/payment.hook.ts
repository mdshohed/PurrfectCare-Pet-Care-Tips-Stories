

import { queryClient } from "@/lib/Providers";
import { createClientSecret, createPayment, getAllPayment } from "@/services/Payment";
import { TPayment } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetAllPayments = () => {
  return useQuery({
    queryKey: ["GET_ALL_PAYMENTS"],
    queryFn: async () => await getAllPayment(),
  });
};

export const useCreatePayment = () => {
  return useMutation<any, Error, TPayment>({
    mutationKey: ["CREATE_PAYMENT"],
    mutationFn: async (payload) => await createPayment(payload),
    onSuccess: () => {
      toast.success("Payment created successfully");
      queryClient.invalidateQueries({queryKey:["GET_ALL_PAYMENTS"]})
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};


export const useCreateClientSecret = () => {
  return useMutation<any, Error, number>({
    mutationKey: ["CREATE_PAYMENT"],
    mutationFn: async (amount) => {
      const data = await createClientSecret(amount);
      return data.clientSecret;
    },
    onError: (error) => {
      toast.error('clientSecret creation error');
    },
  });
};
