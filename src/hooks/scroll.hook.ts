import { useState, useEffect } from "react";
import { IPost } from "@/types";
import { getAllPostsWithScroll } from "@/services/post";

export const useGetAllPostsWithScroll = () => {
  const [data, setData] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>(5); // Track the current page

  const loadMorePosts = async () => {
    if (!hasMore) return; 

    setIsLoading(true);
    try {
      const response = await getAllPostsWithScroll(1, limit); 
      console.log("response",data);
      
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
    loadMorePosts,
  };
};
