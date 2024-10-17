import { ReactNode } from "react";

import Container from "@/components/UI/Container";
import Sidebar from "@/components/UI/Sidebar";
import { Navbar } from "@/components/page/shared/navbar";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar></Navbar>
      <Container>
        <div className="my-3 flex flex-col md:flex-row w-full gap-4">
          <div className="min-w-[300px]">
            <Sidebar />
          </div>
          <div className="w-full">{children}</div>
        </div>
      </Container>
    </div>
  );
}
