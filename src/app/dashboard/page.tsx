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
    let isMounted = true;

    const getAmount = async () => {
      try {
        const response = await fetch(`/api/get-amount`);

        if (!response.ok) {
          throw new Error(
            `API error: ${response.status} ${response.statusText}`
          );
        }

        const result = await response.json();

        if (result && Array.isArray(result.budgetCurrent)) {
          if (isMounted) setGetAmountFor(result.budgetCurrent);
        } else {
          console.error("Unexpected API response structure for amounts");
        }
      } catch (error) {
        console.error("Error fetching amounts:", error);
      }
    };

    getAmount();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <div className="relative w-full py-4 flex flex-col items-center gap-4">
        <div className="flex items-center justify-evenly w-full gap-4 max-xl:flex-col h-fit">
          <div className="w-fit py-5 px-2 h-fit flex items-end max-md:items-center max-md:justify-center">
            <select
              name="from"
              id="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="xl:w-56 w-40   h-10 border border-gray-300 rounded-md px-2 py-1 capitalize"
            >
              <option value="">All</option>2
              {getAmountFor.map((amount, index) => (
                <option value={amount.budgetFor} key={index}>
                  {amount.budgetFor}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center  w-full flex-wrap">
            <CardData forWhich={from} />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-5 w-full justify-around max-lg:flex-col xl:mt-5 h-96 max-md:gap-3">
        <div className="flex items-center flex-col max-sm:w-80 gap-1 w-full">
          <div className="w-[55vw] max-lg:w-[90%] max-sm:w-full mt-2 flex flex-col md:p-3 rounded-xl p-2   bg-gradient-to-tr from-green-500 via-green-200 to-green-400  lg:h-[55vh] h-96 max-sm:h-60">
            <BarGraph forWhich={from} />
          </div>
          <h1 className="text-2xl max-sm:text-xl text-slate-700 text-center">
            Your Transaction via graph
          </h1>
        </div>
        <div className="p-4 flex justify-center items-center w-full">
          <div className="flex flex-col w-full items-center justify-center h-full lg:text-xl max-md:text-lg max-sm:text-sm">
            <Link
              href="/categories"
              className="h-[55vh] max-md:h-80 flex flex-col p-3 max-lg:w-[90%] max-sm:w-[95%] justify-center rounded-xl items-start bg-gradient-to-tr from-green-800 via-green-300 to-green-500 "
            >
              <PieGraph forWhich={from} />
            </Link>
            <h1 className="text-center text-2xl max-sm:text-xl text-slate-700">
              Chart Category Wise
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
