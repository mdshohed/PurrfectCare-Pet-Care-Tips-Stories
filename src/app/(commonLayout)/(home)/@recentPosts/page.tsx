'use client'

import { IPost } from "@/types";
import Post from "@/components/UI/Post";
import { getAllPosts } from "@/services/post";
import { useGetAllPosts } from "@/hooks/post.hook";

export default async function RecentPosts() {
  // const { data } = await getAllPosts();
  const {
    data: postData,
    isLoading: categoryLoading,
    isSuccess: categorySuccess,
  } = useGetAllPosts();  
  console.log(postData);
  
  return (
    // <Container>
      <>
      {postData?.data?.length ? (
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
