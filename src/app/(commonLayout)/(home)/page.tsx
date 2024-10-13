// import Landing from "@/components/modules/home/Landing";
"use client";

import { useGetCategories } from "@/hooks/categoreis.hook";
import { Button } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

export default function Home() {
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

  return (
    <div className="flex justify-between items-start">
      {/* <Landing /> */}

      <div>
        <Autocomplete
          label="Filter"
          placeholder="Select Category"
          className="max-w-xs"
          defaultItems={categoryOption}
        >
          {(item) => (
            <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>
      </div>
      <div>
        <Button
          // as={Link}
          className="mt-2 w-full rounded-md bg-green-500"
          href={"/profile/create-post"}
        >
          Create a post
        </Button>
      </div>
    </div>
  );
}
