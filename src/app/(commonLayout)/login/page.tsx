"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import { useUser } from "@/context/user.provider";
import FXForm from "../../../components/form/FXForm";
import FXInput from "../../../components/form/FXInput";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";
import { delay } from "@/utils/delay";
import { verifyToken } from "@/utils/verifyToken";
import { IUser } from "@/types";
// import Loading from "@/components/page/shared/Loading";
import { useEffect } from "react";
import { cookies } from "next/headers";
import { useUserLogin } from "@/hooks/auth.hook";
import Loading from "@/app/loading";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();

  const redirect = searchParams.get("redirect");
  const [login, {isLoading}] = useLoginMutation();
  const dispatch = useDispatch(); 
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data);
    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess]);

  // const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  //   const toastId = toast.loading("Loading...")
  //   try {
  //     userLoading(true);
  //     const res = await login(data).unwrap()
  //     console.log("user", res);

  //     if(res.success){
  //       const user = verifyToken(res?.data?.accessToken) as IUser;
  //       await delay(); 
  //       dispatch(setUser({ user: user, token: res.data.accessToken }));

  //       cookies().set("accessToken", data?.data?.accessToken);
  //       cookies().set("refreshToken", data?.data?.refreshToken);

  //       toast.success("Login Success...", {id: toastId, duration: 1000})
  //       if (redirect) {
  //         router.push(redirect);
  //       } else {
  //         router.push("/");
  //       }
  //     }
  //   } catch (error) {
  //     toast.error((error as { message: string })?.message ?? 'Login Error', {id:toastId, duration: 1000});
  //   } finally {
  //     userLoading(false);
  //   }
  // };
  

  return (
    <>
          {isLoading && <Loading />}

      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Login with PurrfectCare</h3>
        <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
        <div className="w-[35%]">
          <FXForm onSubmit={onSubmit}>
            <div className="py-3">
              <FXInput label="Email" name="email" type="email" />
            </div>
            <div className="py-3">
              <FXInput label="Password" name="password" type="password" />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Login
            </Button>
          </FXForm>
          <div className="text-center">
            Don&lsquo;t have an account? <Link href={"/register"}>Register</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
