"use client";

import React, { useState } from "react";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";

const AddAmount = () => {
  const [budgetFor, setBudgetFor] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const { toast } = useToast();
  const AddBudget = async (e:React.FormEvent) => {
    e.preventDefault()
    try {
      let response = await fetch("/api/post-amount", {
        method: "POST",
        body: JSON.stringify({
          budgetFor,
          amount,
          startDate,
          endDate,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "budgetAdded succesFully",
          description: `Your budet added for ${budgetFor}`,
        });

        
        if (data.ok) {
          setAmount(0);
          setStartDate(new Date());
          setEndDate(new Date());
          setBudgetFor("");
        
        }else{
          throw new Error("error while adding budget client response");
        }
      } else {
        console.log("error while adding budget client response");
      }
    } catch (error) {
      console.log("error while adding budget client ", error);
    }
  };
  return (
    <div className="border w-full h-full flex items-center py-4 px-2 bg-green-500 rounded-xl">
      <form action="POST" onSubmit={AddBudget} className="flex flex-col items-center justify-around h-full w-full">
       <div className="flex items-center gap-4 text-lg text-zinc-200 justify-around w-full">
        <label htmlFor="budgetFor" className="text-wrap">Name of budget</label>
       <input
          type="text"
          name="budgetFor"
          value={budgetFor}
          onChange={(e) => setBudgetFor(e.target.value)}
          className="w-48 h-9 bg-zinc-100 text-zinc-800 rounded-lg px-3 "
          placeholder="Budget for ...."
        />
       </div>
      <div className="flex items-center gap-2 text-lg text-zinc-200 justify-around w-full">
        <label htmlFor="amount" className="text-wrap">budget Amount</label>
      <input
          type="text"
          name="amount"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          className="w-48 h-9 bg-zinc-100 text-zinc-800 rounded-lg px-3 "
          placeholder="Enter budget"
        />
      </div>
      <div className="flex items-center gap-4 text-xl text-zinc-200 justify-around w-full">
      <label htmlFor="startDate">From :</label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          value={startDate ? startDate.toISOString().split("T")[0] : ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(new Date(e.target.value))}
          className="w-48 h-9 bg-zinc-100 text-zinc-500 rounded-lg px-3 "
         
        />
      </div>
      <div className="flex items-center gap-4 text-xl text-zinc-200 justify-around w-full">
        <label htmlFor="endDate">To :</label>
      <input
          type="date"
          name="endDate"
          id="endDate"
          value={endDate ? endDate.toISOString().split("T")[0] : ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(new Date(e.target.value))}
          className="w-48 h-9 bg-zinc-100 text-zinc-500 rounded-lg px-3 "
        />
      </div>
        <Button type="submit" className="w-32 p-1 text-xl">Submit</Button>
      </form>
    </div>
  );
};

export default AddAmount;
