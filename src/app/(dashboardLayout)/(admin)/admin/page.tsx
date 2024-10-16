'use client'
import { useGetAllPayments } from "@/hooks/payment.hook";
import { useGetAllPosts, useGetPremiumPosts } from "@/hooks/post.hook";
import { useGetAllUsers } from "@/hooks/user.hook";
import { Card, CardBody, CardFooter } from "@nextui-org/card";

export default function DashboardPage() {
  const {data: posts} = useGetAllPosts();
  const {data: users} = useGetAllUsers();
  const {data: premiums} = useGetPremiumPosts();
  const {data: transactions} = useGetAllPayments(); 

  return (
    <div className="min-h-screen w-full p-5 rounded-md bg-default-100">
      <h1 className="text-2xl py-10 text-center bg-[#dcfce7] dark:bg-gray-700 rounded-lg my-2 shadow-sm">
        {" "}
        Welcome to PurrfeectCare - Get Tips and Stories
      </h1>
      <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <Card key={1} className="py-5">
          <CardBody className="overflow-visible p-0">
            <p className="text-2xl mx-auto">{posts?.data.length}</p>
          </CardBody>
          <CardFooter className="text-small justify-between">
            <p className="text-default-500 mx-auto">Total Post</p>
          </CardFooter>
        </Card>
        <Card key={2} className="py-5">
          <CardBody className="overflow-visible p-0">
            <p className="text-2xl mx-auto">{premiums?.data.length}</p>
          </CardBody>
          <CardFooter className="text-small justify-between">
            <p className="text-default-500 mx-auto">Total Premium Posts</p>
          </CardFooter>
        </Card>
        <Card key={3} className="py-5">
          <CardBody className="overflow-visible p-0">
            <p className="text-2xl mx-auto">{users?.data.length}</p>
          </CardBody>
          <CardFooter className="text-small justify-between">
            <p className="text-default-500 mx-auto">Total Users</p>
          </CardFooter>
        </Card>
        <Card key={4} className="py-5">
          <CardBody className="overflow-visible p-0">
            <p className="text-2xl mx-auto">{transactions?.length}</p>
          </CardBody>
          <CardFooter className="text-small justify-between">
            <p className="text-default-500 mx-auto">Total Transaction</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
