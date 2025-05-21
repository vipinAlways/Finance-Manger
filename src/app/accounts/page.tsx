"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Amount } from "@/types";
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
import Image from "next/image";
import AddAmount from "@/components/AddAmount";

export interface AmountGet {
  budgetFor: string;
  startDate: Date;
  amount: number;
  endDate: Date;
  image: string;
  _id?: string;
}

const Page = () => {
  const [nameOfBudget, setNameOfBudget] = useState("");
  const [icon, setIcon] = useState("");

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

  const AddBudgetName = async ({
    name,
    icon,
  }: {
    name: string;
    icon: string;
  }) => {
    try {
      const response = await fetch("/api/post-budgetName", {
        method: "POST",
        body: JSON.stringify({ nameOfBudget: name, icon: icon }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to add budget");
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
    mutate({ name: nameOfBudget, icon: icon });
  };

  const fetchIcons = async (name: string) => {
    const res = await fetch(`/api/get-icons?name=${name}`);
    if (!res.ok) throw new Error("Failed to fetch icons");
    const result = await res.json();
    return result.data.icons;
  };

  const { data: icons = [] } = useQuery({
    queryKey: ["icons", nameOfBudget],
    queryFn: async () => await fetchIcons(nameOfBudget),
  });

  if (data?.budgetName && data?.budgetName.length === 0) {
    return (
      <div className="w-full py-3 flex items-center justify-center gap-4 h-[30rem] flex-col">
        <h1 className="text-4xl font-light">
          You have not added any budget name. Please add one to continue.
        </h1>
        <div className="h-32 flex flex-col items-start gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>ADD NAME</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Name</DialogTitle>
                <DialogDescription>
                  Add the name you want for your budget and choose an icon
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={handleAddBudgetName}
                className="flex flex-col gap-4"
              >
                <input
                  type="text"
                  value={nameOfBudget}
                  name="category"
                  onChange={(e) => setNameOfBudget(e.target.value)}
                  className="w-full p-2 rounded-lg text-zinc-800"
                />
                <div className="grid grid-cols-4 gap-2">
                  {icons?.map((icon: any, index: number) => {
                    const iconUrl =
                      icon.raster_sizes[icon.raster_sizes.length - 1].formats[0]
                        .preview_url;
                    const isSelected = icon === iconUrl;

                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setIcon(iconUrl)}
                        className={`border-2 rounded-lg p-1 ${
                          isSelected ? "border-blue-500" : "border-transparent"
                        }`}
                      >
                        <Image
                          src={iconUrl}
                          height={56}
                          width={56}
                          alt={`Icon ${index + 1}`}
                          className="rounded"
                        />
                      </button>
                    );
                  })}
                </div>
                <Button type="submit">Submit</Button>
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
          You have not added any budget . Please add one to continue.
        </h1>
        <div className="w-full h-32 flex flex-col items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>+ ADD Budget</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Budger</DialogTitle>
                <DialogDescription>Add the BUUdget</DialogDescription>
              </DialogHeader>

              {data?.budgetName ? (
                <AddAmount />
              ) : (
                <p>please add budget name first</p>
              )}
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
                Add the name you want for your budget and choose an icon
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={handleAddBudgetName}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                value={nameOfBudget}
                name="category"
                onChange={(e) => setNameOfBudget(e.target.value)}
                className="w-full p-2 rounded-lg text-zinc-800 border-zinc-800 border"
              />
              <div className="grid grid-cols-4 gap-2">
                {icons?.map((icon: any, index: number) => {
                  const iconUrl =
                    icon.raster_sizes[icon.raster_sizes.length - 1].formats[0]
                      .preview_url;
                  const isSelected = icon === iconUrl;

                  return (
                    <Button
                      key={index}
                      type="button"
                      onClick={() => setIcon(iconUrl)} 
                      className={`border-2 rounded-lg p-1 bg-transparent hover:bg-transparent focus:border-blue-400 ${
                        isSelected ? "border-blue-500" : "border-transparent"
                      }`}
                    >
                      <Image
                        src={iconUrl}
                        height={36}
                        width={36}
                        alt={`Icon ${index + 1}`}
                        className="rounded"
                      />
                    </Button>
                  );
                })}
              </div>
              <Button type="submit">Submit</Button>
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
              (group: Amount[], index: number) =>
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
