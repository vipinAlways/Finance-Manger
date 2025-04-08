"use client";
import BarGraph from "@/components/BarGraph";
import CardData from "@/components/CardData";
import PieGraph from "@/components/PieGraph";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Home() {
  const [from, setFrom] = useState("");
  const { toast } = useToast();

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

        if (data.success) {
          toast({
            title: "Enjoy",
            description: <div className="text-orange-500">Your Day</div>,
          });
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
  }, [toast]);

  
  const getAmount = async () => {
    try {
      const response = await fetch(`/api/get-amount`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result && Array.isArray(result.budgetCurrent)) {
        return result.budgetCurrent;
      } else {
        console.error("Unexpected API response structure for amounts");
        return [];
      }
    } catch (error) {
      console.error("Error fetching amounts:", error);
      return [];
    }
  };
  const { data = [] } = useQuery({
    queryKey: ["get-amount"],
    queryFn: async () => getAmount(),
  });
console.log(data);
  return (
    <div className="w-full flex flex-col gap-1 py-3">
      <div className="w-full flex flex-col items-center gap-2 h-fit">
        <div className="flex items-center justify-evenly w-full gap-4 max-xl:flex-col">
          <div className="w-fit py-5 px-2 h-fit flex items-end max-md:items-center max-md:justify-center">
            <select
              name="from"
              id="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="xl:w-56 w-40 h-10 border border-gray-300 rounded-md px-2 py-1 capitalize"
            >
              <option value="">All</option>
              {data !== undefined &&
                data.map((name:any, i: number) => (
                  <option value={name.budgetFor} key={i}>
                    {name.budgetFor}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex items-center  w-full flex-wrap h-full">
            <CardData forWhich={from} />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-5 w-full justify-center max-lg:flex-col xl:mt-5 max-md:gap-3 max-sm:gap-1">
        <div className="flex items-center flex-col max-sm:w-80 w-full">
          <div className="w-[55vw] max-lg:w-[90%] max-sm:w-full mt-2 flex items-center justify-center md:p-3 rounded-xl p-2 bg-gradient-to-tr from-green-500 via-green-200 to-green-400  lg:h-[55vh] h-96 max-sm:h-60">
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
              className="h-[55vh] max-md:h-80 flex flex-col p-3 max-lg:w-[90%] lg:w-96 max-sm:w-[95%] justify-center rounded-xl items-start bg-gradient-to-tr from-green-800 via-green-300 to-green-500 "
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
