"use client";
import { Avatar } from "@nextui-org/avatar";
import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@nextui-org/button";

import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineSave,
} from "react-icons/ai";

import ClaimRequestModal from "../../modals/ClaimRequestModal";
import AuthenticationModal from "../../modals/AuthenticationModal";

import ImageGallery from "./ImageGallery";

import { useUser } from "@/context/user.provider";
import { IPost, IUser } from "@/types";
import dateToISO from "@/utils/dateToISO";
import { useState } from "react";

interface IProps {
  post: IPost;
  postKey: string;
}

export default function Post({ post, postKey }: IProps) {
  const {
    title,
    dateFound,
    description,
    location,
    city,
    _id,
    images,
    user,
    questions,
  } = post || {};

  const { name, email, profilePhoto } = (user as IUser) || {};

  const { user: loggedInUser } = useUser();

  const [likes, setLikes] = useState(3000);
  const [comments, setComments] = useState(49);

  const handleLike = () => setLikes(likes + 1);
  const handleComment = () => setComments(comments + 1);

  return (
    <div key={postKey} className="mb-2 rounded-md bg-default-100 p-4">
      <div className="border-b border-default-200 pb-2">
        <div className="flex items-center justify-between border-b border-default-200 pb-4">
          <div className="flex items-center gap-3">
            <Avatar isBordered name={name} radius="sm" src={profilePhoto} />
            <div>
              <p>{name}</p>
              {/* <p className="text-xs">{email}</p> */}
              <p className="flex items-center gap-1 text-xs">
                Found on: <Calendar width={14} />
                {format(new Date(dateFound), "dd MMM, yyyy")}
                {/* { dateToISO(dateFound)} */}
              </p>
            </div>
          </div>
        </div>
        <div className="border-b border-default-200 py-4">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <Link href={`/found-items/${_id}`}>
                <h1 className="cursor-pointer text-2xl">{title}</h1>
              </Link>
            </div>
            <div>
              <p className="flex items-center gap-1">
                <MapPin width={18} />
                {location}, {city}
              </p>
            </div>
          </div>
          <p>{description}</p>
        </div>

        <ImageGallery images={images} />

        <div className="mt-4 mx-4">
          <div className="flex justify-between items-center flex-row mt-4 text-gray-600">
            <div className=" flex justify-center gap-5">
              <div
                className="flex items-center space-x-1 cursor-pointer"
                onClick={handleLike}
              >
                <AiOutlineHeart className="hover:text-red-600 " size={24} />
                <span className="dark:text-gray-400">{likes}K</span>
              </div>

              <div
                className="flex items-center space-x-1 cursor-pointer"
                onClick={handleComment}
              >
                <AiOutlineComment size={24} />
                <span className="dark:text-gray-400">{comments}</span>
              </div>
            </div>

            <div className="cursor-pointer ">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="bk"><path fill="#000" d="M17.5 1.25a.5.5 0 0 1 1 0v2.5H21a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0v-2.5H15a.5.5 0 0 1 0-1h2.5zm-11 4.5a1 1 0 0 1 1-1H11a.5.5 0 0 0 0-1H7.5a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4z"></path></svg>              <span className="sr-only">Save</span>
            </div>
          </div>
          {/* {email !== loggedInUser?.email && (
            <>
              {loggedInUser?.email && (
                <ClaimRequestModal id={_id} questions={questions} />
              )}
              {!loggedInUser?.email && <AuthenticationModal id={_id} />}
            </>
          )}
          {email !== loggedInUser?.email && (
            <div className="w-[1px] bg-default-200" />
          )} */}
          {/* <Button className="flex-1" variant="light">
            Share
          </Button> */}
        </div>
      </div>
    </div>
  );
}
