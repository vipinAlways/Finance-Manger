"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "./ui/table";
import DeleteTransaction from "./DeleteTransaction";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Transaction } from "../types";
import AddTransaction from "./AddTransaction";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BudgetTypes } from "./AmountSideBar";

function TransactionTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [from, setFrom] = useState("");
  const queryClient = useQueryClient();
  

  const fetchTransactions = async ({
    page,
    from = "",
  }: {
    page: number;
    from: string;
  }) => {
    try {
      const response = await fetch(
        `/api/get-transaction?page=${page}&perpage=20&from=${from}`
      );
      const result = await response.json();
      console.log("transaction");

      if (Array.isArray(result.transactions)) {
        setHasMore(result.hasMore);
        return result.transactions;
      } else {
        console.error("Unexpected API response structure");
        [];
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return [];
    }
  };

  const { data } = useQuery({
    queryKey: ["transactions", page, from],
    queryFn: async () => fetchTransactions({ page, from }),
  });
  

  useEffect(() => {
    if (!data) return;

    if (page === 1) {
      setTransactions(data);
    } else {
      setTransactions((prev) => [...prev, ...data]);
    }
  }, [data, page]);
  const getAmount = async () => {
    try {
      const response = await fetch(`/api/get-amount?from=${from}`);
      
      const result = await response.json();

      if (result.ok) {
        if (Array.isArray(result.budgetCurrent)) {
          return result.budgetCurrent;
        } else {
          console.error("Unexpected API response structure from amount");
          return []
        }
      } else {
        console.error("Error in fetching budget");
        throw new Error("Sorry server error")
      }
    } catch (error) {
      console.error("Failed to fetch budget:", error);
      throw new Error("Sorry server error")
    }
  };

  

  const { data: amountData = [] } = useQuery({
    queryKey: ["amounts"],
    queryFn: async ()=>await getAmount(),
  });

  console.log("check this ",amountData);

  const handleShowMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  if (transactions.length === 0) {
    return (
      <div>
        <h1 className="flex flex-col items-start gap-2.5 text-zinc-800 text-2xl">
          It seems you haven&#39;t recorded any transactions yet.{" "}
          <span className="text-3xl ">Let&#39;s get started!</span>
        </h1>
        <div className="py-2 w-full h-full">
          <AddTransaction className="w-full h-full" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <AddTransaction className="w-full h-full" />
      </div>
      <div className=" w-full h-9">
        <select
          name="from"
          id="from"
          value={from}
          onChange={(e) => {
            setFrom(e.target.value)
            queryClient.invalidateQueries({queryKey:["transactions"]})
          
          }}
          className="w-52 h-full border border-gray-300 rounded-md px-2 py-1 capitalize"
        >
          <option value="">All</option>
          {amountData.length >0 ? (
            amountData.map((amount: BudgetTypes) => (
              <option value={amount.budgetFor} key={amount._id}>
                {amount.budgetFor}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No budgets available
            </option>
          )}
        </select>
      </div>
      <Table className={cn(transactions.length === 0 && "hidden", "my-4")}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Method</TableHead>

            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Note</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length > 0 &&
            transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
                <TableCell
                  className={cn(
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
                <TableCell className="uppercase">
                  {transaction.transactionType}
                </TableCell>
                <TableCell className="text-right">{transaction.note}</TableCell>
                <TableCell className="text-right">
                  <DeleteTransaction transactionId={transaction._id || ""} />
                  
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {hasMore && (
        <div className="flex justify-center items-center lg:mt-4 mt-2">
          <Button
            className={cn("lg:p-2", page === 0 && "hidden")}
            onClick={handleShowMore}
            disabled={!hasMore}
          >
            Show More
          </Button>
        </div>
      )}
    </div>
  );
}

export default TransactionTable;
