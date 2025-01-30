"use client";
import React, { useState } from "react";
import NavButton from "./NavButton";
import { usePathname, useRouter } from "next/navigation";
import { useMedia } from "react-use";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const routes = [
  { href: "/dashboard", label: "Overview" },
  { href: "/transaction", label: "Transactions" },
  { href: "/acounts", label: "Acounts" },
  { href: "/categories", label: "Categories" },
];
function Navbar() {
  const [isOpen, setIsopen] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  const isMobile = useMedia("(max-width:1024px)", false);

  return (
    <div>
      <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto ">
        {routes.map((route) => (
          <NavButton
            key={route.href}
            href={route.href}
            label={route.label}
            isActive={pathName === route.href}
          />
        ))}
      </nav>
      <Sheet >
        <SheetTrigger className="text-zinc-100">
          <Menu />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>FINANCE MENAGER</SheetTitle>
            <nav className='flex flex-col gap-y-2 pt-6'>
                {routes.map((route)=>(
                    <Link  key={route.href} href={route.href} className='w-full justify-start'>
                      {route.label}
                    </Link>
                ))}
              </nav>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Navbar;
