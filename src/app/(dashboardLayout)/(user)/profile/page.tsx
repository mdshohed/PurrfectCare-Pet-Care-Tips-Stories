'use client'

import Post from "@/components/UI/Post";
import { useGetMyPosts } from "@/hooks/post.hook";
import { getMyPosts } from "@/services/post";
import { IPost } from "@/types";

export default function page() {
  // const { data } = await getMyPosts();  

  const {
    data: postData,
    isLoading: postLoading,
    isSuccess: postSuccess,
  } = useGetMyPosts(); 

  console.log("post", postData?.data);
  

  return (
    <>
      {postData?.data?.length && postSuccess ? (
        postData?.data?.map((post: IPost) => <Post key={post._id} post={post} />)
      ) : (
        <div className="flex min-h-screen w-full items-center justify-center rounded-md bg-default-100">
          <h1 className="text-4xl">No Post Found!</h1>
        </div>
      )}
    </>
  );
}
