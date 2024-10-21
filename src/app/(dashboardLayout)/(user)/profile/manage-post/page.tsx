"use client";

import { DeleteIcon, EditIcon } from "@/assets/icons";
import { useDeletePost, useGetAllPosts, useGetMyPosts, useGetPremiumPosts } from "@/hooks/post.hook";
import { IPost } from "@/types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function ManagePost() {
  const route = useRouter(); 
  const {
    data: posts,
    isLoading: postLoading,
    isSuccess: postSuccess,
  } = useGetMyPosts();
  const {
    mutate: deletePost,
    // isLoading: postLoading,
    // isSuccess: postSuccess,
  } = useDeletePost();

  const handleUpdate = (id: string) => {
    route.push(`/profile/update-post?postId=${id}`)
  };
  
  const handleDelete = (id: string) => {
    deletePost(id); 
  };

  return (
    <div className=" min-h-screen w-full rounded-md bg-default-100 p-5">
      <h1 className="text-xl py-1">Manage Premium Post</h1>
      <hr className="my-2 border-purple-500 mb-4" />

      <div>
        <Table aria-label="Example empty table">
          <TableHeader>
            <TableColumn>Title</TableColumn>
            <TableColumn>Category</TableColumn>
            <TableColumn>Premium</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No rows to display."}>
            {posts?.data?.map((post: IPost) => (
              <TableRow key={post._id}>
                {/* {(columnKey) => <TableCell>{getKeyValue(post, columnKey)}</TableCell>} */}
                <TableCell>
                  <div className="flex flex-col">
                    <p className="text-bold text-sm capitalize">{post.title}</p>
                    <p
                      className="text-bold text-sm capitalize text-default-400 line-clamp-1"
                      dangerouslySetInnerHTML={{
                        __html: post.description.slice(0, 20),
                      }}
                    ></p>
                  </div>
                </TableCell>
                <TableCell>{post.category.name}</TableCell>
                <TableCell>
                  {post?.isPremium ? (
                    <Chip
                      className="capitalize"
                      color="success"
                      size="sm"
                      variant="flat"
                    >
                      {"YES"}
                    </Chip>
                  ) : (
                    <Chip
                      className="capitalize"
                      color="default"
                      size="sm"
                      variant="flat"
                    >
                      {"No"}
                    </Chip>
                  )}
                </TableCell>
                <TableCell>
                  {post?.premiumDetails?.isPending ? (
                    <Chip
                      className="capitalize"
                      color="danger"
                      size="sm"
                      variant="flat"
                    >
                      {"Pending"}
                    </Chip>
                  ) : (
                    <Chip
                      className="capitalize"
                      color="success"
                      size="sm"
                      variant="flat"
                    >
                      {"Accepted"}
                    </Chip>
                  )}
                </TableCell>
                <TableCell>
                  <div className="">
                     <Button
                    color="primary"
                    className="mx-1"
                    onClick={() => handleUpdate(post._id)}
                    size="sm"
                  >
                    <EditIcon ></EditIcon>
                  </Button>

                  <Button
                    color="danger"
                    onClick={() => handleDelete(post._id)}
                    size="sm"
                  >
                    <DeleteIcon></DeleteIcon>
                  </Button>
                  </div>
                 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
