"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { TPayment } from "@/types";

// export const addPayment = async (postData: {}) => {
//   try {
//     const { data } = await axiosInstance.get("/create-payment-intent");
//     console.log("payment", data);
    
//     return data;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

export const createPayment = async (payload: TPayment): Promise<any> => {
  try {
    const res = await axiosInstance.post("/payment", payload, {
      headers: {
        "Content-Type": "application/json",  
      },
    });
        return res?.data;
  } catch (error) {
    throw new Error("Failed to create payment");
  }
};

export const createClientSecret = async (amount: number): Promise<any> => {
  try {
    const res = await axiosInstance.post("/payment/create-payment-intent", {price: amount}, {
      headers: {
        "Content-Type": "application/json",  
      },
    });
    console.log("res", res.data.clientSecret);
    
    return res?.data;
  } catch (error) {
    throw new Error("Failed to create payment intent");
  }
};

export const getAllPayment = async () => {
  const {data} = await axiosInstance.get(`/payment`);
  return data?.data;
};
