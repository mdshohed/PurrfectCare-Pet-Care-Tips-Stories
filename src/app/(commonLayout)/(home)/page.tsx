// import Landing from "@/components/modules/home/Landing";
"use client";

import Filtering from "@/components/modules/found-post/Filtering";
import { useUser } from "@/context/user.provider";
import { useGetCategories } from "@/hooks/categoreis.hook";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const {user} = useUser(); 
  const route = useRouter(); 
  const {
    data: categoriesData,
    isLoading: categoryLoading,
    isSuccess: categorySuccess,
  } = useGetCategories();

  let categoryOption: { key: string; label: string }[] = [];

  if (categoriesData?.data && !categoryLoading) {
    categoryOption = categoriesData.data
      .sort()
      .map((category: { _id: string; name: string }) => ({
        key: category._id,
        label: category.name,
      }));
  }
  const handleNavigate = () =>{
    if(!user){
      route.push( '/login?redirect=/profile/create-post')
      return;
    }
    route.push('/profile/create-post')
  }

  return (
    <div className="flex justify-between items-start">
      <div>
        <Filtering></Filtering>
      </div>
    </div>
  );
}
