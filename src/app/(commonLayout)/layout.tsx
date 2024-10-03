import { Navbar } from "../../components/page/shared/navbar";


export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main  className="px-[2%]">{children}</main>
    </div>
  );
}
