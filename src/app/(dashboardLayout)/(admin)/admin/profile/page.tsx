'use client'
import Profile from "@/components/profile/Profile";
import { useGetProfile } from "@/hooks/profile.hook";
import { getProfile } from "@/services/profile";
import { IUser } from "@/types";
import React, { useEffect, useState } from "react";

export default function AdminProfile() {
  const [user, setUser] = useState<IUser>({} as IUser)

  const {
    data: userData,
    isLoading: postsLoading,
    isSuccess: postsSuccess,
  } = useGetProfile(); 

  // useEffect(() => {
  //   async function fetchPosts() {
  //     const { data } = await getProfile();
  //     console.log("data", data);

  //     setUser(data);
  //   }
  //   fetchPosts();
  // }, []);

  return (
    <div className=" w-full p-5 rounded-md bg-default-100">
      <Profile user={userData}></Profile>
    </div>
  );
}
