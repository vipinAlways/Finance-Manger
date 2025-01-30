"use client";
import React from "react";
import NavButton from "./NavButton";
import { usePathname} from "next/navigation";
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
  const pathName = usePathname();

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
      <Sheet>
        <SheetTrigger className="text-zinc-100">
          <Menu />
        </SheetTrigger>
        <SheetContent side={"left"} className="w-60 bg-zinc-800 text-zinc-100">
          <SheetHeader>
            <SheetTitle>FINANCE MENAGER</SheetTitle>
            <nav className="flex flex-col gap-y-2 pt-6">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="w-full justify-start hover:bg-zinc-600 p-1.5 rounded-lg"
                >
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
