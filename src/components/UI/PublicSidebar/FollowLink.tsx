import { IUser } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { ImageAvatar } from "./ImageAvatar";
import { Button } from "@nextui-org/button";

export const FollowLink = ({ users }: { users: IUser[] }) => {
  return (
    <>
      {users?.map((user) => (
        <div className="flex items-center justify-between mb-4">
          {/* <Image
            src={user?.profilePhoto}
            alt={user?.profilePhoto}
            width={40}
            height={40}
            className="rounded-full"
          /> */}
          {/* <ImageAvatar img={user?.profilePhoto}></ImageAvatar> */}
          <Link href={`friends/${user._id}`}>
            <div className="flex justify-center items-center">
              <img
                src={user.profilePhoto}
                alt={user.profilePhoto}
                className="w-[30px] rounded-full me-2"
              ></img>

              <h3 className="font-semibold">{user.name}</h3>
            </div>
          </Link>
          <Button
            className="bg-black dark:bg-white text-tiny text-white dark:text-black"
            radius="full"
            size="sm"
          >
            <Link key={user._id} href={user._id}>
              Follow
            </Link>
          </Button>
        </div>
      ))}
      <div className="text-blue-400 text-[15px]">
        <Link href={"post?premium=all"}>Show More</Link>
      </div>
    </>
  );
};
