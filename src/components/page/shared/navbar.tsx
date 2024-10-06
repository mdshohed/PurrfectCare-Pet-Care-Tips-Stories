"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

import { siteConfig } from "@/config/site";
import NavbarDropdown from "./NavbarDropdown";
// import { Logo } from "@/assets/icons";
import Logo from "@/assets/purrfectcare.png";
// import { useUser } from "@/context/user.provider";
import { ThemeSwitch } from "./theme-switch";
import Image from "next/image";
import SearchFilter from "./SearchFilter";
import { useUser } from "@/context/user.provider";
import { useEffect, useState } from "react";
import { IUser } from "@/types";

export const Navbar = () => {
  const { user, isLoading } = useUser();
  const [ currentUser, setUser] = useState<IUser>({} as IUser) 
  // const user = useAppSelector( (auth)=>auth.auth.user);
  useEffect(()=>{
    if(user){
      setUser(user); 
    }
  },[isLoading])

  const router = useRouter();

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      
     

      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
      {/* <NavbarContent className="sm:hidden basis-1 pl-4" justify="start"> */}
        <NavbarMenuToggle className="sm:hidden basis-1 mr-2"/>
      {/* </NavbarContent> */}
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            {/* <Logo /> */}
            <div>
              <Image src={Logo} alt="Purrfect Care" className="w-[30px] me-4" />
            </div>

            <p className="font-bold text-inherit">PurrfectCare</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden sm:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
      </NavbarContent> */}

      <SearchFilter></SearchFilter>

      <NavbarContent
        className="flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        {currentUser?.email ? (
          <NavbarItem className=" flex gap-2">
            <NavbarDropdown />
          </NavbarItem>
        ) : (
          <NavbarItem className="flex gap-2">
            <Button onClick={() => router.push("/login")}>Login</Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
