
export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto max-w-7xl pt-6 px-6 flex-grow">
      {children}
    </div>
  );
}
