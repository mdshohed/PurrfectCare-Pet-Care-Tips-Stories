"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import { useUser } from "@/context/user.provider";
import FXForm from "../../../components/form/FXForm";
import FXInput from "../../../components/form/FXInput";
// import Loading from "@/components/page/shared/Loading";
import { useEffect } from "react";
import { useUserForgetPassword, useUserLogin } from "@/hooks/auth.hook";
import Loading from "@/app/loading";
import { Checkbox } from "@nextui-org/react";

const ResetPasswordPage = () => {
  // const searchParams = useSearchParams();
  // const router = useRouter();
  // const { setIsLoading: userLoading, isLoading } = useUser();

  // const redirect = searchParams.get("redirect");
  const { mutate: handleUserForget, isPending, isSuccess } = useUserForgetPassword();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {    
    handleUserForget(data);
    // userLoading(true);
  };

  // useEffect(() => {
  //   if (!isPending && isSuccess) {
  //     if (redirect) {
  //       router.push(redirect);
  //     } else {
  //       router.push("/");
  //     }
  //   }
  // }, [isPending, isSuccess]);

  return (
    <>
          {isPending && <Loading />}

      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Reset Password with PurrfectCare</h3>
        <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
        <div className="w-[35%]">
          <FXForm onSubmit={onSubmit}>
            <div className="py-3">
              <FXInput label="Email" name="email" type="email" />
            </div>
            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Send Code
            </Button>
          </FXForm>
          <div className="text-center">
            Don&lsquo;t have an account? <Link href={"/register"} className="text-blue-400 hover:underline">Register</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
