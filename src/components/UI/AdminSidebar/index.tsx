"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import Image from "next/image";

import { adminLinks } from "./constant";

import { useUser } from "@/context/user.provider";
import { SidebarOptions } from "./SidebarOptions";

const AdminSidebar = () => {
  const { user } = useUser();

  return (
    <div className="sticky top-0"> {/* Added top-0 to make the sidebar sticky */}
      <div className="rounded-xl bg-default-100 p-2">
        <div className="h-[330px] w-full rounded-md">
          <Image
            alt="profile"
            className="w-full h-full object-cover rounded-md"
            height={330}
            src={user?.profilePhoto as string}
            width={330}
          />
        </div>
        <div className="my-3">
          <h1 className="text-2xl font-semibold">{user?.name}</h1>
          <p className="break-words text-sm">{user?.email}</p>
        </div>
        <Button
          as={Link}
          className="mt-2 w-full rounded-md"
          href={"/profile/create-post"}
        >
          Create a post
        </Button>
      </div>
      <div className="mt-3 space-y-2 rounded-xl bg-default-100 p-2">
        <SidebarOptions links={ adminLinks}/>
      </div>
    </div>
  );
};

export default AdminSidebar;
