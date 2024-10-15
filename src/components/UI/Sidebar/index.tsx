"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import Image from "next/image";

import { SidebarOptions } from "./SidebarOptions";
import { adminLinks, userLinks } from "./constants";

import { useUser } from "@/context/user.provider";
import { useRouter } from "next/navigation";
import { useGetProfile } from "@/hooks/profile.hook";
import { Avatar } from "@nextui-org/react";

const Sidebar = () => {
  // const { user } = useUser();
  const {
    data: user,
    isLoading: postsLoading,
    isSuccess: postsSuccess,
  } = useGetProfile(); 
  const route = useRouter(); 
  const handleRoute = ( params: string) =>{
    route.push(`/profile/friends?default=${params}`);
  }
  return (
    <div className="sticky top-0">
      {" "}
      {/* Added top-0 to make the sidebar sticky */}
      <div className="rounded-xl bg-default-100 p-2">
        <div className=" p-5 flex items-center justify-center">
          {/* <Image
            alt="profile"
            className="w-full h-full p-5  "
            height={100}
            src={user?.profilePhoto as string}
            width={100}
          /> */}
          <Avatar src={user?.profilePhoto} className="w-32 h-32 text-large" />

        </div>
        <div className="my-3 px-5 flex justify-center flex-col items-center">
          <h1 className="text-2xl font-semibold">{user?.name}</h1>
          <p className="break-words text-sm">{user?.email}</p>
        </div>
        {user?.role === "USER" ? (
          <div>
            <div className="flex justify-center items-center gap-3">
              <div onClick={()=>handleRoute('following')} className="flex gap-1 cursor-pointer hover:underline text-blue-500">
                <p className="font-semibold text-small">{user?.following ? user?.following?.length : 0}</p>
                <p className=" text-small">Following</p>
              </div>
              <div onClick={()=>handleRoute('follower')} className="flex gap-1 cursor-pointer hover:underline text-blue-500">
                <p className="font-semibold  text-small">
                {user?.follower ? user?.follower?.length : 0}
                </p>
                <p className="text-small">Followers</p>
              </div>
            </div>
            <Button
              as={Link}
              className="mt-2 w-full rounded-md"
              href={"/profile/create-post"}
            >
              Create a post
            </Button>
          </div>
        ) : null}
      </div>
      <div className="mt-3 space-y-2 rounded-xl bg-default-100 p-2">
        <SidebarOptions
          links={user?.role === "USER" ? userLinks : adminLinks}
        />
      </div>
    </div>
  );
};

export default Sidebar;
