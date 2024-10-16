"use client"

import { IPost } from "@/types";
import Post from "@/components/UI/Post";
import { useGetAllPosts } from "@/hooks/post.hook";
import Loading from "@/app/loading";

export default function RecentPosts() {
  // const { data } = await getAllPosts();
  const {
    data: postData,
    isLoading: postsLoading,
    isSuccess: postsSuccess,
  } = useGetAllPosts();    

  if(postsLoading) {
    return <Loading></Loading>
  }
  
  return (
    // <Container>
      <>
      {postData?.data && postsSuccess ? (
        postData?.data?.map((post: IPost) => <Post key={post._id} post={post}/>)
      ) : (
        <div className="flex min-h-screen w-full items-center justify-center rounded-md bg-default-100">
          <h1 className="text-4xl">No Post Found!</h1>
        </div>
      )}
   

      
      </>
    // </Container>
  );
}
