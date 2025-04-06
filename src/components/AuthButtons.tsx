"use client";

import React from "react";
import { Button } from "./ui/button";
import { LogoutLink, LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Loader2 } from "lucide-react";

function AuthButtons() {
  const { user, isLoading } = useKindeBrowserClient(); 

  if (isLoading) return <Loader2 className="animate-spin"/>; 

  return (
    <div className="flex justify-center items-center">
      {user ? (
        <div>
          <Button>
            <LogoutLink>Log out</LogoutLink>
          </Button>
        </div>
      ) : (
        <div className="flex justify-center items-center gap-2">
          <Button>
            <LoginLink className="p-2 text-base" >Sign in</LoginLink>
          </Button>
          <Button>
            <RegisterLink className="p-2 text-base">Sign up</RegisterLink>
          </Button>
        </div>
      )}
    </div>
  );
}

export default AuthButtons;
