"use client";
import { Avatar } from "@nextui-org/avatar";
import { format } from "date-fns";
import { Calendar, Lock, MailIcon, MapPin, SendHorizontal } from "lucide-react";
import Link from "next/link";
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
import dateToISO from "@/utils/dateToISO";
import { useEffect, useState } from "react";
import { timeDiff } from "@/utils/common";
import { useAddPostComment, useUpdatePostLike } from "@/hooks/post.hook";
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
    likes,
    comments,
    user,
    createdAt,
    isPremium,
    premiumDetails,
  } = post || {};
  const route = useRouter();

  const { name, profilePhoto } = (user as IUser) || {};

  const { user: loggedInUser } = useUser();

  const {
    mutate: handleUpdateLike,
    isPending: createPostPending,
    isSuccess,
  } = useUpdatePostLike();

  const liked = likes?.user?.some(
    (u) => String(u) == String(loggedInUser?._id)
  );

  const onSubmitLikes = (id: string) => {
    if (!loggedInUser?.role) {
      route.push("/login");
      return;
    }
    handleUpdateLike({ postId: id });
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

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    mutate: handleAddComment,
    isPending,
    isSuccess: isAddCommentSuccess,
  } = useAddPostComment();
  const [commentsText, setComments] = useState("");

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
    console.log("comment", userComment);
    handleAddComment(userComment);
  };
  useEffect(() => {
    if (!isPending && isAddCommentSuccess) {
      setComments("");
    }
  }, [isAddCommentSuccess]);

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
                <p className="flex items-center gap-1 text-xs">
                  <Calendar width={14} />
                  {timeDiff(createdAt)}
                </p>
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
                    <div
                      className="flex items-center space-x-1 cursor-pointer"
                      onClick={() => onSubmitLikes(_id)}
                    >
                      {liked ? (
                        <AiFillHeart className="text-red-600" size={24} />
                      ) : (
                        <AiOutlineHeart
                          className="hover:text-red-600"
                          size={24}
                        />
                      )}
                      <span className="dark:text-gray-400">{likes?.count}</span>
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
                              comments?.comment?.map((comment, index) => (
                                <div
                                  key={index}
                                  className="flex items-center my-2 bg-default-50 rounded-lg "
                                >
                                  {/* <span className="me-3"><Avatar isBordered radius="full" size="md" src={comment?.user?.profilePhoto} ></Avatar></span>
                  <p>{comment?.text}</p> */}
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
                </Modal>
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
                    <p className="flex items-center gap-1 text-xs">
                      <Calendar width={14} />
                      {timeDiff(createdAt)}
                    </p>
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
                  <p className="flex items-center gap-1 text-xs">
                    <Calendar width={14} />
                    {/* {format(new Date(dateFound), "dd MMM, yyyy")} */}
                    {timeDiff(createdAt)}
                  </p>
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
                <div
                  className="flex items-center space-x-1 cursor-pointer"
                  onClick={() => onSubmitLikes(_id)}
                >
                  {liked ? (
                    <AiFillHeart className="text-red-600" size={24} />
                  ) : (
                    <AiOutlineHeart className="hover:text-red-600" size={24} />
                  )}
                  <span className="dark:text-gray-400">{likes?.count}</span>
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
                          comments?.comment?.map((comment, index) => (
                            <div
                              key={index}
                              className="flex items-center my-2 bg-default-50 rounded-lg "
                            >
                              {/* <span className="me-3"><Avatar isBordered radius="full" size="md" src={comment?.user?.profilePhoto} ></Avatar></span>
                            <p>{comment?.text}</p> */}
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
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
}
