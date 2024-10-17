"use client";

import { Input } from "@nextui-org/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useDebounce from "@/hooks/debounce.hook";
import { useSearchItems } from "@/hooks/search.hook";
import { useEffect, useRef, useState } from "react";
import { IPost } from "@/types";
import { Link } from "@nextui-org/link";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/assets/icons";
import { Button, input } from "@nextui-org/react";

const SearchFilter = () => {
  const { register, handleSubmit, watch } = useForm();
  const { mutate: handleSearch, data, isPending, isSuccess } = useSearchItems();
  const [searchResults, setSearchResults] = useState<IPost[] | []>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTerm = useDebounce(watch("search"));
  // const [isDropdownVisible, setDropdownVisible] = useState(false); // Manage dropdown visibility

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    }
    console.log(searchTerm);
    
  }, [searchTerm]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleSeeAll(data.search);
  };

  const handleSeeAll = (query: string) => {
    const queryString = query.trim().split(" ").join("+");
    router.push(`/found-post?query=${queryString}`);
  };

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
    }
    if (!isPending && isSuccess && data && searchTerm) {
      try {
        // Ensure that the data is serialized properly
        const plainData = JSON.parse(JSON.stringify(data?.data ?? []));
        console.log("data", plainData);

        setSearchResults(plainData);
      } catch (error) {
        console.error("Data serialization error:", error);
      }
    }
  }, [isPending, isSuccess, data, searchTerm]);


  // useEffect(() => {
  //   // Detect clicks outside the dropdown or input field
  //   const handleClickOutside = (event: MouseEvent) => {
  //     console.log("value", 2);
      
  //     if (
  //       inputRef.current &&
  //       !inputRef.current.contains(event.target as Node) 
        
  //     ) {
  //       setDropdownVisible(false); // Hide the dropdown when clicking outside
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   console.log("value", isDropdownVisible);
    
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [searchResults]);

  return (
    // <div className="  bg-cover bg-center">
    <div className="static mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div id="inputField" className="flex-1">
          <Input
            {...register("search")}
            aria-label="Search"
            classNames={{
              inputWrapper: "bg-default-100",
              input: "text-sm",
            }}
            placeholder="Search..."
            size="lg"
            
            startContent={
              <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
            }
            type="text"
          />
        </div>
      </form>
      { searchResults.length > 0 && (
        <div className="absolute rounded-xl bg-default-100 p-3 max-w-sm">
          <div className="space-y-3">
            {searchResults.map((item, index) => (
              <Link
                key={index}
                className="text-default-900 block rounded-md from-default-200 p-2 hover:bg-from-default-200 transition-all bg-gradient-to-l hover:bg-gradient-to-l"
                href={`/found-post/${item._id}`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <img
                      alt="item"
                      className="h-20 w-20 rounded-md"
                      src={item.images[0]}
                    />
                    <div>
                      <p className="text-lg font-semibold">{item.title}</p>
                      {/* <p className="mt-1 line-clamp-2 h-12 w-full text-sm">
                        {item.description}
                      </p> */}
                      <p
                        className=" text-md mt-1 line-clamp-2 w-full text-sm	"
                        dangerouslySetInnerHTML={{
                          __html: item.description,
                        }}
                      ></p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-3 flex justify-center border-t-1 border-default-50 pt-3">
            <Button
              className="flex items-center justify-center gap-1"
              color="primary"
              onClick={() => handleSeeAll(searchTerm)}
            >
              <span>See All</span>
            </Button>
          </div>
        </div>
      )}
    </div>
    // </div>
  );
};

export default SearchFilter;
