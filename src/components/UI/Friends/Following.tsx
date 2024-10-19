import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import { IUser } from "@/types";
import { useUpdateUserFollowing } from "@/hooks/user.hook";


export default function Following({following, handleSetConnection}: {following: IUser[], handleSetConnection: (id: string) => void}) {

  return (
    <div>
      <div className="gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {following?.map((user: IUser) =>{ 
          return(
          <Card key={user?._id} className="">
            <CardHeader className="justify-start items-start flex-col">
              <div className="flex gap-5">
                <Avatar
                  isBordered
                  radius="full"
                  size="md"
                  src={user.profilePhoto}
                />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600">
                    {user.name}
                  </h4>
                  <h5 className="text-small tracking-tight text-default-400">
                    {user.email}
                  </h5>
                </div>
              </div>
              <Button
                className={` mt-3
                  ${following?.some((u) => String(u?._id) == String(user?._id))
                    ? "bg-transparent text-foreground border-default-200"
                    : ""}`
                }
                color="primary"
                radius="full"
                size="sm"
                variant={
                  following?.some((u) => String(u?._id) == String(user?._id))
                    ? "bordered"
                    : "solid"
                }
                onPress={() => handleSetConnection(user._id)}
              >
                {following?.some((u) => String(u?._id) == String(user?._id))
                  ? "Unfollow"
                  : "Follow"}
              </Button>
            </CardHeader>
            <CardFooter className="gap-3">
              <div className="flex gap-1">
                <p className="font-semibold text-default-400 text-small">{user?.following ? user?.following?.length : 0}</p>
                <p className=" text-default-400 text-small">Following</p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold text-default-400 text-small">
                {user?.follower ? user?.follower?.length : 0}
                </p>
                <p className="text-default-400 text-small">Followers</p>
              </div>
            </CardFooter>
          </Card>
        )})}
      </div>
    </div>
  )
}
