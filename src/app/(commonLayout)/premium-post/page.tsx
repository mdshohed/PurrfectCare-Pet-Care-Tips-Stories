'use client'
import Filtering from "@/components/modules/found-post/Filtering";
import Container from "@/components/UI/Container";
import Post from "@/components/UI/Post";
import { useGetAllPosts } from "@/hooks/post.hook";
// import axiosInstance from "@/lib/AxiosInstance";
import { IPost } from "@/types";
import { useEffect, useState } from "react";

export default function FoundItems({
  searchParams,
}: {
  searchParams: any;
}) {
  const params = new URLSearchParams(searchParams);
  const premiumPost = params.get("premium"); 
// let fetchOptions = {};

//   fetchOptions = {
//     cache: "no-store",
//   };
  let {data: postData } = useGetAllPosts()
  const [data, setData] = useState<IPost[]>([])
  
  useEffect(()=>{
    if(postData && postData.data){
      const newPost = postData?.data?.filter( (post: IPost)=>post?.isPremium===true)
      setData(newPost)
    }
  },[postData])
  
  // const { data } = await axiosInstance.get(`/posts`, {
  //   params: {
  //     searchTerm: params.get("query"),
  //     category: params.get("category"),
  //   },
  // }, );


  return (
    <Container>
      <Filtering />
      <div className="mx-auto my-3 max-w-[720px]">
        {data?.map((post: IPost) => <Post key={post?._id} post={post} />)}
      </div>
    </Container>
  );
}
