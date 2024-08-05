"use client";
import { Transaction } from "@/model/transaction.model";
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
const Page: React.FC = () => {
  const [Transactions, setTransactions] = useState<Transaction[]>([]);
  const [FilteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [searchBox, setSearchBox] = useState("");
  const [selectType, setSelectType] = useState("");

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
      <div className="w-full flex justify-evenly items-center my-4 ">
        <div className="flex items-center gap-3">
          <label
            htmlFor="searchCategory"
            className="font-semibold text-lg text-zinc-800"
          >
            Category
          </label>
          <select
            onChange={(e) => setSearchBox(e.target.value)}
            value={searchBox}
            className="w-60 border-2 rounded-md border-blue-500 p-2 text-lg font-semibold text-zinc-800"
            id="searchCategory"
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="car">Car</option>
            <option value="Petrol">Petrol</option>
            <option value="food">Food</option>
            <option value="freelance">Freelance</option>
            <option value="pocketMoney">Pocket Money</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
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
            className="w-60 border-2 rounded-md border-blue-500 p-2 text-l font-semibold text-zinc-800"
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="spend">Spend</option>
            <option value="earn">Earn</option>
          </select>
        </div>
      </div>

      <div className="w-full border-2">
        <Table>
          <TableCaption>Here are all your transactions</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>type</TableHead>
              <TableHead className="text-right">Note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {FilteredTransactions.map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
                <TableCell
                  className={cn(
                    "",
                    transaction.transactionType === "earn"
                      ? "text-green-500"
                      : "text-red-600"
                  )}
                >
                  {transaction.amount}
                </TableCell>
                <TableCell>{transaction.method}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>{transaction.transactionType}</TableCell>
                <TableCell className="text-right">{transaction.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {FilteredTransactions.length === 0  ? (
       ''
      ) : (
        <Table className="mt-4">
        <TableRow >
        <TableCell colSpan={1}>Total amount {selectType}</TableCell>
        <TableCell colSpan={5} className="">
          {totalAmount}
        </TableCell>
      </TableRow>
      </Table>
      )}
    </div>
  );
};

export default Page;
