import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow, TableCell } from "./ui/table";
import { Transaction } from "@/model/transaction.model";

function TransactionTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function fetchTransactions() {
      const response = await fetch('/api/get-transaction');
      const result = await response.json();
      console.log('API response:', result);

    
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
          <TableHead className="text-right">Note</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={Date.now()}>
            <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
            <TableCell>{transaction.amount}</TableCell>
            <TableCell>{transaction.method}</TableCell>
            <TableCell>{transaction.category}</TableCell>
            <TableCell className="text-right">{transaction.note}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TransactionTable;

