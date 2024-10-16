"use client";
import { EditIcon } from "@/assets/icons";
import { IdCard, Mail, Smartphone, Upload, User } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";
import { Button, Input } from "@nextui-org/react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useUserRegistration } from "@/hooks/auth.hook";
import { getProfile } from "@/services/profile";
import { IUser, IUserUpdate } from "@/types";
import Loading from "@/app/loading";
import { useUpdateProfile } from "@/hooks/profile.hook";
// import { useUpdateProfile } from "@/hooks/profile.hook";

export default  function Profile({user}: {user: IUser}) {
  const [update, setUpdate] = useState(false);
  const [imageFile, setImageFiles] = useState<File | {}>({});
  const [imagePreviews, setImagePreviews] = useState<string>('');
  const [userDetail, setUserDetail] = useState({ name: "", mobileNumber: "", })

  useEffect(()=>{
    setUserDetail({...userDetail, name: user?.name, mobileNumber: user?.mobileNumber})
    setImagePreviews(user?.profilePhoto)
  },[user])

  const {
    mutate: handleUpdateProfile,
    isPending, 
    isSuccess,
  } = useUpdateProfile();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

    const formData = new FormData(); // Ensure formData is initialized

    const userData = {
      name: userDetail.name,
      mobileNumber: userDetail.mobileNumber,
      // profilePhoto: imageFile (not needed in the object, handled by FormData)
    };

    formData.append("data", JSON.stringify(userData));

    // Ensure imageFile is a valid File or Blob before appending
    if (imageFile && imageFile instanceof File) {
      formData.append("profilePhoto", imageFile); // Append the file
    } else {
      console.warn("imageFile is not a valid File");
    }

    const entries = Array.from(formData.entries());
    console.log(entries);

    handleUpdateProfile(formData); // Call the update function with formData
};


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImageFiles( file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-2">
      {isPending && <Loading></Loading>}
      <div className="flex justify-between items-center pe-10">
        <h1 className="text-xl">My Profile</h1>
        <span
          onClick={() => setUpdate(!update)}
          className="text-2xl cursor-pointer"
        >
          <EditIcon></EditIcon>
        </span>
      </div>
      <hr className="my-2 border-purple-500 mb-4" />

      {update ? (
        <div>
          <FXForm onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-5">
              <div className="py-3">
                <span className="flex justify-start items-center gap-2">
                  <User className="w-4" />
                  Full Name
                </span>
                <Input type="text" name="name" variant="bordered" placeholder="Enter your Name" value={userDetail?.name} onChange={(e)=>setUserDetail({...userDetail, name: e.target.value})} />
                </div>
              <div className="py-3">
                <span className="flex justify-start items-center gap-2">
                  <Mail className="w-4" />
                  Email
                </span>
                <Input type="text" name="email" disabled variant="bordered" value={user?.email}  />

              </div>
              <div className="py-3">
                <span className="flex justify-start items-center gap-2">
                  <IdCard className="w-4" />
                  User ID
                </span>
                <Input type="text" disabled variant="bordered" value={user?._id}  />

              </div>
              <div className="py-3">
                <span className="flex justify-start items-center gap-2">
                  <Smartphone className="w-4" />
                  Mobile Number
                </span>
                <Input type="text" variant="bordered" placeholder="Enter your MobileNumber" value={userDetail?.mobileNumber} onChange={(e)=>setUserDetail({...userDetail, mobileNumber: e.target.value})} />
              </div>
            </div>
            <div className="p-5">
              <h1 className="pb-2 text-lg">Profile Image</h1>
              <div className="min-w-fit flex-1 py-1">
                <label
                  className="flex h-10 size-52 cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                  htmlFor="image"
                >
                  <Upload className="w-4" />
                  Change Profile Image
                </label>
                <input
                  multiple
                  className="hidden"
                  id="image"
                  type="file"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
              <div className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2">
                <img
                  alt="item"
                  className="h-full w-full object-cover object-center rounded-md"
                  src={imagePreviews}
                />
              </div>
            </div>
            <Button
              className="my-3 w-full rounded-md bg-default-900 text-default"
              size="lg"
              type="submit"
            >
              Update
            </Button>
          </FXForm>
        </div>
      ) : (
        <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
          {/* <div className="flex justify-between"> */}
          <div className="flex justify-between flex-col gap-2">
            <span className="">
              {/* <User /> */}
              Full Name
            </span>
            <span className="">{user?.name}</span>
          </div>
          <div className="flex justify-between flex-col">
            <span className="">
              {/* <Mail /> */}
              Email
            </span>
            <span className="">{user?.email}</span>
          </div>
          {/* </div> */}

          {/* <div className="flex justify-between"> */}
          <div className="flex justify-between flex-col">
            <span className="">
              {/* <IdCard /> */}
              User ID
            </span>
            <span className="">{user?._id}</span>
          </div>
          <div className="flex justify-between flex-col">
            <span className="">
              {/* <Smartphone /> */}
              Mobile Number
            </span>
            <span className="">{user?.mobileNumber}</span>
          </div>
        </div>
      )}
    </div>
  );
}
