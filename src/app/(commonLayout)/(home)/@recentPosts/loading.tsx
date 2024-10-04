import { Button } from "@nextui-org/button";
import Link from "next/link";

import Container from "@/components/UI/Container";
import CardSkeleton from "@/components/UI/CardSkeleton";

export default async function RecentPosts() {
  return (
    <Container>
      <div className="my-8 grid justify-center gap-10 sm:grid-cols-1">
        {[...Array(9)]?.map(() => (
          <CardSkeleton />
        ))}
      </div>
      <div className="flex justify-center">
        <Button className="rounded-md bg-default-900 text-default" size="md">
          <Link href="/found-items">See All</Link>
        </Button>
      </div>
    </Container>
  );
}
