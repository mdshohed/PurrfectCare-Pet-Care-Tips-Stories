"use client";

import { IPost } from "@/types";
import Post from "@/components/UI/Post";
// import { useGetAllPosts } from "@/hooks/post.hook";
import Loading from "@/app/loading";
import InfiniteScroll from "react-infinite-scroller";
import { useGetAllPosts, useGetAllPostsWithScrolls } from "@/hooks/post.hook";
import { useGetAllPostsWithScroll } from "@/hooks/scroll.hook";

export default function RecentPosts() {
  // const { data } = await getAllPosts();
  // const {
  //   data: data,
  //   isLoading: postsLoading,
  //   hasMore,
  //   limit,
  //   loadMorePosts,
  // } = useGetAllPostsWithScroll();
  const {
    data: postData,
    isLoading: postsLoading,
  } = useGetAllPosts();


  // if (postsLoading) {
  //   return <Loading></Loading>;
  // }

  // console.log("dta", data);
  

  return (
    // <Container>
    <>
      {postData?.data.length > 0 ? (
        // <InfiniteScroll
        //   pageStart={0}
        //   loadMore={loadMorePosts}
        //   hasMore={hasMore}
        //   loader={<div className="loader" key={0}>Loading...</div>}

        // >
          // {
            postData?.data.map((post: IPost) => (
            <Post key={post._id} post={post} />
          ))
        // }
        // </InfiniteScroll>
      ) : (
        <div className="flex min-h-screen w-full items-center justify-center rounded-md bg-default-100">
          <h1 className="text-4xl">No Post Found!</h1>
        </div>
      )}
    </>
    // <>
    //   {data.length > 0 ? (
    //     <InfiniteScroll
    //       pageStart={0}
    //       loadMore={loadMorePosts}
    //       hasMore={hasMore}
    //       loader={<div className="loader" key={0}>Loading...</div>}

    //     >
    //       {
    //         data.map((post: IPost) => (
    //         <Post key={post._id} post={post} />
    //       ))
    //     }
    //     </InfiniteScroll>
    //   ) : (
    //     <div className="flex min-h-screen w-full items-center justify-center rounded-md bg-default-100">
    //       <h1 className="text-4xl">No Post Found!</h1>
    //     </div>
    //   )}
    // </>
    // </Container>
  );
}
