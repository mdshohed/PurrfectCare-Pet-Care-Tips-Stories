"use server";

import { getAllUser } from "@/services/user";
import React from "react";
import { FollowLink } from "./FollowLink";
import PremiumPost from "./PremiumPost";
import { getPremiumPosts } from "@/services/post";

export default async function PublicSidebar() {
  const { data: users } = await getAllUser();
  const {data: premiums} = await getPremiumPosts();
  
  return (
    <div className="sticky top-0">
      <div className="rounded-xl bg-default-100 p-2">
        <div className=" p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-3">Who to follow</h2>
          <FollowLink users={users}></FollowLink>
        </div>
        <div className=" p-4 rounded-lg">
          <h1 className="text-xl font-bold mb-3">Premium Post</h1>
          <PremiumPost premiumPosts={premiums}></PremiumPost>
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
