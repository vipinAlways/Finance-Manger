"use client";

import CircularProgress from "@/components/CircularProgress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Amount, Transaction } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

export interface AmountGet {
  budgetFor: string;
  startDate: Date;
  amount: number;
  endDate: Date;
  _id?: string;
}

const Page = () => {
  const [budgetCurrect, setBudgetCurrent] = useState<AmountGet[]>([]);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [nameOfBudget, setNameOfBudget] = useState("");
  const [index, setIndex] = useState(0);
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);
  const queryClient = useQueryClient();

  const fetchBudgets = async () => {
    try {
      const response = await fetch("/api/get-amount", { cache: "no-store" });
      const result = await response.json();

      return {
        budgetCurrent: result.budgetCurrent,
        budgetName: result.budgetNameForBudget,
        budgetAll: result.budgetall,
      };
    } catch (error) {
      throw new Error("Failed to fetch budgets");
    }
  };

  const { data, isError, isPending } = useQuery({
    queryKey: ["get-budget"],
    queryFn: async () => await fetchBudgets(),
  });
  console.log(data?.budgetAll, "dd");

  useEffect(() => {
    if (data) {
      setBudgetCurrent(data.budgetCurrent);
    }
    if (
      (!data?.budgetCurrent?.length &&
        !data?.budgetName?.length &&
        !data?.budgetAll?.length) ||
      isError
    ) {
      setBudgetCurrent([]);
    }
  }, [data, isError]);

  const AddBudgetName = async (name: string) => {
    try {
      const response = await fetch("/api/post-budgetName", {
        method: "POST",
        body: JSON.stringify({ nameOfBudget: name }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add budget");
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  const { mutate } = useMutation({
    mutationFn: AddBudgetName,
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong!",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Budget Added Successfully",
        description: `Your budget for "${nameOfBudget}" has been added.`,
        variant: "default",
      });
      setNameOfBudget("");
      queryClient.invalidateQueries({ queryKey: ["budget"] });
    },
  });

  const fetchTransactions = async (index: number) => {
    if (!budgetCurrect[index]) return [];
    try {
      const response = await fetch(
        `/api/get-transaction?from=${budgetCurrect[index]?.budgetFor}`
      );
      const result = await response.json();

      return Array.isArray(result.transactions) ? result.transactions : [];
    } catch (error) {
      console.error("Transaction fetch error:", error);
      alert("Currently our servers are not working, please try again later.");
      return [];
    }
  };

  const { data: transactionData, isPending: transactionIspending } = useQuery({
    queryKey: ["transaction", index],
    queryFn: async () => fetchTransactions(index),
    refetchInterval: 10000,
    refetchIntervalInBackground: false,
  });

  useEffect(() => {
    setTransactions(transactionData || []);
  }, [transactionData]);

  const handleAddBudgetName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nameOfBudget.trim()) return;
    mutate(nameOfBudget);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev < budgetCurrect.length - 1 ? prev + 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, [budgetCurrect]);

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
  }, [budgetCurrect, index, totalEarned, totalSpent, transactionData]);

  if (isPending || transactionIspending) {
    return (
      <div className="flex justify-center items-center space-x-2">
        <div
          className="w-4 h-4 bg-[#2ecc71] rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-4 h-4 bg-[#2ecc71] rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-4 h-4 bg-[#2ecc71] rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    );
  }

  if (data?.budgetName.length === 0) {
    return (
      <div className="w-full py-3 flex items-center justify-center gap-4 h-[30rem] flex-col">
        <h1 className="text-4xl font-light">
          You have not added any budget name. Please add one to continue.
        </h1>
        <div className="w-full h-32 flex flex-col items-start gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>ADD NAME</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Name</DialogTitle>
                <DialogDescription>
                  Add the Name what you want to have for your budget
                </DialogDescription>
              </DialogHeader>
              <form
                action="POST"
                onSubmit={handleAddBudgetName}
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
    <div className="flex flex-col gap-6">
      <div className="w-full flex flex-col items-start ">
        <Dialog>
          <DialogTrigger asChild>
            <Button>ADD NAME</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Name</DialogTitle>
              <DialogDescription>
                Add the Name what you want to have for your budget
              </DialogDescription>
            </DialogHeader>
            <form
              action="POST"
              onSubmit={handleAddBudgetName}
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

      <div>
        <div className="w-96 h-48 bg-[rgba(46,204,113,0.1)] backdrop-blur-md border border-white/30 rounded-xl p-6 shadow-[0_4px_10px_2px_rgba(117,171,140,0.2)] hover:shadow-[0_4px_12px_3px_rgba(0,0,0,0.25)] hover:transition-all hover:duration-300 hover:ease-in-out duration-300 ease-in-out hover:scale-[1.01] flex flex-col gap-3 items-start">
          <div className="flex items-center gap-2 justify-start">
            <Image
              src="/image1.jpg"
              alt="green"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="text-2xl font-thin text-green-900">Self</h1>
          </div>
          <div className="relative w-full bg-[linear-gradient(to_right,red_0%,red_50%,green_50%,green_80%,blue_80%,blue_100%)] h-4 rounded-lg group">
            <div className="w-10 h-10 absolute top-0 left-1/2 -translate-x-1/2 rounded shadow-md hidden group-hover:block transition-all duration-300 ease-linear">
              <p className="text-xs text-black p-2">
                kshdkhskhkdjkjskdjkjhdkhs
              </p>
            </div>
          </div>

          <div>{/* Additional content if needed */}</div>
        </div>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead rowSpan={2}>Bud Name</TableHead>
              <TableHead colSpan={3} className="text-center">
                Spent Wise
              </TableHead>
              <TableHead colSpan={2} className="text-center">
                Actions
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead>Earn</TableHead>
              <TableHead>Spend</TableHead>
              <TableHead>Loan</TableHead>
              <TableHead className="">Spent</TableHead>
              <TableHead className="">Save</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>hello</TableCell>
              <TableCell>hello1</TableCell>
              <TableCell>hello2</TableCell>
              <TableCell>hello3</TableCell>
              <TableCell>hello4</TableCell>
              <TableCell className="">hello5</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
