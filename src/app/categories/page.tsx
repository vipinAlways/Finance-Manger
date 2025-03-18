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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Page: React.FC = () => {
  const [Transactions, setTransactions] = useState<Transaction[]>([]);
  const [FilteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [searchBox, setSearchBox] = useState("");
  const [hidden, setHidden] = useState(true);
  const [selectType, setSelectType] = useState("");
  const [nameOfcateGorey, setNameOfcateGorey] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [error, setError] = useState("");
  const [categoryGroup, setCategoryGroup] = useState<any[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    if (!startDate || !endDate) {
      setTransactions([]); 
      return;
    }
  
    async function fetchTransactions() {
      try {
        const response = await fetch(
          `/api/get-transaction?start=${startDate}&end=${endDate}`
        );
  
        const result = await response.json();
  
        if (result.transactions) {
          setTransactions(result.transactions);
        } else if (Array.isArray(result)) {
          setTransactions(result);
        } else {
          alert("Currently, our servers are not working. Please try again later.");
        }
      } catch (error) {
        alert("Currently, our servers are not working. Please try again later.");
      }
    }
  
    fetchTransactions();
  }, [startDate, endDate]);
  
  const createCategorey = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nameOfcateGorey) {
      console.error("Not able to find category");
      return;
    }

    try {
      const response = await fetch("/api/post-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nameOfcateGorey,
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setNameOfcateGorey("");
        setTimeout(() => {
          setHidden(true);
        }, 500);
        toast({
          title: "Success",
          description: "Category submitted successfull",
        });
      } else {
        throw new Error(data.message || "Error while creating category");
      }
    } catch (error) {
      console.error("Error in page while creating category:", error);
    }
  };

  useEffect(() => {
    const newResult = Transactions.filter(
      (item) =>
        item.category == searchBox && item.transactionType === selectType && new Date(item.date) <= new Date(endDate!) && new Date(item.date) >= new Date(startDate!) 
    );
    setFilteredTransactions(newResult);
  }, [searchBox, selectType, Transactions,endDate,startDate]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await fetch(`/api/get-category`);
        const result = await response.json();
        if (result && Array.isArray(result.getAllCateGories)) {
          setCategoryGroup(result.getAllCateGories);
        } else {
          console.error("Unexpected API response structure for categories");
          setError("Failed to fetch categories.");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("An error occurred while fetching categories.");
      }
    };

    getCategory();
  }, []);

  const totalAmount = FilteredTransactions.reduce(
    (total, item) => total + item.amount,
    0
  );


  return (
    <div className="w-full">
      <div className="p-4 flex justify-start gap-3 flex-1">
      
        <Dialog>
      <DialogTrigger asChild>
        <Button className="w-40">ADD CATEGORY</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add CateGory</DialogTitle>
          <DialogDescription>
           Add the categories what you want to have 
          </DialogDescription>
        </DialogHeader>
        <form
          action="POST"
          onSubmit={createCategorey}
          className={cn("flex gap-2 items-center flex-1")}
        >
          <input
            type="text"
            value={nameOfcateGorey}
            name="cateGory"
            onChange={(e) => setNameOfcateGorey(e.target.value)}
            className="w-64 p-2 rounded-lg text-zinc-800 "
          />
        </form>
      
      </DialogContent>
    </Dialog>
      
      </div>
      <div className="w-full flex justify-evenly items-center my-4 max-sm:gap-1 ">
        <div className="flex items-center gap-3 max-sm:justify-between flex-col">
          <label htmlFor="category" className="text-xl leading-none">
            Category
          </label>
          <select
            onChange={(e) => setSearchBox(e.target.value)}
            name="category"
            id="category"
             className="w-60 border-2 max-sm:w-36 max-sm:text-sm rounded-md border-green-200 p-2 text-l font-semibold text-zinc-800"
            value={searchBox}
          >
            <option value="" disabled>
              Select a Category
            </option>

            {categoryGroup.map((cate, index) => (
              <option key={index} value={cate.nameOfCategorey}>
                {cate.nameOfCategorey}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3 flex-col">
          <label
            htmlFor="transactionTypeSearch"
            className="font-semibold text-lg text-zinc-800"
          >
            Transaction Type
          </label>
          <select
            id="transactionTypeSearch"
            onChange={(e) => setSelectType(e.target.value)}
            value={selectType}
            className="w-60 border-2 max-sm:w-36 max-sm:text-sm rounded-md border-green-200 p-2 text-l font-semibold text-zinc-800"
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="spend">Spend</option>
            <option value="earn">Earn</option>
            <option value="loan">loan</option>
          </select>
        </div>
        <div className="flex items-center gap-3 flex-col">
          <label
            htmlFor="start"
            className="font-semibold text-lg text-zinc-800"
          >
            From
          </label>
          <input
            type="date"
            name="start"
            id="start"
            value={startDate ? startDate.toISOString().split("T")[0] : ""}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            className="w-60 border-2 max-sm:w-36 max-sm:text-sm rounded-md border-green-200 p-2 text-l font-semibold text-zinc-800"
          />
        </div>
        <div className="flex items-center gap-3 flex-col">
          <label htmlFor="end" className="font-semibold text-lg text-zinc-800">
            TO
          </label>
          <input
            type="date"
            name="end"
            id="end"
            value={endDate ? endDate.toISOString().split("T")[0] : ""}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            className="w-60 border-2 max-sm:w-36 max-sm:text-sm rounded-md border-green-200 p-2 text-l font-semibold text-zinc-800"
          />
        </div>
      </div>

      {Transactions.length ===0 ? null : (
        <div className="w-full border-2">
          <Table>
            <TableCaption className="text-green-700 text-center max-sm:hidden">
              Here are all your transactions
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-green-500">Date</TableHead>
                <TableHead className="w-[100px] text-green-500">From</TableHead>
                <TableHead className="text-green-500"> Amount</TableHead>
                <TableHead className="text-green-500">Method</TableHead>
                <TableHead className="text-green-500">Category</TableHead>
                <TableHead className="text-green-500">type</TableHead>
                <TableHead className="text-right text-green-500">
                  Note
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {FilteredTransactions.map((transaction) => (
                <TableRow key={[transaction._id].toLocaleString()}>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {transaction.from}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "",
                      transaction.transactionType === "earn"
                        ? "text-green-500"
                        : transaction.transactionType === "spend"
                        ? "text-red-600"
                        : "text-yellow-500"
                    )}
                  >
                    {transaction.amount}
                  </TableCell>
                  <TableCell>{transaction.method}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{transaction.transactionType}</TableCell>
                  <TableCell className="text-right">
                    {transaction.note}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {searchBox === "" && selectType === "" ? (
        <h1
          className={cn(
            "text-center text-xl text-zinc-800",
            selectType === "" && searchBox === ""
              ? "lg:mt-7 mt-4"
              : " lg:mt-5 mt-3"
          )}
        >
          Selet the type first
        </h1>
      ) : FilteredTransactions.length === 0 ? (
        <p
          className={cn(
            "text-center text-xl text-green-900",
            selectType === "" && searchBox === ""
              ? "lg:mt-7 mt-4"
              : " lg:mt-5 mt-3"
          )}
        >
          No transaction found
        </p>
      ) : (
        <Table className="mt-4">
          <TableBody>
            <TableRow>
              <TableCell colSpan={1}>Total amount {selectType}</TableCell>
              <TableCell
                colSpan={5}
                className={cn(
                  "",
                  selectType === "earn" ? "text-green-500" : "text-red-600"
                )}
              >
                {totalAmount}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Page;
