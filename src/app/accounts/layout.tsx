import AmountSideBar from "@/components/AmountSideBar";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="">
      <div className="flex w-full relative h-full flex-1 lg:gap-6 ">
        <AmountSideBar />
        <div className="flex h-fit flex-1 flex-col  w-full">
          {children}
        </div>
      </div>
    </main>
  );
};

export default layout;
