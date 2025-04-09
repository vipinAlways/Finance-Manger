"use client";

import React, { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { BudgetName } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const AddAmount = () => {
  const [budgetFor, setBudgetFor] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [budgetName, setBudgetName] = useState<BudgetName[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const AddBudget = async ({
    budgetFor,
    amount,
    startDate,
    endDate,
  }: {
    budgetFor: string;
    amount: number;
    startDate: Date;
    endDate: Date;
  }) => {
    try {
      const response = await fetch("/api/post-amount", {
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

      if (!response.ok) {
        throw new Error("Failed to add budget. Server responded with an error.");
      }

      return await response.json();
      
    } catch (error) {
      console.error("Error while adding budget:", error);
      throw error;
    }
  };

  const { mutate } = useMutation({
    mutationFn: AddBudget,
    onSuccess: () => {
      toast({
        title: "Budget Added",
        description: `Your budget has been added for`,
      });

      setAmount(0);
      setStartDate(null);
      setEndDate(null);
      setBudgetFor("");
      queryClient.invalidateQueries({queryKey: ["get-budget"]});
      queryClient.invalidateQueries({queryKey: ["get-budgetName"]});
    },
    onError: () => {
      toast({
        title: "Error",
        description: "An error occurred while adding the budget.",
        variant: "destructive",
      });
    },
  });
  const getBudgetNames = async () => {
    try {
      const response = await fetch("/api/get-budgetname");
      const result = await response.json();
      if (result.ok && Array.isArray(result.budgetNames)) {
        return result.budgetNames
      } else {
        console.error("Unexpected API response structure for budget names");
        return []
      }
    } catch (error) {
      console.error("Error fetching budget names:", error);
      return []
    }
  };

  const  {data=[]} = useQuery({
    queryKey: ["get-budgetname"],
    queryFn: async () => getBudgetNames(),
  })

  // useEffect(() => {
  //  setBudgetNaem(data)
    
  // }, [data]);

  return (
    <div className="w-full h-full flex items-center py-4 px-2 bg-green-500 rounded-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate({ budgetFor, amount, startDate: startDate!, endDate: endDate! });
        }}
        className="flex flex-col items-center justify-around h-full w-full gap-4"
      >
        <div className="flex items-center gap-4 text-lg text-zinc-200 justify-around w-full">
          <label className="text-wrap w-20 text-center" htmlFor="budgetFor">
            Type
          </label>
          <select
            name="budgetFor"
            value={budgetFor}
            onChange={(e) => setBudgetFor(e.target.value)}
            className="w-48 h-9 bg-zinc-100 text-zinc-800 rounded-lg px-3"
          >
            <option value="" disabled>
              Select an option
            </option>
            {data.map((bud:BudgetName, index:number) => (
              <option key={index} value={bud.nameOfCategorey}>
                {bud.nameOfCategorey}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2 text-lg text-zinc-200 justify-around w-full">
          <label className="text-wrap w-20 text-center" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-48 h-9 bg-zinc-100 text-zinc-800 rounded-lg px-3"
            placeholder="Enter budget"
          />
        </div>
        <div className="flex items-center gap-4 text-xl text-zinc-200 justify-around w-full">
          <label className="text-wrap w-20 text-center" htmlFor="startDate">
            From:
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={startDate ? startDate.toISOString().split("T")[0] : ""}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            className="w-48 h-9 bg-zinc-100 text-zinc-500 rounded-lg px-3"
          />
        </div>
        <div className="flex items-center gap-4 text-xl text-zinc-200 justify-around w-full">
          <label className="text-wrap w-20 text-center" htmlFor="endDate">
            To:
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={endDate ? endDate.toISOString().split("T")[0] : ""}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            className="w-48 h-9 bg-zinc-100 text-zinc-500 rounded-lg px-3"
          />
        </div>
        <Button type="submit" className="w-32 p-1 text-xl">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddAmount;
