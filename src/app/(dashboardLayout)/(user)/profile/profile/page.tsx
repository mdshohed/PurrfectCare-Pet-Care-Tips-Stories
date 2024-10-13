'use client'
import Profile from "@/components/profile/Profile";
import { getProfile } from "@/services/profile";
import { IUser } from "@/types";
import React, { useEffect, useState } from "react";

export default function UserProfile() {
  const [user, setUser] = useState<IUser>({} as IUser)


  useEffect(() => {
    async function fetchPosts() {
      const { data } = await getProfile();
      console.log("data", data);

      setUser(data);
    }
    fetchPosts();
  }, []);
  return (
    <div className=" w-full p-5 min-h-screen rounded-md bg-default-100">
      <Profile user={user}></Profile>
    </div>
  );
}
