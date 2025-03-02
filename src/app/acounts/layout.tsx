import AmountSideBar from "@/components/AmountSideBar";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="">
      <div className="flex w-full relative h-full flex-1 gap-6">
        <AmountSideBar />
        <div className="flex h-fit flex-1 flex-col min-h-screen">
          {children}
        </div>
      </div>
    </main>
  );
};

export default layout;
