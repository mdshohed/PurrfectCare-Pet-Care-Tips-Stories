import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "PurrfectCare - Pet Care",
  description: "PurrfectCare - Pet care tips and stories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <div className="mx-auto container">
            {children}
        </div>
      
      </body>
    </html>
  );
}
