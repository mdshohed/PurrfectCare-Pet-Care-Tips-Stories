"use server";

import axiosInstance from "@/lib/AxiosInstance";

// export const addPayment = async (postData: {}) => {
//   try {
//     const { data } = await axiosInstance.get("/create-payment-intent");
//     console.log("payment", data);
    
//     return data;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

export const addPayment = async (amount: number): Promise<any> => {
  try {
    console.log("payment", amount);
    
    const { data } = await axiosInstance.post("/create-payment-intent", {amount: amount}, {
      headers: {
        "Content-Type": "application/json",  
      },
    });
    console.log('payment', data);
    

    return data;
  } catch (error) {
    throw new Error("Failed to create post");
  }
};
