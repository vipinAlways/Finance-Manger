"use client";
import AddTransaction from "@/components/AddTransaction";
import TransactionTable from "@/components/TransactionTable";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

function page() {
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

    const toggleScroll = () => {
      if (block) {
        window.addEventListener("scroll", preventDefault, { passive: false });
        window.addEventListener("wheel", preventDefault, { passive: false });
        window.addEventListener("touchmove", preventDefault, {
          passive: false,
        });
      } else {
        window.removeEventListener("scroll", preventDefault);
        window.removeEventListener("wheel", preventDefault);
        window.removeEventListener("touchmove", preventDefault);
      }
    };

    toggleScroll();
  }, [block]);

  return (
    <div className="">
      <div className="flex justify-end w-full mt-4 ">
        <Button onClick={onclick}>Add Transaction</Button>
      </div>
      <div className="w-full  ">
        <AddTransaction className={block ? `` : "hidden"} />
      </div>

      <div className="w-full h-full  ">
        {loading ? (
          <div className="flex justify-center items-center space-x-2">
            <div
              className="w-4 h-4 bg-green-500 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-4 h-4 bg-green-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-4 h-4 bg-green-500 rounded-full animate-bounce"
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

export default page;
