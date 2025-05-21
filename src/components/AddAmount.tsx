"use client";

import React, { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { BudgetName } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AmountGet } from "@/app/accounts/page";

const AddAmount = ({ budData }: { budData?: AmountGet }) => {
  const [budgetFor, setBudgetFor] = useState("");
  const [budgetIcon, setBudgetIcon] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [budgetName, setBudgetName] = useState<BudgetName[]>([]);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (budData) {
      setAmount(budData.amount);
      setStartDate(new Date(budData.startDate));
      setEndDate(new Date(budData.endDate));
      setBudgetFor(budData.budgetFor);
    }
  }, [budData]);

  const addBudget = async ({
    budgetFor,
    amount,
    startDate,
    endDate,
    budgetIcon,
  }: {
    budgetFor: string;
    amount: number;
    startDate: Date;
    endDate: Date;
    budgetIcon: string;
  }) => {
    const response = await fetch("/api/post-amount", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        budgetFor,
        amount,
        startDate,
        endDate,
        budgetIcon,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(errorText);
      throw new Error(errorText ? errorText : "Failed to add budget");
    }

    return response.json();
  };

  const updateBudget = async ({
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
    if (!budData?._id) throw new Error("Budget ID is missing for update");

    const response = await fetch(`/api/update-budget?id=${budData._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ budgetFor, amount, startDate, endDate }),
    });

    if (!response.ok) throw new Error("Failed to update budget");

    return response.json();
  };

  const { mutate: addMutate } = useMutation({
    mutationFn: addBudget,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Budget added successfully",
      });

      resetForm();
      invalidateBudgetQueries();
    },
    onError: (error) => {
      let description = "An unexpected error occurred";

      try {
        const payload = JSON.parse(error.message);
        description = payload.text ?? JSON.stringify(payload);
      } catch {
        description = error.message;
      }

      toast({
        title: "Error",
        description,
        variant: "destructive",
      });
    },
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: updateBudget,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Budget updated successfully",
      });

      resetForm();
      invalidateBudgetQueries();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update budget",
        variant: "destructive",
      });
    },
  });

  const getBudgetNames = async () => {
    const response = await fetch("/api/get-budgetname");
    const result = await response.json();

    if (result.ok && Array.isArray(result.budgetNames)) {
      return result.budgetNames;
    } else {
      console.error("Invalid response from /api/get-budgetname");
      return [];
    }
  };

  const { data: budgetNames = [] } = useQuery({
    queryKey: ["get-budgetname"],
    queryFn: getBudgetNames,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!budgetFor || !amount || !startDate || !endDate) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }
    const selected = budgetNames.find(
      (bud:BudgetName) => bud.nameOfCategorey === budgetFor
    );
    setBudgetIcon(selected?.icon ?? "")

    const payload = { budgetFor, amount, startDate, endDate, budgetIcon };

    if (budData?._id) {
      updateMutate(payload);
    } else {
      addMutate(payload);
    }
  };

  const resetForm = () => {
    setAmount(0);
    setBudgetFor("");
    setStartDate(null);
    setEndDate(null);
  };

  const invalidateBudgetQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["budget"] });
    queryClient.invalidateQueries({ queryKey: ["get-budget"] });
    queryClient.invalidateQueries({ queryKey: ["get-budgetname"] });
  };

  return (
    <div className="w-full h-full flex items-center py-4 px-2 bg-[#2ecc71] rounded-xl">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-around h-full w-full gap-4"
      >
        <div className="flex items-center gap-4 text-lg text-zinc-200 justify-around w-full">
          <label className="w-20 text-center" htmlFor="budgetFor">
            Type
          </label>
          <select
            name="budgetFor"
            value={budgetFor}
            onChange={(e) => {
              const selectedName = e.target.value;
              setBudgetFor(selectedName);
              const selected = budgetNames.find(
                (bud: BudgetName) => bud.nameOfCategorey === selectedName
              );
              if (selected) {
                setBudgetIcon(selected.icon);
              }
            }}
            className="w-48 h-9 bg-zinc-100 text-zinc-800 rounded-lg px-3"
            required
          >
            <option value="" disabled>
              Select an option
            </option>
            {budgetNames.map((bud: BudgetName, index: number) => (
              <option key={index} value={bud.nameOfCategorey}>
                {bud.nameOfCategorey}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 text-lg text-zinc-200 justify-around w-full">
          <label className="w-20 text-center" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={amount !== null ? amount : ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-48 h-9 bg-zinc-100 text-zinc-800 rounded-lg px-3"
            placeholder="Enter budget"
            required
          />
        </div>

        <div className="flex items-center gap-4 text-xl text-zinc-200 justify-around w-full">
          <label className="w-20 text-center" htmlFor="startDate">
            From:
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={startDate ? startDate.toISOString().split("T")[0] : ""}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            className="w-48 h-9 bg-zinc-100 text-zinc-500 rounded-lg px-3"
            required
          />
        </div>

        <div className="flex items-center gap-4 text-xl text-zinc-200 justify-around w-full">
          <label className="w-20 text-center" htmlFor="endDate">
            To:
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={endDate ? endDate.toISOString().split("T")[0] : ""}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            className="w-48 h-9 bg-zinc-100 text-zinc-500 rounded-lg px-3"
            required
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
