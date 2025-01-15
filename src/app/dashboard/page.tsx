"use client";
import BarGraph from "@/components/BarGraph";
import CardData from "@/components/CardData";
import PieGraph from "@/components/PieGraph";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function home() {
  const [budget,setBudget]= useState<[]>([])
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

  
  console.log(budget);

  return (
    <div className="lg:flex-row flex  justify-around items-center gap-2 flex-1 relative ">
      <div className="flex items-center flex-col gap-1">
        <div className="w-[50vw] mt-2 flex flex-col p-3 rounded-xl  bg-gradient-to-tr from-green-500 via-green-200 to-green-400 lg:mt-20 h-[55vh]">
          <BarGraph />
        </div>
        <h1 className="text-2xl text-slate-700">Your Transaction via graph</h1>
      </div>
      <div className=" flex justify-evenly items-center max-sm:w-full lg:gap-2 md:gap-3 max-md:w-full">
        <div className="flex flex-col ">
          <CardData/>
        </div>
        <div className="flex flex-col  h-full lg:text-xl max-md:text-lg max-sm:text-sm">
          <Link
            href="/categories"
            className="h-[55vh] flex flex-col p-3 justify-between rounded-xl items-start bg-gradient-to-tr from-green-800 via-green-300 to-green-500 lg:mt-20"
          >
            <PieGraph />
          </Link>
          <h1 className="text-center text-2xl text-slate-700">Chart Category Wise</h1>
        </div>
      </div>
    </div>
  );
}

export default home;
