
import AmountSideBar from "@/components/AmountSideBar";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="">
      <div className="flex w-full relative h-full">
        <div className="relative h-full">
          <AmountSideBar/>
        </div>

        <div className="flex h-full flex-1 flex-col min-h-screen ">
          {children}
        </div>
      </div>
    </main>
  );
};

export default layout;