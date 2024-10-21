"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { Spinner } from "../spinner";
import { IPost } from "@/types";
import { getAllPostsWithScroll } from "@/services/post";
import Post from "@/components/UI/Post";
import { useGetAllPosts, useGetAllPostsWithScrolls } from "@/hooks/post.hook";

export function LoadMore() {
  const [beers, setBeers] = useState<IPost[]>([]);
  const [page, setPage] = useState(1);
  const { data: response, isLoading: isFetching, isSuccess } = useGetAllPostsWithScrolls(page, 3);
  // const { data: response, isLoading: isFetching, isSuccess } = useGetAllPosts();
  const { ref, inView } = useInView();

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const loadMoreBeers = async () => {
    // Once the page 8 is reached repeat the process all over again.
    await delay(2000);
    const nextPage = (page % 7) + 1;
    // const newProducts =
    //   (await getAllPostsWithScroll({ page: nextPage, limit: 2 })) ?? [];
    // console.log("loadingMore", newProducts?.data);

    // setBeers((prevProducts: IPost[]) => [
    //   ...prevProducts,
    //   ...newProducts?.data,
    // ]);
    setPage(nextPage);
  };

  useEffect(()=>{
    if(isSuccess&&!isFetching){
       setBeers((prevProducts: IPost[]) => [
      ...prevProducts,
      ...response?.data,
    ]);
    }
  }, [isSuccess])

  // useEffect(() => {
  //   if (inView) {
  //     loadMoreBeers();
  //   }
  // }, [inView]);

  return (
    <>
      {beers?.map((post: IPost) => (
        <Post key={post._id} post={post} />
      ))}{" "}
      <div
        className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
        // ref={ref}
      >
        {/* <Spinner /> */}
      </div>
    </>
  );
}
