'use client'
import { Button } from "@nextui-org/button";
import Link from "next/link";

import { IPost } from "@/types";
import Container from "@/components/UI/Container";
import Card from "@/components/UI/Card";
import { useGetRecentPostsQuery } from "@/redux/features/post/postApi";
import Post from "@/components/UI/Post";

export default async function RecentPosts() {
  const { data: posts } = useGetRecentPostsQuery(null);

  return (
    // <Container>
      <>
      {posts?.data?.length ? (
        posts?.data?.map((post: IPost) => <Post postKey={post._id} post={post} />)
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
