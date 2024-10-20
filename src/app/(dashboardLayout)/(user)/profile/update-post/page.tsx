"use client";

import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FXInput from "@/components/form/FXInput";
import FXSelect from "@/components/form/FXSelect";
import { useGetCategories } from "@/hooks/categoreis.hook";
import { useUser } from "@/context/user.provider";
import { useCreatePost, useSinglePost, useUpdatePost } from "@/hooks/post.hook";
import Loading from "@/app/loading";

// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import { IPost } from "@/types";
import { title } from "process";

export default function UpdatePost({ searchParams }: { searchParams: any }) {
  const params = new URLSearchParams(searchParams);
  const searchTerm = params.get("postId");

  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const [descriptionQuill, setDescriptionQuill] = useState("");
  const [subscription, setSubscription] = useState<number>(0);
  const [data, setData ] = useState<IPost>({} as IPost)
  const router = useRouter();
  const { user } = useUser();

  const {
    mutate: handleUpdatePost,
    isPending: updatePostPending,
    isSuccess: updateSuccess,
  } = useUpdatePost();
  useEffect(()=>{
    if(!updatePostPending&&updateSuccess){
      router.push('/profile')
    }
  },[updateSuccess])

  const {
    data: postData,
    isPending: getSinglePostPending,
    isSuccess: getSinglePostSuccess,
  } = useSinglePost(searchTerm ?? "");

  const {
    data: categoriesData,
    isLoading: categoryLoading,
  } = useGetCategories();

  // let categoryOption: { key: string; label: string }[] = [];
  const [categoryOptionState, setCategoryOptionState] = useState<
    { key: string; label: string }[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleChange = (data: any) => {
    setSelectedCategory(data?.target.value); 
    console.log(data.target.value);
    
  };

  useEffect(() => {
    if (categoriesData?.data && !categoryLoading) {
      const categoryOption = categoriesData.data
        .sort()
        .map((category: { _id: string; name: string }) => ({
          key: category._id,
          label: category.name,
        }));
      setCategoryOptionState(categoryOption);
    }
  }, [categoriesData]);

  const methods = useForm();
  const { control, handleSubmit } = methods;

  useEffect(() => {
    if (postData?.data && !getSinglePostPending && getSinglePostSuccess) {
      if (postData?.data.isPremium) {
        setSubscription(postData.data.subscriptionFee);
      }
      
      setData(postData?.data);
      setSelectedCategory( postData?.data.category?._id)
      setImagePreviews(postData?.data.images);
    }
  }, [postData?.data]);

  const onSubmit: SubmitHandler<FieldValues> = () => {
    let postData = {
      title: data?.title,
      description: data?.description,
      isPremium: data?.isPremium || false,
      category: selectedCategory
    }
    if (data?.isPremium) {
      const newPostData = {
        ...postData,
        premiumDetails: {...data?.premiumDetails},
      };
      postData = { ...newPostData };
    }
    console.log("data", postData, data);
    // const entries = Array.from(formData.entries());
    // console.log(entries);
    handleUpdatePost({params: data?._id, payload: postData});
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImageFiles((prev) => [...prev, file]);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="h-full rounded-xl bg-gradient-to-b from-default-100 px-[73px] py-12">
        <h1 className="text-2xl font-semibold">Update Post</h1>
        <Divider className="mb-5 mt-3" />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                {/* <FXInput
                  {...methods.register("title")}
                  label="Title"
                  name="title"
                  
                /> */}
                <Input isRequired variant="bordered" name="title" value={data?.title} label="Title" onChange={(e)=>setData({...data, title: e.target.value})}></Input>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                {/* <FXSelect
                  disabled={!categorySuccess}
                  label="Category"
                  name="category"
                  options={categoryOptionState}
                /> */}
                 {
                  selectedCategory && 
                  <Select
                    isRequired
                    label="Category"
                    placeholder="Select an Category"
                    defaultSelectedKeys={[selectedCategory]}
                    onChange={handleChange}
                    className="max-w-xs"
                  >
                    {categoryOptionState.map((category: any) => (
                      <SelectItem key={category.key} value={category.label}>
                        {category.label}
                      </SelectItem>
                    ))}
                 </Select>
                  } 
                 
              </div>
              <div className="min-w-fit flex-1">
                <label
                  className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                  htmlFor="image"
                >
                  Upload image
                </label>
                <input
                  disabled
                  multiple
                  className="hidden"
                  id="image"
                  type="file"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
            </div>

            {imagePreviews.length > 0 && (
              <div className="flex gap-5 my-5 flex-wrap">
                {imagePreviews.map((imageDataUrl) => (
                  <div
                    key={imageDataUrl}
                    className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2"
                  >
                    <img

                      alt="item"
                      className="h-full w-full object-cover object-center rounded-md"
                      src={imageDataUrl}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap-reverse gap-2 py-2">
              <div className="min-w-fit flex-1">
                <ReactQuill
                  theme="snow"
                  placeholder="Write something..."
                  value={data?.description}
                  onChange={(e) => setData({...data, description: e})}
                />
              </div>
            </div>

            <div className="flex justify-between items-center my-5">
              <h1 className="text-xl">Want to add as Premium Post?</h1>
              <Checkbox
                isSelected={data.isPremium}
                onChange={(e) => setData({ ...data, isPremium: e.target.checked })} // Use `checked` instead of `value`
                size="md"
              ></Checkbox>
              {/* <Button isIconOnly >
              </Button> */}
            </div>

            <div className="space-y-5">
              {data?.isPremium ? (
                <div className="flex gap-2 items-start flex-col">
                  <p className="text-md">Subscription Fee</p>
                  <Input
                  label={""}
                  required={true}
                  placeholder="Fee"
                  type="number"
                  value={data?.isPremium ? String(data?.premiumDetails?.subscriptionFee || 0) : "0"} 
                  onChange={(e) =>
                    setData({
                      ...data,
                      premiumDetails: {
                        ...data?.premiumDetails, 
                        subscriptionFee: parseInt(e.target.value) || 0, 
                        isPending: data?.premiumDetails?.isPending || false, 
                        subscribedUser: data?.premiumDetails?.subscribedUser || []
                      }
                    })
                  }
                />

                </div>
              ) : null}
            </div>

            <Divider className="my-5" />

            {/* <Divider className="my-5" /> */}
            <div className="flex justify-end">
              <Button size="lg" type="submit">
                Update
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}

// import React from 'react'

// export default function CreatePost() {
//   return (
//     <div>CreatePost</div>
//   )
// }
