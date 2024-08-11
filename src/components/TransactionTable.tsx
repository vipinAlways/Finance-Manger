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
import { Transaction } from "@/model/transaction.model";
import DeleteTransaction from "./DeleteTransaction";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

function TransactionTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      const response = await fetch(
        `/api/get-transaction?page=${page}&perpage=20`
      );
      const result = await response.json();

      if (Array.isArray(result.transactions)) {
        setTransactions((prev) => [...prev, ...result.transactions]);
        // Set hasMore based on whether there are transactions or not
        setHasMore(result.transactions.length > 0);
      } else {
        console.error("Unexpected API response structure");
      }
    }

    fetchTransactions();
  }, [page]);

  useEffect(() => {
    setTimeout(() => {
      setPage(1);
    }, 50);
  }, []);

  const handleShowMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      <Table className={cn("",transactions.length === 0 ? 'hidden':'')}>
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
          {transactions.map((transaction) => (
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
              <TableCell className="uppercase">
                {transaction.transactionType}
              </TableCell>
              <TableCell className="text-right">{transaction.note}</TableCell>
    
              <TableCell className="text-right">
              {transaction && <DeleteTransaction transactionID={[transaction._id].toLocaleString()} />}

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center items-center lg:mt-4 mt-2">
        {" "}
        <Button
          className={cn("lg:p-2 p-0.5", page === 0 ? "hidden" : "")}
          onClick={handleShowMore}
          disabled={!hasMore}
        >
          Show More
        </Button>
      </div>
    </div>
  );
}

export default TransactionTable;
