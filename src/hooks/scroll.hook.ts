import { useState, useEffect } from "react";
import { IPost } from "@/types";
import { getAllPostsWithScroll } from "@/services/post";
import { useGetAllPostsWithScrolls } from "./post.hook";

export const useGetAllPostsWithScroll = () => {
  const [data, setData] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>(5); // Track the current page

  const loadMorePosts = async () => {
    if (!hasMore) return; 

    setIsLoading(true);
    try {
      const response = await getAllPostsWithScroll({page: 1, limit: limit}); 
      // const {data:response} =  useGetAllPostsWithScrolls(1, limit); 
      console.log("response", data);
      
      if (response?.data.length === 0) {
        setHasMore(false); 
      } else {
        setData((prevData) => [...prevData, ...response?.data]);
        setLimit((prevPage) => prevPage + 2); 
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Optionally handle error state here
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMorePosts(); // Load the initial posts
  }, []); // Run once on mount

  return {
    data,
    isLoading,
    hasMore,
    limit, 
    loadMorePosts,
  };
};

// import { useInfiniteQuery } from "@tanstack/react-query";
// import { getAllPostsWithScroll, getMyPosts } from "@/services/post";

// export const useGetAllPostsWithScroll = () => {
//   const limit = 10; 

//   const {
//     data,
//     isLoading,
//     isFetchingNextPage,
//     fetchNextPage,
//     hasNextPage,
//   } = useInfiniteQuery(
//     ["GET_MY_POSTS"],
//     async ({ pageParam = 1 }) => { 
//       const response = await getAllPostsWithScroll({page: pageParam, limit: limit}); 
//       return response?.data; },
//     {
//       getNextPageParam: (lastPage, allPages) => {
//         if (lastPage?.length < limit) {
//           return undefined; 
//         }
//         return allPages.length + 1;
//       },
//     }
//   );

//   const allPosts = data?.pages?.flat() || [];
//   return {
//     data: allPosts,
//     isLoading,
//     isFetchingNextPage,
//     hasMore: !!hasNextPage, 
//     loadMorePosts: fetchNextPage, 
//   };
// };
