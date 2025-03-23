"use client";

import CircularProgress from "@/components/CircularProgress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Amount, Transaction } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface AmountGet {
  budgetFor: string;
  startDate: Date;
  amount: number;
  endDate: Date;
  _id?: string;
}

const Page = () => {
  const [budgetCurrect, setBudgetCurrent] = useState<AmountGet[]>([]);
  const [budget, setBudget] = useState<[]>([]);
  const [budgetName, setBudgetName] = useState<string[]>([]);
  const [budgetUpdated, setBudgetUpdated] = useState(false);
  const [hidden2, setHidden2] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [nameOfBudget, setNameOfBudget] = useState("");
  const [index, setIndex] = useState(0);
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);
 

  const calculateTotalAmount = useCallback(
    (type: string) =>
      transactions.reduce((total, transaction) => {
        if (transaction.transactionType === type) {
          const transactionDate = new Date(transaction.date);
          const startDate = new Date(budgetCurrect[index]?.startDate);
          const endDate = new Date(budgetCurrect[index]?.endDate);
          if (transactionDate >= startDate && transactionDate <= endDate) {
            return total + transaction.amount;
          }
        }
        return total;
      }, 0),
    [transactions, budgetCurrect, index]
  );

  const fetchBudgets = useCallback(async () => {
    try {
      const response = await fetch("/api/get-amount", { cache: "no-store" });
      const result = await response.json();
      setBudgetCurrent(
        Array.isArray(result.budgetCurrent) && result.budgetCurrent
      );
      setBudgetName(
        Array.isArray(result.budgetNameForBudget) && result.budgetNameForBudget
      );
      setBudget(Array.isArray(result.budgetall) && result.budgetall);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  }, []);

  useEffect(() => {
    fetchBudgets();
  }, [budgetUpdated, fetchBudgets]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev < budgetCurrect.length - 1 ? prev + 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, [budgetCurrect]);

  const totalEarned = useMemo(
    () => calculateTotalAmount("earn"),
    [calculateTotalAmount]
  );
  const totalSpent = useMemo(
    () => calculateTotalAmount("spend"),
    [calculateTotalAmount]
  );

  useEffect(() => {
    setProgress(
      budgetCurrect[index]?.amount > 0
        ? (Math.abs(totalEarned + totalSpent) / budgetCurrect[index]?.amount) *
            100
        : 0
    );
  }, [budgetCurrect, index, totalEarned, totalSpent]);

  const fetchTransactions = useCallback(async () => {
    if (!budgetCurrect[index]) return;
    try {
      const response = await fetch(
        `/api/get-transaction?from=${budgetCurrect[index]?.budgetFor}`
      );
      const result = await response.json();
      setTransactions(
        Array.isArray(result.transactions) ? result.transactions : result
      );
    } catch (error) {
      console.error("Transaction fetch error:", error);
      alert("Currently our servers are not working, please try again later.");
    }
  }, [index, budgetCurrect]);

  useEffect(() => {
    fetchTransactions();
    const interval = setInterval(fetchTransactions, 10000);
    return () => clearInterval(interval);
  }, [fetchTransactions]);

  const AddBudgetName = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/post-budgetName", {
        method: "POST",
        body: JSON.stringify({ nameOfBudget }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      toast({
        title: data.ok ? "Budget Added Successfully" : "Error",
        description: data.ok
          ? `Your budget for "${nameOfBudget}" has been added.`
          : data.message,
        variant: data.ok ? "default" : "destructive",
      });
      if (data.ok) {
        setNameOfBudget("");
        setHidden2(true);
        setBudgetUpdated((prev) => !prev);
      }
    } catch (error) {
      console.error("Error while adding budget name:", error);
      toast({
        title: "Error",
        description: "Something went wrong!",
        variant: "destructive",
      });
    }
  };

  
  

  if (budgetName.length === 0) {
    return (
      <div className="w-full py-3 flex items-center justify-center gap-4 h-[30rem] flex-col">
        <h1 className="text-4xl font-light">
          You have not added any budget name. Please add one to continue.
        </h1>
        <div className="w-full h-32 flex flex-col items-start gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="">ADD NAME</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Name</DialogTitle>
                <DialogDescription>
                  Add the Name  what you want to have for your budget
                </DialogDescription>
              </DialogHeader>
              <form
                action="POST"
                onSubmit={AddBudgetName}
                className={cn("flex gap-2 items-center flex-1")}
              >
                <input
                  type="text"
                  value={nameOfBudget}
                  name="cateGory"
                  onChange={(e) => setNameOfBudget(e.target.value)}
                  className="w-64 p-2 rounded-lg text-zinc-800 "
                />
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }



  return (
    <div className="h-full w-full py-3 flex flex-col gap-4 max-md:gap-2 items-center justify-center">
      <div className="w-full h-32 flex flex-col items-start gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="text-xl max-md:text-lg ">ADD NAME</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Name</DialogTitle>
              <DialogDescription>
              Add the Name  what you want to have for your budget
              </DialogDescription>
            </DialogHeader>
            <form
              action="POST"
              onSubmit={AddBudgetName}
              className={cn("flex gap-2 items-center flex-1")}
            >
              <input
                type="text"
                value={nameOfBudget}
                name="cateGory"
                onChange={(e) => setNameOfBudget(e.target.value)}
                className="w-64 p-2 rounded-lg text-zinc-800 "
              />
            </form>
           
          </DialogContent>
        </Dialog>
      </div>
      <div className="h-full mx-auto relative rounded-md w-full flex items-center justify-center gap-4 max-lg:flex-col px-3">
        <div className="h-56 flex items-center justify-center overflow-x-auto overflow-y-hidden scroll-smooth touch-pan-left bg-green-600 text-green-50 md:w-[34rem]  rounded-md max-md:w-full">
          <div className="flex space-x-4 relative w-full items-center justify-around p-2">
            {budgetCurrect.map(
              (show, i) =>
                i === index && (
                  <Link
                    key={i}
                    href={`/accounts/${show._id}`}
                    className="md:w-[28rem] md:h-52  max-md:h-44 flex items-center "
                  >
                    <Image
                      src={"/image1.jpg"}
                      alt="Budget Image"
                      height={60}
                      width={120}
                      className="object-contain rounded-full"
                    />
                    <div className="flex justify-around h-full w-full p-2 flex-col">
                      <div className="flex flex-col items-center gap-2 border-b pb-5 border-green-50">
                        <h1 className="md:text-4xl font-bold">
                          Name of Budget
                        </h1>
                        <h1
                          className={cn(
                            "flex justify-around capitalize font-serif",
                            show.budgetFor.split(" ").length < 4
                              ? "text-5xl"
                              : "text-3xl"
                          )}
                        >
                          {show.budgetFor}
                        </h1>
                      </div>
                      <div className="w-full flex items-center justify-center font-serif">
                        <p className="text-2xl rounded-full p-2 flex w-full items-center justify-center gap-3">
                          <span className="w-fit flex">Till :</span>
                          <span className="text-xl w-fit text-start">
                            {new Date(show.endDate)
                              .toString()
                              .replace("GMT+0530 (India Standard Time)", "")}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                )
            )}
          </div>
        </div>
        <div>
          <div>
            <div className="relative">
              <CircularProgress percentage={progress} size={200} />
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-3xl font-mono">
                {progress}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full items-start flex-col">
        <h1 className="w-full flex-col flex items-start gap-1.5">
          <span className=" text-zinc-700 ">Last Month&#39;s Savings</span>
          <span>Summary</span>
        </h1>
        <ul>
          {budget.map((group: Amount[], index) => (
            <li key={index}>
              <ul>
                <li>
                  {group.length > 1 ? (
                    <strong>{group[1]?.budgetFor}</strong>
                  ) : (
                    <p></p>
                  )}
                  {group.length > 1 && (
                    <>
                      : ₹{group[1]?.amount} (Till:{" "}
                      {new Date(group[1]?.endDate).toLocaleDateString()})
                    </>
                  )}
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
