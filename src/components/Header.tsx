import React from "react";
import HeaderLogo from "./HeaderLogo";
import Navbar from "./Navbar";
import AuthButtons from "./AuthButtons";
import { cn } from "@/lib/utils";
import WelcomeMsg from "./WelcomeMsg";



function Header() {
  return (
    <header
      className={cn(
        "bg-gradient-to-b from-green-700 to-green-300 px-4 py-4 lg:px-14 h-fit z-50 md:sticky top-0 w-full overflow-hidden "
      )}
    >
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-6">
          <div className="flex items-center lg:gap-16">
            <HeaderLogo />
            <Navbar />
          </div>
          <div className="flex justify-center items-center">
            <AuthButtons />
          </div>
        </div>
        <div className="flex items-center justify-between w-full ">
          <WelcomeMsg className="" />
          
        </div>
      </div>
    </header>
  );
}

export default Header;
