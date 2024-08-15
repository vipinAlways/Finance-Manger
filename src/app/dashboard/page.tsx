"use client";
import BarGraph from "@/components/BarGraph";
import CardData from "@/components/CardData";
import PieGraph from "@/components/PieGraph";
import Link from "next/link";
import React, { useEffect } from "react";

function page() {
  useEffect(() => {
    const postUser = async () => {
      try {
        let response = await fetch("/api/post-user", {
          method: "POST",
        });
        response = await response.json();
        console.log(response);
        if (response.ok) {
          console.log("Transaction added successfully");
        } else {
          console.error("Failed to add transaction:", response);
        }
      } catch (error) {
        console.error("Error while adding transaction:", error);
      }
    };

    postUser();
  }, []);

  return (
    <div className="lg:flex-row flex flex-col items-center gap-2 flex-1 ">
      <div className="w-[55vw] mt-2 flex flex-col p-3 rounded-xl  bg-gradient-to-tr from-green-500 via-green-200 to-green-400">
        <h1 className="text-center w-full mb-1 lg:text-xl max-md:text-lg max-sm:text-sm text-white">
          Your transaction
        </h1>
        <BarGraph />
      </div>
        <div className=" flex justify-evenly items-center max-sm:w-full lg:gap-2 md:gap-3 max-md:w-full">
        <div className="flex flex-col ">
          <CardData />
        </div>
        <div className="flex flex-col h-full gap-5 lg:text-xl max-md:text-lg max-sm:text-sm">
          <h1 className="text-center Quick">Chart Category Wise</h1>
          <Link
            href="/category"
            className="h-[50vh]  flex flex-col p-3  justify-between rounded-xl items-start  bg-gradient-to-tr from-green-800 via-green-300 to-green-500"
          >
            <PieGraph />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;
