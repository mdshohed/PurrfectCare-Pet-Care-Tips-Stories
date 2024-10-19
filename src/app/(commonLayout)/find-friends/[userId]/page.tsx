"use client";
import Loading from "@/app/loading";
import Filtering from "@/components/modules/found-post/Filtering";
import Container from "@/components/UI/Container";
import Post from "@/components/UI/Post";
import { useUser } from "@/context/user.provider";
import { useGetSomeOnePosts, useSinglePost } from "@/hooks/post.hook";
import { useGetSingleUser } from "@/hooks/user.hook";
import { IPost, IUser } from "@/types";
import { Avatar, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface IProps {
  params: {
    userId: string;
  };
}

const UserDetailPage = ({ params: { userId } }: IProps) => {
  const { user: currentUser } = useUser();
  const { data: user, isPending } = useGetSingleUser(userId);
  const { data: posts, isPending: isPostPending } = useGetSomeOnePosts(userId);
  const [isMounted, setIsMounted] = useState(false);
  
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Avoid rendering during hydration
  }

  return (
    <Container>
      {isPending && <Loading />}
      <div>
        <div className="rounded-xl bg-default-100 p-2">
          <div className=" p-5 flex items-center justify-center">
            <Avatar src={user?.profilePhoto} className="w-32 h-32 text-large" />
          </div>
          <div className="my-3 px-5 flex justify-center flex-col items-center">
            <h1 className="text-2xl font-semibold">{user?.name}</h1>
            <p className="break-words text-sm">{user?.email}</p>
          </div>
          {user?.role === "USER" ? (
            <div>
              <div className="flex justify-center items-center gap-3">
                <div className="flex gap-1 cursor-pointer hover:underline text-blue-500">
                  <p className="font-semibold text-small">
                    {user?.following ? user?.following?.length : 0}
                  </p>
                  <p className=" text-small">Following</p>
                </div>
                <div className="flex gap-1 cursor-pointer hover:underline text-blue-500">
                  <p className="font-semibold  text-small">
                    {user?.follower ? user?.follower?.length : 0}
                  </p>
                  <p className="text-small">Followers</p>
                </div>
              </div>
              <div className="flex justify-center">
              <Button
                className={` mt-3
                  ${user?.following?.some((u:IPost) => String(u?._id) == String(user?._id))
                    ? "bg-transparent text-foreground border-default-200"
                    : ""}`
                }
                color="primary"
                radius="full"
                size="sm"
                variant={
                  user.following?.some((u: IPost) => String(u?._id) == String(user?._id))
                    ? "bordered"
                    : "solid"
                }
                // onPress={() => handleSetConnection(user._id)}
              >
                {user.following?.some((u: IPost) => String(u?._id) == String(user?._id))
                  ? "Unfollow"
                  : "Follow"}
              </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div>
        <Container>
          <div className="mx-auto my-3 max-w-[720px]">
            {posts?.length ? (
              posts?.map((post: IPost) => <Post key={post?._id} post={post} />)
            ) : (
              <div className="bg-default-100 min-h-[200px] flex justify-center items-center">
                No Post Found!
              </div>
            )}
          </div>
        </Container>
      </div>
    </Container>
  );
};

export default UserDetailPage;
