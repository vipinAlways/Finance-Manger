"use client";

import CircularProgress from "@/components/CircularProgress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Amount, Transaction } from "@/types";
import React, { useState } from "react";
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
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import BudgetCard from "@/components/BudgetCard";

export interface AmountGet {
  budgetFor: string;
  startDate: Date;
  amount: number;
  endDate: Date;
  _id?: string;
}

const Page = () => {
  const [nameOfBudget, setNameOfBudget] = useState("");
  const [image, setImage] = useState("");

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const fetchBudgets = async () => {
    try {
      const response = await fetch("/api/get-amount", { cache: "no-store" });
      const result = await response.json();

      return {
        budgetCurrent: result.budgetCurrent as AmountGet[],
        budgetName: result.budgetNameForBudget,
        budgetAll: result.budgetall,
      };
    } catch (error) {
      throw new Error("Failed to fetch budgets");
    }
  };

  const { data } = useQuery({
    queryKey: ["get-budget"],
    queryFn: async () => await fetchBudgets(),
  });

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

  const handleAddBudgetName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nameOfBudget.trim()) return;
    mutate(nameOfBudget);
  };
  const fetchIcons = async (name:string) => {
    const res = await fetch(`/api/get-icons?name=${name}`);
    if (!res.ok) throw new Error("Failed to fetch icons");
    const result = await res.json();
    return result.data.icons;
  };


  const { data: icons = [] } = useQuery({
    queryKey: ["icons"],
    queryFn: async()=> await fetchIcons(nameOfBudget)
  });

    console.log(icons,"icons");

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

  if (
    (data?.budgetCurrent && data?.budgetCurrent.length <= 0) ||
    data?.budgetAll.length <= 0
  ) {
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

                <select name="icons" value={image} onChange={(e)=>setImage(e.target.value)}>
                  {
                    icons && icons.map((icon,index)=>(
                        <option value={icon.preview_url}>

                        </option>
                    ))
                  }
                </select>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full flex flex-col items-start">
        <Dialog>
          <DialogTrigger asChild>
            <Button>ADD NAME</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Name</DialogTitle>
              <DialogDescription>
                Add the name you want for your budget
              </DialogDescription>
            </DialogHeader>
            <form
              action="POST"
              onSubmit={handleAddBudgetName}
              className="flex gap-2 items-center flex-1"
            >
              <input
                type="text"
                value={nameOfBudget}
                name="cateGory"
                onChange={(e) => setNameOfBudget(e.target.value)}
                className="w-64 p-2 rounded-lg text-zinc-800"
              />
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 items-start justify-start w-full px-3 overflow-x-auto overflow-y-hidden py-5">
        {(data?.budgetCurrent ?? []).length > 0
          ? data?.budgetCurrent.map((budget: AmountGet, index: number) => (
              <BudgetCard budget={budget} key={index} />
            ))
          : null}
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead rowSpan={2}>Bud Name</TableHead>
              <TableHead colSpan={2} className="text-center">
                Actions
              </TableHead>
              <TableHead colSpan={3} className="text-center">
                Spent Wise
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead>Total</TableHead>
              <TableHead>Spent</TableHead>
              <TableHead>Save</TableHead>
              <TableHead>Earn</TableHead>
              <TableHead>Spend</TableHead>
              <TableHead>Loan</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.budgetAll?.map(
              (group: Amount[], index: Number) =>
                group.length > 1 && (
                  <TableRow key={index + "dss"}>
                    <TableCell className=" font-medium">
                      {group[1].budgetFor}
                    </TableCell>
                    <TableCell className=" font-medium">
                      {group[1].amount}
                    </TableCell>
                    <TableCell className=" font-medium">{0}</TableCell>
                    <TableCell className=" font-medium">
                      {group[1].saving}
                    </TableCell>
                    <TableCell className=" font-medium">{0}</TableCell>
                    <TableCell className=" font-medium">{100}</TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
