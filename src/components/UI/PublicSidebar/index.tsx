"use client";

import { getAllUser } from "@/services/user";
import React from "react";
import { FollowLink } from "./FollowLink";
import PremiumPost from "./PremiumPost";
import { getPremiumPosts } from "@/services/post";
import { useGetAllUsers } from "@/hooks/user.hook";
import { useGetPremiumPosts } from "@/hooks/post.hook";

export default function PublicSidebar() {
  const {
    data: premiumData,
    isLoading: premiumLoading,
    isSuccess: premiumDataSuccess,
  } = useGetPremiumPosts();

  const {
    data: usersData,
    isLoading: usersLoading,
    isSuccess: usersSuccess,
  } = useGetAllUsers();
  // const { data: users } = await getAllUser();
  // const {data: premiums} = await getPremiumPosts();
  
  return (
    <div className="sticky top-0">
      <div className="rounded-xl bg-default-100 p-2">
        <div className=" p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-3">Who to follow</h2>
          <FollowLink users={usersData?.data}></FollowLink>
        </div>
        <div className=" p-4 rounded-lg">
          <h1 className="text-xl font-bold mb-3 ">Premium Post</h1>
          <PremiumPost premiumPosts={premiumData?.data}></PremiumPost>
        </div>

        <div className=" px-4 rounded-lg ">
          <div className="text-xs text-gray-500 flex flex-wrap justify-center gap-3 mt-6 border-t pt-4">
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Cookie Policy
            </a>
            <a href="#" className="hover:underline">
              Accessibility
            </a>
            <a href="#" className="hover:underline">
              Ads info
            </a>
            <a href="#" className="hover:underline">
              More<span >© 2024 PurrfectCare.</span>

            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
