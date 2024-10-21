// 'use client'

// import { IPost } from "@/types";
// import Post from "@/components/UI/Post";
// // import { useGetAllPosts } from "@/hooks/post.hook";
// import Loading from "@/app/loading";
// import InfiniteScroll from "react-infinite-scroller";
// import { useGetAllPosts, useGetAllPostsWithScrolls } from "@/hooks/post.hook";
// import { useGetAllPostsWithScroll } from "@/hooks/scroll.hook";
// import { useEffect } from "react";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { getAllPosts } from "@/services/post";
// import { LoadMore } from "@/components/UI/Post/load-more";

// export default function RecentPosts() {
//   // const { data } = await getAllPosts();
//   // const {
//   //   data: data,
//   //   isLoading: postsLoading,
//   //   hasMore,
//   //   response,
//   //   // limit,
//   //   // setLimit,
//   //   loadMorePosts,
//   // } = useGetAllPostsWithScroll();
//   // const posts = [
//   //   { id: 1, title: 'post 1' },
//   //   { id: 2, title: 'post 2' },
//   //   { id: 3, title: 'post 3' },
//   //   { id: 4, title: 'post 4' },
//   // ];
  
//   // // Simulate API call with pagination
//   // const fetchPost = async (page: number) => {
//   //   await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating a delay
//   //   return posts.slice((page - 1) * 2, page * 2); // Paginate posts, 2 per page
//   // };
  
//   // const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
//   //   ['scroll_post'], 
//   //   async ({ pageParam = 1 }) => {
//   //     const res = await fetchPost(pageParam); 
//   //     return res;
//   //   },
//   //   {
//   //     getNextPageParam: (_, pages) => {
//   //       return pages.length * 2 < posts.length ? pages.length + 1 : undefined; 
//   //     },
//   //     initialData: {
//   //       pages: [posts.slice(0, 2)], // Initial data (first 2 posts)
//   //       pageParams: [1],
//   //     },
//   //   }
//   // );


//   // const {
//   //   data: postData,
//   //   isLoading: postsLoading,
//   // } = useGetAllPosts();
//   // const {
//   //   data: postData,
//   //   isLoading: postsLoading,
//   // } = useGetAllPostsWithScrolls(1, 4);
  
//   return (
//     // <Container>
//     // <>
//     //   {postData?.data.length > 0 ? (
//     //     postData?.data.map((post: IPost) => (
//     //       <Post key={post._id} post={post} />
//     //     ))
//     //   ) : (
//     //     <div className="flex min-h-screen w-full items-center justify-center rounded-md bg-default-100">
//     //       <h1 className="text-4xl">No Post Found!</h1>
//     //     </div>
//     //   )}
//     // </>
//     // <div>
//     //    {/* <LoadMore></LoadMore> */}
//     //    {data.length > 0 ? (
//     //     <InfiniteScroll
//     //       pageStart={0}
//     //       loadMore={loadMorePosts}
//     //       hasMore={hasMore}
//     //       loader={<div className="loader py-10 flex justify-center items-center" key={0}>Loading...</div>}
//     //     >
//     //       {
//     //         data.map((post: IPost) => (
//     //         <Post key={post._id} post={post} />
//     //       ))
//     //     }
//     //     </InfiniteScroll>
//     //   ) : (
//     //     <div className="flex min-h-screen w-full items-center justify-center rounded-md bg-default-100">
//     //       <h1 className="text-4xl">No Post Found!</h1>
//     //     </div>
//     //   )}
//     // </div> 
//     // </Container>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { IPost } from "@/types";
import Post from "@/components/UI/Post";
import { useGetAllPostsWithScrolls } from "@/hooks/post.hook";
import { Spinner } from "@/components/UI/spinner";

export default function LoadMore() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const { data: response, isLoading: isFetching, isSuccess } = useGetAllPostsWithScrolls(1, limit);
  // const { data: response, isLoading: isFetching, isSuccess } = useGetAllPosts();
  const { ref, inView } = useInView();

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const loadMoreBeers = async () => {
    await delay(1000);
    setLimit((e) => e+3);
  };

  useEffect(() => {
    console.log("before", response?.data, inView, isFetching, isSuccess);

    if (inView && !isFetching&&isSuccess) {
      console.log("after", response?.data, inView, isFetching, isSuccess);
      loadMoreBeers();
    }
  }, [inView]);
  return (
    <>
      {response?.data?.map((post: IPost) => (
        <Post key={post._id} post={post} />
      ))}{" "}
      <div className="h-[100px]"></div>
      <div
        className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
        ref={ref}
      >
        <Spinner />
      </div>
    </>
  );
}
