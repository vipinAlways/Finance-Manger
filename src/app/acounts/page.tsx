"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

interface AmountGet {
  budgetFor: string;
  startDate: Date;
  amount: number;
  endDate: Date;
}
const page = () => {
  const [budget, setBudget] = useState<AmountGet[]>([
    {
      budgetFor: "",
      amount: 0,
      endDate: new Date(),
      startDate: new Date(),
    },
  ]);

  useEffect(()=>{
    const getbudgets = async ()=>{
     try {
      const response = await fetch("/api/get-amount")
      const result = await response.json()

      if (Array.isArray(result.amount)) {
        setBudget(result.amount)
      }else{
        console.log('some error while fetching in array checking');
      }
     } catch (error) {
        console.log("error in client ",error);
     }
    }

    getbudgets()
  })
  return (
    <div className="h-full w-full relative py-3">
      <aside className="h-[30rem] border w-36 p-1 sticky top-2 flex flex-col items-center justify-between">
          <h1 className="w-full text-lg bg-zinc-600 text-center rounded-lg text-green-100 ">Your budgets</h1>
        {
          budget.length > 0 && budget.map((bud,index)=><h1 key={bud.budgetFor + index}>{bud.budgetFor}</h1>)
        }

        <Button className="text-sm p-1  w-full">
          Another budget
        </Button>
      </aside>
    </div>
  );
};

export default page;
