"use client";

import { Avatar } from "@nextui-org/avatar";
import {
  Calendar,
  ChartColumnStacked,
  Lock,
  SendHorizontal,
} from "lucide-react";
import { Button } from "@nextui-org/button";

import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineSave,
  AiFillHeart,
} from "react-icons/ai";

import ImageGallery from "./ImageGallery";

import { useUser } from "@/context/user.provider";
import { IPost, IUser } from "@/types";
import { useEffect, useState } from "react";
import { timeDiff } from "@/utils/common";
import {
  useAddPostComment,
  useDeleteComment,
  useGetComment,
  useUpdateComment,
  useUpdatePostLike,
} from "@/hooks/post.hook";
import { useRouter } from "next/navigation";
import { Badge } from "@nextui-org/badge";
import {
  CheckboxIcon,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  User,
} from "@nextui-org/react";
import { toast } from "sonner";
import { DeleteIcon } from "@/assets/icons";

interface IProps {
  post: IPost;
  key: string;
}

export default function Post({ post, key }: IProps) {
  const {
    title,
    description,
    _id,
    images,
    category,
    likes,
    comments,
    user,
    createdAt,
    isPremium,
    premiumDetails,
  } = post || {};
  const route = useRouter();
  // const [upVote, setUpVote] = useState(false);
  // const [downVote, setDownVote] = useState(false);
  const { name, profilePhoto } = (user as IUser) || {};
  const { user: loggedInUser } = useUser();
  const [flag, setFlag] = useState(-1);
  const [commentsText, setComments] = useState("");
  const [updateComment, setUpdateComment] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // useEffect(() => {
  // }, [title, likes, comments, isPremium]);

  const {
    mutate: handleAddComment,
    isPending,
    isSuccess: isAddCommentSuccess,
  } = useAddPostComment();

  const {
    mutate: updateComments,
    isPending: commentUpdatePending,
    isSuccess: commentUpdateSuccess,
  } = useUpdateComment();

  const {
    mutate: handleUpdateLike,
    data: updateData,
    isPending: createPostPending,
  } = useUpdatePostLike();

  useEffect(() => {
    if (commentUpdateSuccess && !commentUpdatePending) {
      setFlag(-1);
      setUpdateComment("");
    }
  }, [commentUpdateSuccess]);

  useEffect(() => {
    if (isAddCommentSuccess && !isPending) {
      setComments("");
    }
  }, [isAddCommentSuccess]);

  const { mutate: deleteComments } = useDeleteComment();

  const upVote =
    likes?.upVote?.some((u) => String(u) == String(loggedInUser?._id)) || false;
  const downVote =
    likes?.downVote.some((u) => String(u) == String(loggedInUser?._id)) ||
    false;

  // useEffect(() => {
  //   setUpVote(
  //      likes?.upVote?.some((u) => String(u) == String(loggedInUser?._id)) || false
  //   );
  //   setDownVote(
  //     likes?.downVote.some((u) => String(u) == String(loggedInUser?._id)) ||false
  //   );
  // }, [likes]);

  const onSubmitLikes = (id: string, type: string) => {
    if (!loggedInUser) {
      route.push(`/login`);
      return;
    } else if (loggedInUser?.role === "ADMIN") {
      toast.error("Your are not User!");
      return;
    }
    handleUpdateLike({ postId: id, type: type });
  };

  const handlePayment = (amount: number, id: string) => {
    if (!loggedInUser) {
      route.push(`/login`);
      return;
    } else if (loggedInUser?.role === "ADMIN") {
      toast.error("Your are not User!");
      return;
    }
    route.push(`/payment?fee=${amount}&PostId=${id}`);
  };

  const handleSaveComments = (postId: string) => {
    if (!loggedInUser) {
      route.push(`/login`);
      return;
    } else if (loggedInUser?.role === "ADMIN") {
      toast.error("Your are not User!");
      return;
    }
    const userComment = {
      text: commentsText,
      userId: loggedInUser!?._id,
      postId: postId,
    };
    handleAddComment(userComment);
  };
  // useEffect(() => {
  //   if (!isPending && isAddCommentSuccess) {
  //     setComments("");
  //   }
  // }, [isAddCommentSuccess]);

  const handleUpdateComment = (index: number) => {
    const payload = {
      postId: _id,
      index: index,
      text: updateComment,
    };
    updateComments({
      postId: _id,
      index: index,
      text: updateComment,
    });
  };

  const handleDeleteComment = (index: number) => {
    const payload = {
      postId: _id,
      index: index,
    };
    deleteComments(payload);
  };

  return (
    <div key={key} className="mb-2 rounded-md bg-default-100 p-4">
      {isPremium && user?._id !== loggedInUser?._id ? (
        <div className="border-b border-default-200 pb-2">
          <div className="flex items-center justify-between border-b border-default-200 pb-4">
            <div className="flex items-center gap-3">
              <Badge
                isOneChar
                content={<CheckboxIcon />}
                color="success"
                placement="top-right"
                // content=""
              >
                <Avatar
                  isBordered
                  name={name}
                  color="success"
                  radius="full"
                  src={profilePhoto}
                />
              </Badge>
              <div>
                <p>{name}</p>
                <div className="flex gap-2">
                  <p className="flex items-center gap-1 text-xs ">
                    <Calendar width={14} />
                    {timeDiff(createdAt)}
                  </p>
                  <p className="flex items-center gap-1 text-xs">
                    <ChartColumnStacked width={14} />
                    {category?.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-300 p-1 text-sm rounded-lg">
              <p className="flex justify-center dark:text-black items-center">
                {!premiumDetails?.subscribedUser?.some(
                  (u) => String(u) == String(loggedInUser?._id)
                ) && <Lock className="w-4 h-4 me-2" />}
                Premium Post
              </p>
            </div>
          </div>
          <div className="py-4">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h1 className="text-2xl">{title}</h1>
              </div>
            </div>
            <p className=" text-md">
              <div className="post-preview">
                {description?.length > 200 ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `${description.slice(
                        0,
                        200
                      )}... <a href="/found-post/${_id}">see more</a>`,
                    }}
                  />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                  />
                )}
              </div>
            </p>
          </div>
          {!premiumDetails?.subscribedUser?.some(
            (u) => String(u) == String(loggedInUser?._id)
          ) && (
            <Button
              onClick={() =>
                handlePayment(premiumDetails!?.subscriptionFee, _id)
              }
            >
              Pay ${premiumDetails!?.subscriptionFee}
            </Button>
          )}
          {premiumDetails?.subscribedUser?.some(
            (u) => String(u) == String(loggedInUser?._id)
          ) ? (
            <div>
              <ImageGallery images={images} />

              <div className="mt-4 mx-4">
                <div className="flex justify-between items-center flex-row mt-4 text-gray-600">
                  <div className=" flex justify-center gap-5">
                    <div className="flex items-center space-x-1 cursor-pointer">
                      {/* {liked ? (
                        <AiFillHeart className="text-red-600" size={24} />
                      ) : (
                        <AiOutlineHeart
                          className="hover:text-red-600"
                          size={24}
                        />
                      )} */}
                      <div
                        className={`flex gap-2 ${
                          upVote
                            ? "bg-green-200"
                            : downVote
                            ? "bg-red-200"
                            : "bg-gray-200"
                        } p-1 rounded-xl `}
                      >
                        <div
                          onClick={() => onSubmitLikes(_id, "Up")}
                          className={upVote ? "text-green-400" : ""}
                        >
                          <svg
                            // xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                            />
                          </svg>
                        </div>
                        <span className="dark:text-gray-500 font-semibold">
                          {likes?.count}
                        </span>
                        <div
                          onClick={() => onSubmitLikes(_id, "Down")}
                          className={downVote ? "text-red-400" : ""}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div
                      className="flex items-center space-x-1 cursor-pointer"
                      // onClick={handleComment}
                    >
                      <AiOutlineComment size={24} />

                      <span className="dark:text-gray-400">
                        {comments?.count}
                      </span>
                      <p onClick={onOpen}>View all comments</p>
                    </div>
                  </div>

                  <div className="cursor-pointer ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="bk"
                    >
                      <path
                        fill="#000"
                        d="M17.5 1.25a.5.5 0 0 1 1 0v2.5H21a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0v-2.5H15a.5.5 0 0 1 0-1h2.5zm-11 4.5a1 1 0 0 1 1-1H11a.5.5 0 0 0 0-1H7.5a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4z"
                      ></path>
                    </svg>{" "}
                    <span className="sr-only">Save</span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-3">
                  <Input
                    type="text"
                    color="secondary"
                    placeholder="Add a comment..."
                    labelPlacement="outside"
                    value={commentsText}
                    onChange={(e) => setComments(e.target.value)}
                  />
                  {/* <Button >Post</Button> */}
                  {commentsText ? (
                    <span onClick={() => handleSaveComments(_id)}>
                      <SendHorizontal className="text-2xl ms-2 text-gray-900 dark:text-gray-200 pointer-events-none flex-shrink-0 cursor-pointer" />
                    </span>
                  ) : (
                    <span>
                      <SendHorizontal className="text-2xl ms-2 text-gray-500 dark:text-gray-500 pointer-events-none flex-shrink-0 cursor-pointer" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="border-b border-default-200 pb-2">
          <div className="  border-b border-default-200 pb-4">
            {isPremium ? (
              <div className="flex items-center justify-between border-b border-default-200 pb-4">
                <div className="flex items-center gap-3">
                  <Badge
                    isOneChar
                    content={<CheckboxIcon />}
                    color="success"
                    placement="top-right"
                    // content=""
                  >
                    <Avatar
                      isBordered
                      name={name}
                      color="success"
                      radius="full"
                      src={profilePhoto}
                    />
                  </Badge>
                  <div>
                    <p>{name}</p>
                    <div className="flex gap-2">
                      <p className="flex items-center gap-1 text-xs ">
                        <Calendar width={14} />
                        {timeDiff(createdAt)}
                      </p>
                      <p className="flex items-center gap-1 text-xs">
                        <ChartColumnStacked width={14} />
                        {category?.name}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-300 p-1 text-sm rounded-lg">
                  <p className="flex justify-center dark:text-black items-center">
                    Premium Post
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Avatar
                  isBordered
                  name={name}
                  radius="full"
                  src={profilePhoto}
                />
                <div>
                  <p>{name}</p>
                  {/* <p className="text-xs">{email}</p> */}
                  <div className="flex gap-2">
                    <p className="flex items-center gap-1 text-xs ">
                      <Calendar width={14} />
                      {timeDiff(createdAt)}
                    </p>
                    <p className="flex items-center gap-1 text-xs">
                      <ChartColumnStacked width={14} />
                      {category?.name}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="border-b border-default-200 py-4">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h1 className="text-2xl">{title}</h1>
              </div>
            </div>
            <p className=" text-md">
              <div className="post-preview">
                {description?.length > 200 ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `${description.slice(
                        0,
                        200
                      )}... <a href="/found-post/${_id}">see more</a>`,
                    }}
                  />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                  />
                )}
              </div>
            </p>
          </div>

          <ImageGallery images={images} />

          <div className="mt-4 mx-4">
            <div className="flex justify-between items-center flex-row mt-4 text-gray-600">
              <div className=" flex justify-center gap-5">
                <div className="flex items-center space-x-1 cursor-pointer">
                  <div
                    className={`flex gap-2 ${
                      upVote
                        ? "bg-green-200"
                        : downVote
                        ? "bg-red-200"
                        : "bg-gray-200"
                    } p-1 rounded-xl `}
                  >
                    <div
                      onClick={() => onSubmitLikes(_id, "Up")}
                      className={upVote ? "text-green-400" : ""}
                    >
                      <svg
                        // xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                        />
                      </svg>
                    </div>
                    <span className="dark:text-gray-500 font-semibold">
                      {likes?.count}
                    </span>
                    <div
                      onClick={() => onSubmitLikes(_id, "Down")}
                      className={downVote ? "text-red-400" : ""}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div
                  className="flex items-center space-x-1 cursor-pointer"
                  // onClick={handleComment}
                >
                  <AiOutlineComment size={24} />

                  <span className="dark:text-gray-400">{comments?.count}</span>
                  <p onClick={onOpen}>View all comments</p>
                </div>
              </div>

              <div className="cursor-pointer ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="bk"
                >
                  <path
                    fill="#000"
                    d="M17.5 1.25a.5.5 0 0 1 1 0v2.5H21a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0v-2.5H15a.5.5 0 0 1 0-1h2.5zm-11 4.5a1 1 0 0 1 1-1H11a.5.5 0 0 0 0-1H7.5a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4z"
                  ></path>
                </svg>{" "}
                <span className="sr-only">Save</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-3">
              <Input
                type="text"
                color="secondary"
                placeholder="Add a comment..."
                labelPlacement="outside"
                value={commentsText}
                onChange={(e) => setComments(e.target.value)}
              />
              {/* <Button >Post</Button> */}
              {commentsText ? (
                <span onClick={() => handleSaveComments(_id)}>
                  <SendHorizontal className="text-2xl ms-2 text-gray-900 dark:text-gray-200 pointer-events-none flex-shrink-0 cursor-pointer" />
                </span>
              ) : (
                <span>
                  <SendHorizontal className="text-2xl ms-2 text-gray-500 dark:text-gray-500 pointer-events-none flex-shrink-0 cursor-pointer" />
                </span>
              )}
            </div>

            {/* comment modal  */}

            {/* <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              scrollBehavior={"inside"}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1 border-b ">
                      All Comments
                    </ModalHeader>
                    <ModalBody>
                      <div>
                        {comments?.comment?.length ? (
                          comments?.comment?.map((comment, index) => {
                            let hasUserComment =
                              comment.user?._id.toString() ===
                              loggedInUser?._id;
                              console.log("comment", hasUserComment);
                              
                            return (
                              <div key={index}>
                                <div
                                  key={index}
                                  className="flex flex-col items-start my-4 bg-default-50 rounded-lg p-2 border"
                                >
                                  <div className="flex justify-center items-center gap-3">
                                    <div>
                                      <Avatar
                                        src={comment.user.profilePhoto}
                                      ></Avatar>
                                    </div>
                                    <div>
                                      <p>{comment.user.name}</p>
                                      {
                                        index===flag ? 
                                        <Input 
                                          color="secondary" 
                                          onChange={(e)=>setUpdateComment(e.target.value)} 
                                          value={updateComment}
                                        ></Input> : 
                                        <p>{comment.text}</p>
                                      }
                                    </div>
                                  </div>
                                  {hasUserComment && (
                                    <div className="flex  gap-2 mt-2">
                                      {flag===index ? (
                                        <p
                                          onClick={() => handleUpdateComment(index)}
                                          className="text-xs bg-gray-200 px-4 py-[2px] rounded-lg cursor-pointer"
                                        >
                                          Update
                                        </p>
                                      ) : (
                                        <p
                                          onClick={() =>{ setFlag(index), setUpdateComment(comment.text)}}
                                          className="text-xs bg-gray-200 px-4 py-[2px] rounded-lg cursor-pointer"
                                        >
                                          Edit
                                        </p>
                                      )}
                                      <p onClick={()=>handleDeleteComment(index)} className="text-[16px] cursor-pointer">
                                        <DeleteIcon className="text-red-500 "></DeleteIcon>
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div>
                            <p className="flex justify-center items-center">
                              No Comments found!
                            </p>
                          </div>
                        )}
                      </div>
                    </ModalBody>
                  </>
                )}
              </ModalContent>
            </Modal> */}
          </div>
        </div>
      )}

      {/* comment modal  */}
      {/* <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={"inside"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-b ">
                All Comments
              </ModalHeader>
              <ModalBody>
                <div>
                  {comments?.comment?.length ? (
                    comments?.comment?.map((comment, index) => (
                      <div
                        key={index}
                        className="flex items-center my-2 bg-default-50 rounded-lg "
                      >
                        <User
                          avatarProps={{
                            radius: "lg",
                            src: comment?.user?.profilePhoto,
                          }}
                          description={comment?.text}
                          name={comment?.user?.name}
                        ></User>
                      </div>
                    ))
                  ) : (
                    <div>
                      <p className="flex justify-center items-center">
                        No Comments found!
                      </p>
                    </div>
                  )}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal> */}
      <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              scrollBehavior={"inside"}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1 border-b ">
                      All Comments
                    </ModalHeader>
                    <ModalBody>
                      <div>
                        {comments?.comment?.length ? (
                          comments?.comment?.map((comment, index) => {
                            let hasUserComment =
                              comment.user?._id.toString() ===
                              loggedInUser?._id;
                              console.log("comment", hasUserComment);
                              
                            return (
                              <div key={index}>
                                <div
                                  key={index}
                                  className="flex flex-col items-start my-4 bg-default-50 rounded-lg p-2 border"
                                >
                                  <div className="flex justify-center items-center gap-3">
                                    <div>
                                      <Avatar
                                        src={comment.user.profilePhoto}
                                      ></Avatar>
                                    </div>
                                    <div>
                                      <p>{comment.user.name}</p>
                                      {
                                        index===flag ? 
                                        <Input 
                                          color="secondary" 
                                          onChange={(e)=>setUpdateComment(e.target.value)} 
                                          value={updateComment}
                                        ></Input> : 
                                        <p>{comment.text}</p>
                                      }
                                    </div>
                                  </div>
                                  {hasUserComment && (
                                    <div className="flex  gap-2 mt-2">
                                      {flag===index ? (
                                        <p
                                          onClick={() => handleUpdateComment(index)}
                                          className="text-xs bg-gray-200 px-4 py-[2px] rounded-lg cursor-pointer"
                                        >
                                          Update
                                        </p>
                                      ) : (
                                        <p
                                          onClick={() =>{ setFlag(index), setUpdateComment(comment.text)}}
                                          className="text-xs bg-gray-200 px-4 py-[2px] rounded-lg cursor-pointer"
                                        >
                                          Edit
                                        </p>
                                      )}
                                      <p onClick={()=>handleDeleteComment(index)} className="text-[16px] cursor-pointer">
                                        <DeleteIcon className="text-red-500 "></DeleteIcon>
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div>
                            <p className="flex justify-center items-center">
                              No Comments found!
                            </p>
                          </div>
                        )}
                      </div>
                    </ModalBody>
                  </>
                )}
              </ModalContent>
            </Modal>
    </div>
  );
}
