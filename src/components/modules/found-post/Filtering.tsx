"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@nextui-org/button";
import { RotateCw } from "lucide-react";

import { ICategory } from "@/types";
import { useGetCategories } from "@/hooks/categoreis.hook";
import { Select, SelectItem } from "@nextui-org/react";

const Filtering = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data } = useGetCategories();
  const { data: categories } = data || [];

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const [key, value] = category.split("=");

    params.set(key, value);
    router.push(`/found-post?${params.toString()}`);
  };

  // const handleSortContentChange = (sort: string) => {
    
  //   const params = new URLSearchParams(searchParams.toString());

  //   const [key, value] = sort.split("=");

  //   params.set(key, value);
  //   router.push(`/found-post?${params.toString()}`);
  // };

  // const sorts = [
  //   { key: "-createdAt", label: "Latest Post" },
  //   { key: "top", label: "Most Upvoted" },
  // ];
  return (
    <div className="mx-auto my-3 max-w-[720px] justify-start flex">
      <div className="flex justify-center gap-1">
        {/* <div className="min-w-[100px]">
          <select 
            onChange={(e) => handleSortContentChange(`sort=${e.target.value}`)}
            className="max-w-xs border-2 rounded-lg py-1.5 focus:ring-0 focus:outline-none text-xs"
          >
            <option selected disabled>Sort</option>
            {sorts.map((sort) => (
              <option
              // onChange={(e)handleSortContentChange()}
                key={sort.key}
                value={sort.key}
              >
                {sort.label}
              </option>
            ))}
          </select>
        </div> */}
        {categories?.map(({ _id, name }: ICategory) => (
          <Button
            key={_id}
            size="sm"
            variant="ghost"
            onClick={() => handleCategoryChange(`category=${name}`)}
          >
            {name}
          </Button>
        ))}
        <Button className="rounded-lg" size="sm" variant="ghost">
          <RotateCw onClick={() => router.push("/found-post")} />
        </Button>
      </div>
    </div>
  );
};

export default Filtering;
