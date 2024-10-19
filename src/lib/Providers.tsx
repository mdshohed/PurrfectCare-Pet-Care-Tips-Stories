"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import UserProvider from "@/context/user.provider";
import { Provider } from "react-redux";
// import { store } from "@/redux/store";
import { Toaster } from "sonner";

// const queryClient = useQueryClient(); 

// // queryClient.invalidateQueries(["GET_PROFILE"])

export const queryClient = new QueryClient();


function Providers({ children }: { children: React.ReactNode }) {

  return (
    // <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
              {children}
              <Toaster richColors></Toaster>
            </NextThemesProvider>
          </NextUIProvider>
        </UserProvider>
      </QueryClientProvider>
    // </Provider>
  );
}

export default Providers;
