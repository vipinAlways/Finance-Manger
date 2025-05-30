"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface categoryGrp {
  nameOfCategorey: string;
  _id: string;
}

const Page: React.FC = () => {
  const [Transactions, setTransactions] = useState<Transaction[]>([]);
  const [FilteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [searchBox, setSearchBox] = useState("");
  const [selectType, setSelectType] = useState("");
  const [nameOfcateGorey, setNameOfcateGorey] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [categoryGroup, setCategoryGroup] = useState<categoryGrp[]>([]);
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>();
  const queryClient = useQueryClient();

  const fetchTransactions = async () => {
    try {
      const response = await fetch(
        `/api/get-transaction?start=${startDate}&end=${endDate}`
      );
      const result = await response.json();
      return Array.isArray(result.transactions) ? result.transactions : [];
    } catch {
      alert("Currently, our servers are not working. Please try again later.");
      return [];
    }
  };

  const { data } = useQuery({
    queryKey: ["transactions", startDate, endDate],
    queryFn: fetchTransactions,
    enabled: !!startDate && !!endDate,
  });

  useEffect(() => {
    if (!startDate || !endDate) return setTransactions([]);
    setTransactions(data || []);
  }, [data, startDate, endDate]);

  const createCategory = async (name: string) => {
    if (!name) {
      toast({
        title: "Error",
        description: "Please enter a category name",
        variant: "destructive",
      });
      return;
    }

    const response = await fetch("/api/post-category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nameOfCategory: name }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create category");
    }

    return await response.json();
  };

  const { mutate } = useMutation({
    mutationKey: ["createCategory"],
    mutationFn: createCategory,
    onSuccess: () => {
      toast({
        title: "Category Created",
        description: "Category created successfully",
      });
      setNameOfcateGorey("");
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    const newResult = Transactions.filter(
      (item) =>
        item.category === searchBox &&
        item.transactionType === selectType &&
        new Date(item.date) <= new Date(endDate!) &&
        new Date(item.date) >= new Date(startDate!)
    );
    setFilteredTransactions(newResult);
  }, [searchBox, selectType, Transactions, endDate, startDate]);

  const fetchCategories = async () => {
    const response = await fetch(`/api/get-category`);
    const result = await response.json();

    if (result && Array.isArray(result.getAllCateGories)) {
      return result.getAllCateGories;
    } else {
      return [];
    }
  };

  const { data: categoryGroupsData = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await fetchCategories(),
  });

  return (
    <div className="w-full">
      <div className="p-4 flex justify-start w-full  px-16 gap-3 flex-1">
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
          <DialogTrigger asChild>
            <Button className="w-40">ADD CATEGORY</Button>
          </DialogTrigger>
          <DialogContent className="max-md:w-4/5 w-full h-40 flex items-center justify-center flex-col">
            <DialogHeader>
              <DialogTitle>Add CateGory</DialogTitle>
              <DialogDescription>
                Add the categories what you want to have
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (nameOfcateGorey) mutate(nameOfcateGorey);
              }}
              className={cn("flex gap-2 items-center flex-1")}
            >
              <input
                type="text"
                value={nameOfcateGorey}
                onChange={(e) => setNameOfcateGorey(e.target.value)}
                className="w-64 p-2 rounded-lg text-zinc-800"
              />
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-full flex justify-evenly items-center my-4 max-sm:gap-1 max-md:flex-col">
        <div className="flex items-center gap-3 w-full max-sm:justify-between flex-col">
          <label htmlFor="category" className="text-xl leading-none">
            Category
          </label>
          <select
            onChange={(e) => setSearchBox(e.target.value)}
            value={searchBox}
            className="w-60 border-2 max-sm:w-4/5 text-center max-sm:text-sm rounded-md border-green-100 p-2 font-semibold text-zinc-800"
          >
            <option value="" disabled>
              Select a Category
            </option>
            {Array.isArray(categoryGroupsData) &&
              categoryGroupsData.map((cate: categoryGrp, index: number) => (
                <option key={index} value={cate.nameOfCategorey}>
                  {cate.nameOfCategorey}
                </option>
              ))}
          </select>
        </div>

        <div className="flex items-center gap-3 w-full flex-col">
          <label className="font-semibold text-lg text-zinc-800">
            Transaction Type
          </label>
          <select
            onChange={(e) => setSelectType(e.target.value)}
            value={selectType}
            className="w-60 border-2 max-sm:w-4/5 text-center max-sm:text-sm rounded-md border-green-100 p-2 font-semibold text-zinc-800"
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="spend">Spend</option>
            <option value="earn">Earn</option>
            <option value="loan">Loan</option>
          </select>
        </div>

        <div className="flex items-center gap-3 w-full flex-col">
          <label
            htmlFor="start"
            className="font-semibold text-lg text-zinc-800"
          >
            From
          </label>
          <input
            type="date"
            value={startDate ? startDate.toISOString().split("T")[0] : ""}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            className="w-60 border-2 max-sm:w-4/5 text-center max-sm:text-sm rounded-md border-green-100 p-2 font-semibold text-zinc-800"
          />
        </div>
        <div className="flex items-center gap-3 w-full flex-col">
          <label htmlFor="end" className="font-semibold text-lg text-zinc-800">
            To
          </label>
          <input
            type="date"
            value={endDate ? endDate.toISOString().split("T")[0] : ""}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            className="w-60 border-2 max-sm:w-4/5 text-center max-sm:text-sm rounded-md border-green-100 p-2 font-semibold text-zinc-800"
          />
        </div>
      </div>

      {Transactions.length > 0 && (
        <div className="w-full border-2">
          <Table>
            <TableCaption className="text-green-700 text-center max-sm:hidden">
              Here are all your transactions
            </TableCaption>
            <TableHeader>
              <TableRow className="text-green-900">
                <TableHead>Date</TableHead>
                <TableHead>From</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Note</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {FilteredTransactions.map((t, index) => (
                <TableRow key={index} className="text-black">
                  <TableCell>{new Date(t.date).toLocaleDateString()}</TableCell>
                  <TableCell>{t.from}</TableCell>
                  <TableCell>{t.amount}</TableCell>
                  <TableCell>{t.method}</TableCell>
                  <TableCell>{t.category}</TableCell>
                  <TableCell>{t.transactionType}</TableCell>
                  <TableCell>{t.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Page;
