import Container from "@/components/page/shared/Container";
import PublicSidebar from "@/components/UI/PublicSidebar";
import Sidebar from "@/components/UI/Sidebar";
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
      <div className="my-3 flex w-full gap-12">
        <div className="w-4/5">{recentPosts}</div>
        <div className="w-2/5 ">
          <PublicSidebar />
        </div>
      </div>
    </Container>
  );
}
