"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/lib/AxiosInstance";

export const registerUser = async (userData: FieldValues) => {
  try {

    const { data } = await axiosInstance.post("/auth/register", userData);
    
    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const forgetPasswordUser = async (email: FieldValues) => {
  
  try {
    const { data } = await axiosInstance.post("/auth/forget-password", email);
    console.log("returnData", data);
    return data
  } catch (error: any) {
    throw new Error(error);
  }
};

export const resetPasswordUser = async (payload: FieldValues) => {
  
  try {
    cookies().set("accessToken", payload?.accessToken);
    const { data } = await axiosInstance.post("/auth/reset-password", {email:payload.email, newPassword: payload.newPassword}); 
    // if(data.success&&data.statusCode){
    //   console.log("data", data);
    //   cookies().delete("accessToken");
    // }
    console.log("data", data);
    return data
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logout = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getCurrentUser = async () => {
  // const newData = await getNewAccessToken(); 
  // if(newData){
    
  // }
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    

    return {
      _id: decodedToken._id,
      name: decodedToken.name,
      email: decodedToken.email,
      mobileNumber: decodedToken.mobileNumber,
      role: decodedToken.role,
      status: decodedToken.status,
      follower: decodedToken.follower, 
      following: decodedToken.following,
      profilePhoto: decodedToken.profilePhoto,
    };
  }

  return decodedToken;
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;

    const res = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error("Failed to get new access token");
  }
};
