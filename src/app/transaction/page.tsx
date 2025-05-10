"use client";
import TransactionTable from "@/components/TransactionTable";
import React, { useEffect, useState } from "react";


function Page() {
  const [block, setBlock] = useState(false);
  const [loading, setLoading] = useState(true);

  const onclick = () => {
    if (block) setBlock(false);
    setBlock(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const preventDefault = (e: Event) => {
      e.preventDefault();
    };

  }, [block]);

  return (
    <div className="max-lg:p-4 flex flex-col gap-2">
      

      <div className="w-full h-full py-5">
        {loading ? (
          <div className="flex justify-center items-center space-x-2">
            <div
              className="w-4 h-4 bg-[#2ecc71] rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-4 h-4 bg-[#2ecc71] rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-4 h-4 bg-[#2ecc71] rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        ) : (
          <TransactionTable />
        )}
      </div>
    </div>
  );
}

export default Page;
