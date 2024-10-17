import Container from "@/components/page/shared/Container";
import PublicSidebar from "@/components/UI/PublicSidebar";
import { ReactNode } from "react";

export default function layout({
  children,
  recentPosts,
}: {
  children: ReactNode;
  recentPosts: ReactNode;
}) {
  return (
    <Container>
      {children}
      <div className="my-2 flex w-full gap-4">
        <div className="md:w-4/5 w-full">{recentPosts}</div>
        <div className="md:w-2/6 hidden md:block">
          <PublicSidebar />
        </div>
      </div>
    </Container>
  );
}
