
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { forgetPasswordUser, loginUser, registerUser, resetPasswordUser } from "../services/AuthService";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User registration successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success("User login successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserForgetPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_FORGET"],
    mutationFn: async (email) => await forgetPasswordUser(email),
    onSuccess: () => {
      toast.success("Check Your Email.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserResetPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_RESET"],
    mutationFn: async (payload) => await resetPasswordUser(payload),
    onSuccess: () => {
      toast.success("Password Change Successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

