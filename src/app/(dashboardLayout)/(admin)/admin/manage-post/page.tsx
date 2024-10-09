"use client";

import { DeleteIcon } from "@/assets/icons";
import { useGetPremiumPosts } from "@/hooks/post.hook";
import { getPremiumPosts } from "@/services/post";
import { IPost } from "@/types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  User,
  Chip,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

export default async function ManagePost() {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await getPremiumPosts();
      console.log("data", data);

      setPosts(data);
    }
    fetchPosts();
  }, []);

  const handleUpdate = (id: string) => {
    console.log(id);
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
            <TableColumn>Fee</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No rows to display."}>
            {posts?.map((post: IPost) => (
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
                <TableCell>${post?.premiumDetails?.subscriptionFee}</TableCell>

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
                {
                  post?.premiumDetails?.isPending ? (
                    <Button color="danger" onClick={()=>handleUpdate(post._id)} size="sm">{"Unpublished"}</Button>
                  ) : (
                    <Button color="success" size="sm">{"Published"}</Button>

                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
