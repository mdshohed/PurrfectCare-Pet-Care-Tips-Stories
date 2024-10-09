"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import Image from "next/image";

import { SidebarOptions } from "./SidebarOptions";
import { adminLinks, userLinks } from "./constants";

import { useUser } from "@/context/user.provider";

const Sidebar = () => {
  const { user } = useUser();

  return (
    <div className="sticky top-0">
      {" "}
      {/* Added top-0 to make the sidebar sticky */}
      <div className="rounded-xl bg-default-100 p-2">
        <div className="h-full w-[230px] mx-auto px-5 rounded-full">
          <Image
            alt="profile"
            className="w-full h-full p-5 object-cover rounded-full"
            height={100}
            src={user?.profilePhoto as string}
            width={100}
          />
        </div>
        <div className="my-3 px-5 flex justify-center flex-col items-center">
          <h1 className="text-2xl font-semibold">{user?.name}</h1>
          <p className="break-words text-sm">{user?.email}</p>
        </div>
        {user?.role === "USER" ? (
          <div>
            <div className="flex justify-center items-center gap-3">
              <div className="flex gap-1 hover:underline text-blue-500">
                <p className="font-semibold text-small">{user?.following ? user?.following?.length : 0}</p>
                <p className=" text-small">Following</p>
              </div>
              <div className="flex gap-1 hover:underline text-blue-500">
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
