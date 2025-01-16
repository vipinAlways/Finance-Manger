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
const Page: React.FC = () => {
  const [Transactions, setTransactions] = useState<Transaction[]>([]);
  const [FilteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [searchBox, setSearchBox] = useState("");
  const [hidden, setHidden] = useState(true);
  const [selectType, setSelectType] = useState("");
  const [cateGory, setcateGory] = useState("");
  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch(`/api/get-transaction`);
        const result = await response.json();

        if (result.transactions) {
          setTransactions(result.transactions);
        } else if (Array.isArray(result)) {
          setTransactions(result);
        } else {
          alert(
            "Currently over server are not working out please try again later"
          );
        }
      } catch (error) {
        alert(
          "Currently over server are not working out please try again later"
        );
      }
    }

    fetchTransactions();
  }, []);
  const createCategorey = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cateGory) {
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
          cateGory,
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setcateGory("");
        setTimeout(() => {
          setHidden(true);
        }, 500); 
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
        item.category == searchBox && item.transactionType === selectType
    );
    setFilteredTransactions(newResult);
  }, [searchBox, selectType, Transactions]);
  const totalAmount = FilteredTransactions.reduce(
    (total, item) => total + item.amount,
    0
  );
  return (
    <div className="w-full">
      <div className="p-4 flex justify-center flex-col">
        <Button className="w-40" onClick={() => setHidden(false)}>
          ADD CATEGORY
        </Button>
        <form
          action="POST"
          onSubmit={createCategorey}
          className={cn("flex gap-2 items-center flex-1", hidden && "hidden")}
        >
          <input
            type="text"
            value={cateGory}
            onChange={(e) => setcateGory(e.target.value)}
            className="h-8 w-64 px-4 rounded-lg text-zinc-800 "
          />
          <Button type="submit" className="h-8 w">
            Submit
          </Button>
        </form>
      </div>
      <div className="w-full flex justify-evenly items-center my-4 max-sm:gap-1 ">
        <div className="flex items-center gap-3 max-sm:justify-between max-sm:flex-col">
          <label
            htmlFor="searchCategory"
            className="font-semibold text-lg text-zinc-800"
          >
            Category
          </label>
          <select
            onChange={(e) => setSearchBox(e.target.value)}
            value={searchBox}
            className="w-60 max-sm:w-36 max-sm:text-sm border-2 rounded-md border-green-200 p-2 text-lg font-semibold text-zinc-800"
            id="searchCategory"
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="car">Car</option>
            <option value="petrol">Petrol</option>
            <option value="food">Food</option>
            <option value="freelance">Freelance</option>
            <option value="pocketMoney">Pocket Money</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex items-center gap-3  max-sm:flex-col">
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
      </div>

      {selectType === "" && searchBox === "" ? null : (
        <div className="w-full border-2">
          <Table>
            <TableCaption className="text-green-700 text-center max-sm:hidden">
              Here are all your transactions`
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-green-500">Date</TableHead>
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
