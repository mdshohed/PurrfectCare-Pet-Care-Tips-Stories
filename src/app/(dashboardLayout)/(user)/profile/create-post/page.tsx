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
import { allDistict } from "@bangladeshi/bangladesh-address";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

import FXInput from "@/components/form/FXInput";
import FXSelect from "@/components/form/FXSelect";
import { useGetCategories } from "@/hooks/categoreis.hook";
import { useUser } from "@/context/user.provider";
import { useCreatePost } from "@/hooks/post.hook";
import Loading from "@/app/loading";
import generateDescription from "@/services/ImageDescription";

import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 
import { Checkbox, Input } from "@nextui-org/react";

const cityOptions = allDistict()
  .sort()
  .map((city: string) => {
    return {
      key: city,
      label: city,
    };
  });

export default function CreatePost() {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [ descriptionQuill, setDescriptionQuill] = useState('')
  const [ isPremium, setIsPremium] = useState(false);
  const [subscription, setSubscription] = useState<number>( 0);

  const router = useRouter();

  const {
    mutate: handleCreatePost,
    isPending: createPostPending,
    isSuccess,
  } = useCreatePost();

  const { user } = useUser();

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

  const methods = useForm();

  const { control, handleSubmit } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    let postData = {
      ...data,
      user: user!._id,
      description: descriptionQuill, 
      isPremium: isPremium, 
    };
    if(isPremium) {
      const newPostData = {
        ...postData, 
        premiumDetails: {
          isPending: false, 
          subscriptionFee: subscription, 
        }
      }
      postData = {...newPostData}
    }
    formData.append("data", JSON.stringify(postData));

    for (let image of imageFiles) {
      formData.append("itemImages", image);
    }
    
    // const entries = Array.from(formData.entries());
    // console.log(entries);
    
    handleCreatePost(formData);
  };

  const handleFieldAppend = () => {
    //  const entries = Array.from(formData.entries());
    // // console.log(entries);
    if( fields.length==0){
      append({ name: "questions" });
    }

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

  // const handleDescriptionGeneration = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await generateDescription(
  //       imagePreviews[0],
  //       "write a description for social media post describing the given image that starts with 'Found this...'"
  //     );

  //     methods.setValue("description", response);
  //     setIsLoading(false);
  //   } catch (error: any) {
  //     console.error(error);
  //     setError(error.message);
  //     setIsLoading(false);
  //   }
  // };

  if (!createPostPending && isSuccess) {
    router.push("/");
  }

  return (
    <>
      {createPostPending && <Loading />}
      <div className="h-full rounded-xl bg-gradient-to-b from-default-100 px-[73px] py-12">
        <h1 className="text-2xl font-semibold">Create Post</h1>
        <Divider className="mb-5 mt-3" />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FXInput label="Title" name="title" />
              </div>
            </div>
           
            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FXSelect
                  disabled={!categorySuccess}
                  label="Category"
                  name="category"
                  options={categoryOption}
                />
              </div>
              <div className="min-w-fit flex-1">
                <label
                  className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                  htmlFor="image"
                >
                  Upload image
                </label>
                <input
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
                  onChange={(content) => setDescriptionQuill(content)}
                />
              </div>
            </div>

            <div className="flex justify-between items-center my-5">
              <h1 className="text-xl">Want to add as Premium Post?</h1>
              <Checkbox checked={isPremium} onClick={() => setIsPremium(e=>!e)} size="md"></Checkbox>
              {/* <Button isIconOnly >
              </Button> */}
            </div>

            <div className="space-y-5">
                { isPremium ? 
                <div  className="flex gap-2 items-start flex-col">
                  <p className="text-md">Subscription Fee</p>
                  <Input
                    label={""}
                    required={true}
                    placeholder="Fee"
                    type='number'
                    onChange={(e)=>setSubscription(parseInt(e.target.value))}
                  />
                </div> : null
              }
            </div>

            <Divider className="my-5" />

            {/* <Divider className="my-5" /> */}
            <div className="flex justify-end">
              <Button size="lg" type="submit">
                Post
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}

// 'use client'

// import React, { useState } from 'react';
// import ReactQuill from 'react-quill'; // Import ReactQuill
// import 'react-quill/dist/quill.snow.css'; // Import Quill styles

// const CreatePost = () => {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');

//     const handleSubmit = async (e: any) => {
//         e.preventDefault();

//         // Prepare post data
//         const postData = {
//             title,
//             description,
//         };

//         console.log("data", postData);
        

//         // Example API call to save the post
//         // try {
//         //     const response = await fetch('/api/posts', {
//         //         method: 'POST',
//         //         headers: {
//         //             'Content-Type': 'application/json',
//         //         },
//         //         body: JSON.stringify(postData),
//         //     });

//         //     if (!response.ok) {
//         //         throw new Error('Failed to save post');
//         //     }

//         //     // Clear the form after successful submission
//         //     setTitle('');
//         //     setDescription('');
//         // } catch (error) {
//         //     console.error('Error:', error);
//         // }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>Create a New Post</h2>
//             <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Title"
//                 required
//             />
//             <ReactQuill
//                 value={description}
//                 onChange={setDescription} // Update the description state
//                 placeholder="Write something..."
//             />
//             <button type="submit">Submit Post</button>
//         </form>
//     );
// };

// export default CreatePost;


