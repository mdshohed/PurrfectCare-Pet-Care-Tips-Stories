"use client";

import { useGetAllPayments } from "@/hooks/payment.hook";
import { IPayment } from "@/types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
} from "@nextui-org/react";

export default function ManagePayment() {
  const {data, isLoading, isSuccess} = useGetAllPayments(); 

  return (
    <div className=" min-h-screen w-full rounded-md bg-default-100 p-5">
      <h1 className="text-xl py-1">All Payments</h1>
      <hr className="my-2 border-purple-500 mb-4" />

      <div>
        <Table aria-label="Example empty table">
          <TableHeader>
            <TableColumn>user</TableColumn>
            <TableColumn>postId</TableColumn>
            <TableColumn>transactionId</TableColumn>
            <TableColumn>paidAmount</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No rows to display."}>
            {data?.map((payment: IPayment) => (
              <TableRow key={payment._id}>
                {/* {(columnKey) => <TableCell>{getKeyValue(post, columnKey)}</TableCell>} */}
                <TableCell>
                  <User
                    avatarProps={{ radius: "lg", src: payment?.userId?.profilePhoto }}
                    description={payment.userId.email}
                    name={payment.userId.name}
                  >
                  </User>
                </TableCell>
                <TableCell>{payment?.postId?._id}</TableCell>
                <TableCell>{payment?.transactionId}</TableCell>
                <TableCell>{payment?.paidAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
