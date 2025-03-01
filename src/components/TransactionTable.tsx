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
} from "./ui/table";
import DeleteTransaction from "./DeleteTransaction";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Transaction } from "../types";
import AddTransaction from "./AddTransaction";

function TransactionTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [from, setFrom] = useState("");
  const [getAmountFor, setGetAmountFor] = useState<any[]>([]);
  const [block, setBlock] = useState(false);

  const onclick = () => {
    if (block) setBlock(false);

    setBlock(true);
  };
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `/api/get-transaction?page=${page}&perpage=20&from=${from}`
        );
        const result = await response.json();
  
        if (Array.isArray(result.transactions)) {
          if (page === 1) {
            setTransactions(result.transactions);
          } else {
            setTransactions((prev) => [...prev, ...result.transactions]);
          }
          setHasMore(result.hasMore);
        } else {
          console.error("Unexpected API response structure");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
  
    fetchTransactions();
  }, [page, from]);
  

  useEffect(() => {
    const initializePage = setTimeout(() => {
      setPage(1);
    }, 50);

    return () => clearTimeout(initializePage);
  }, []);

  useEffect(() => {
    const getAmount = async () => {
      try {
        const response = await fetch(`/api/get-amount`);
        console.log("transaction table");
        const result = await response.json();
        if (result && Array.isArray(result.amount)) {
          setGetAmountFor(result.amount);
        } else {
          console.error("Unexpected API response structure for amounts");
        }
      } catch (error) {
        console.error("Error fetching amounts:", error);
      }
    };

    getAmount();
  });


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
        <div className="py-2">
          <div className=" w-20">
            <Button onClick={onclick}>Add Transaction</Button>
          </div>
         
            <AddTransaction className={cn(!block && "hidden")} />
      
        </div>
      </div>
    );
  }
  console.log(transactions.length ,"check this transaction");

  return (
    <>
      <div className=" w-full h-9">
        <select
          name="from"
          id="from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-52 h-full border border-gray-300 rounded-md px-2 py-1 capitalize"
        >
          <option value="">All</option>
          {getAmountFor.map((amount, index) => (
            <option value={amount.budgetFor} key={index}>
              {amount.budgetFor}
            </option>
          ))}
         
        </select>
      </div>
      <Table className={cn(transactions.length === 0 && "hidden" ,"my-4")}>
       
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
    </>
  );
}

export default TransactionTable;
