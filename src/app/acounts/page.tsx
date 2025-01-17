"use client";
import AddAmount from "@/components/AddAmount";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export interface AmountGet {
  budgetFor: string;
  startDate: Date;
  amount: number;
  endDate: Date;
  _id?:string
}
const Page = () => {
  const [budget, setBudget] = useState<AmountGet[]>([
    {
      budgetFor: "",
      amount: 0,
      endDate: new Date(),
      startDate: new Date(),
    },
  ]);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const getbudgets = async () => {
      try {
        const response = await fetch("/api/get-amount");
        const result = await response.json();

        if (Array.isArray(result.amount)) {
          setBudget(result.amount);
        } else {
          console.log("some error while fetching in array checking");
        }
      } catch (error) {
        console.log("error in client ", error);
      }
    };

    getbudgets();
  }, []);
  return (
    <div className="h-full w-full relative py-3 flex ">
      <aside className="h-[30rem] border w-36 p-1 sticky top-2 flex flex-col items-center justify-between">
        <h1 className="w-full text-lg bg-zinc-600 text-center rounded-lg text-green-100 ">
          Your budgets
        </h1>
        
        <div className="h-96 w-full flex flex-col items-center">
        {budget.length > 0 &&
              budget.map((bud, index) => (
                <Link href={`/amounts/${bud._id}`} key={bud.budgetFor + index} className="text-xl cursor-pointer">{bud.budgetFor}</Link>
              ))}
        </div>

        <Button
          className="text-sm p-1  w-full"
          onClick={() => setHidden(hidden ? false : true)}
        >
          Another budget
        </Button>
      </aside>
      {!hidden && (
        <div className="w-4/5 absolute top-1/2 left-[55%] h-full -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-50 bg-opacity-10  bg-green-600">
          <div className="w-96 h-[25rem] mx-4">
            <AddAmount />
          </div>
        </div>
      )}
      <div className="w-full h-[30rem] flex items-center justify-center text-5xl">
      <h1>Your Budget</h1>
      </div>
    </div>
  );
};

export default Page;
