import { Navbar } from "./components/page/shared/navbar";


export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
