"use client";

import { DeleteIcon } from "@/assets/icons";
import { useGetAllPayments } from "@/hooks/payment.hook";
import { useGetAllUsers } from "@/hooks/user.hook";
import { IPayment, IUser } from "@/types";
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
import React, { useEffect, useState } from "react";

export default function ManagePayment() {
  const { data: users, isLoading, isSuccess } = useGetAllUsers();

  const columns = [
    { name: "NAME", uid: "name" },
    { name: "ROLE", uid: "role" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const handleUpdateUser = (id: string) => {
    console.log("id", id);
  };

  return (
    <div className=" min-h-screen w-full rounded-md bg-default-100 p-5">
      <h1 className="text-xl py-1">Manage All Users</h1>
      <hr className="my-2 border-purple-500 mb-4" />

      <div>
        <Table aria-label="Example empty table">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                // align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No rows to display."}>
            {users?.data?.map((user: IUser) => (
              <TableRow key={user?._id}>
                <TableCell>
                  <User
                    avatarProps={{ radius: "lg", src: user?.profilePhoto }}
                    description={user.email}
                    name={user?.name}
                  >
                    {user.email}
                  </User>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <p className="text-bold text-sm capitalize text-default-400">
                      {user.role}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip
                    className="capitalize"
                    color={user?.status ? "success" : "danger"}
                    size="sm"
                    variant="flat"
                  >
                    {user?.status}
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    {true === true ? (
                      <Button
                        color="danger"
                        onClick={() => handleUpdateUser("id")}
                        size="sm"
                      >
                        {"Block"}
                      </Button>
                    ) : (
                      <Button color="success" size="sm">
                        {"UnBlock"}
                      </Button>
                    )}
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
