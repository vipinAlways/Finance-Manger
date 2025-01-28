"use client";
import BarGraph from "@/components/BarGraph";
import CardData from "@/components/CardData";
import PieGraph from "@/components/PieGraph";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Home() {
  const [getAmountFor, setGetAmountFor] = useState<any[]>([]);
  const [from, setFrom] = useState("");

  useEffect(() => {
    const postUser = async () => {
      try {
        const response = await fetch("/api/post-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("API response:", data);

        if (data.success && data.redirect) {
          window.location.href = data.redirect;
        } else if (data.success) {
          console.log("User added successfully");
        } else {
          console.error("Failed to add user:", data);
        }
      } catch (error) {
        console.error("Error while adding user:", error);
      }
    };

    postUser();
  }, []);

  useEffect(() => {
    const getAmount = async () => {
      try {
        const response = await fetch(`/api/get-amount`);
        const result = await response.json();
        if (result && Array.isArray(result.amount)) {
          setGetAmountFor(result.amount);
        } else {
          console.error("Unexpected API response structure for amounts");
        }
      } catch (error) {
        console.error("Error fetching amounts:", error);
      }
    };

    getAmount();
  }, []);

  return (
    <div className=" flex  flex-col items-center flex-1 relative w-full ">
      <div className="flex items-center justify-evenly w-full h-40 absolute top-0 z-50 -translate-y-20">
        <div className="w-fit py-5 px-2 h-full flex items-end">
          <select
            name="from"
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-56 h-10 border border-gray-300 rounded-md px-2 py-1 capitalize"
          >
            <option value="">All</option>
            {getAmountFor.map((amount, index) => (
              <option value={amount.budgetFor} key={index}>
                {amount.budgetFor}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center w-3/4">
          <CardData forWhich={from} />
        </div>
      </div>
      <div className="flex items-center gap-5 w-full justify-around">
        <div className="flex items-center flex-col  gap-1">
          <div className="w-[50vw] mt-2 flex flex-col p-3 rounded-xl  bg-gradient-to-tr from-green-500 via-green-200 to-green-400 lg:mt-20 h-[55vh]">
            <BarGraph forWhich={from} />
          </div>
          <h1 className="text-2xl text-slate-700">
            Your Transaction via graph
          </h1>
        </div>
        <div className=" flex justify-evenly items-center max-sm:w-full lg:gap-2 md:gap-3 max-md:w-full">
          <div className="flex flex-col  h-full lg:text-xl max-md:text-lg max-sm:text-sm">
            <Link
              href="/categories"
              className="h-[55vh] flex flex-col p-3 justify-between rounded-xl items-start bg-gradient-to-tr from-green-800 via-green-300 to-green-500 lg:mt-20"
            >
              <PieGraph forWhich={from} />
            </Link>
            <h1 className="text-center text-2xl text-slate-700">
              Chart Category Wise
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
