

import { addPayment } from "@/services/Payment";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

// export const useAddPayment = () => {
//   return useQuery({
//     queryKey: ["GET_PAYMENT"],
//     queryFn: async () => await addPayment(),
//   });
// };


export const useAddPayment = () => {
  return useMutation<any, Error, number>({
    mutationKey: ["CREATE_PAYMENT"],
    mutationFn: async (amount) => await addPayment(amount),
    onSuccess: () => {
      toast.success("Payment created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};