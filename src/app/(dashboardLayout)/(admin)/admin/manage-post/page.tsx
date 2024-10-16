"use client";

import { DeleteIcon } from "@/assets/icons";
import { useGetAllPosts, useGetPremiumPosts } from "@/hooks/post.hook";
import { getPremiumPosts } from "@/services/post";
import { IPost } from "@/types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Button,
} from "@nextui-org/react";

export default function ManagePost() {
  const { data: posts, isLoading, isSuccess } = useGetAllPosts();

  const handleDelete = (id: string) => {
  };

  return (
    <div className=" min-h-screen w-full rounded-md bg-default-100 p-5">
      <h1 className="text-xl py-1">Manage Premium Post</h1>
      <hr className="my-2 border-purple-500 mb-4" />

      <div>
        <Table aria-label="Example empty table">
          <TableHeader>
            <TableColumn>User</TableColumn>
            <TableColumn>Category</TableColumn>
            <TableColumn>Title</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No rows to display."}>
            {posts?.data?.map((post: IPost) => (
              <TableRow key={post._id}>
                {/* {(columnKey) => <TableCell>{getKeyValue(post, columnKey)}</TableCell>} */}
                <TableCell>
                  <User
                    avatarProps={{ radius: "lg", src: post.user.profilePhoto }}
                    description={post.user.email}
                    name={post.user.name}
                  >
                    {/* {post.user.email} */}
                  </User>
                </TableCell>
                <TableCell>{post.category.name}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <p className="text-bold text-sm capitalize">{post.title}</p>
                    <p
                      className="text-bold text-sm capitalize text-default-400"
                      dangerouslySetInnerHTML={{
                        __html: post.description.slice(0, 20),
                      }}
                    ></p>
                  </div>
                </TableCell>

                <TableCell>
                  {
                  post?.premiumDetails?.isPending ? (
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
                
                    <Button color="danger" onClick={()=>handleDelete(post._id)} size="sm"><DeleteIcon></DeleteIcon></Button>
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
