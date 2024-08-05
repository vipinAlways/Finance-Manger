import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow, TableCell } from "./ui/table";
import { Transaction } from "@/model/transaction.model";
import DeleteTransaction from "./DeleteTransaction";
import { cn } from "@/lib/utils";

function TransactionTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function fetchTransactions() {
      const response = await fetch(`/api/get-transaction`);
      const result = await response.json();
      

    
      if (result.transactions) {
        setTransactions(result.transactions);
      } else if (Array.isArray(result)) {
        setTransactions(result);
      } else {
        console.error('Unexpected API response structure');
      }
    }

    fetchTransactions();
  }, []);
 


  return (
    
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
        {transactions.map((transaction) => (
          
          <TableRow key={transaction._id}>
            <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
            <TableCell className={cn('',transaction.transactionType === "earn" ? "text-green-500" : "text-red-600" )} >{transaction.amount}</TableCell>
            <TableCell>{transaction.method}</TableCell>
            <TableCell>{transaction.category}</TableCell>
            <TableCell>{transaction.transactionType}</TableCell>
            <TableCell className="text-right">{transaction.note}</TableCell>
            {/* @ts-ignore */}
            <TableCell className="text-right"><DeleteTransaction transactionID={transaction._id}/></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TransactionTable;

