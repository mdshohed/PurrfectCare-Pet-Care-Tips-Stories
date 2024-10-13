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
      {postData?.data?.length && postsSuccess ? (
        postData?.data?.map((post: IPost) => <Post key={post._id} post={post}/>)
      ) : (
        <div className="flex min-h-screen w-full items-center justify-center rounded-md bg-default-100">
          <h1 className="text-4xl">No Post Found!</h1>
        </div>
      )}
   
      {/* <div className="my-8 grid justify-center gap-10 sm:grid-cols-1 md:grid-cols-3">
        
        {posts && posts?.data.map((post: IPost) => (
          <Card key={post?._id} post={post} />
        ))}
      </div>
      <div className="flex justify-center">
        <Button className="rounded-md bg-default-900 text-default" size="md">
          <Link href="/found-items">See All</Link>
        </Button>
      </div> */}
      
      </>
    // </Container>
  );
}
