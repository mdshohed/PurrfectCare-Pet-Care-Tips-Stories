import * as React from "react";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import UserProvider from "@/context/user.provider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </UserProvider>
  );
}

export default Providers;
