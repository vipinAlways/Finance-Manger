import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function AddTransaction({ className }: { className: string }) {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [method, setMethod] = useState("");
  const [dateAt, setDate] = useState<Date | null>(null);
  const [transactionType, setTransactionType] = useState("");
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const fetchCategories = async () => {
    const response = await fetch("/api/get-category");
    if (!response.ok) throw new Error("Failed to fetch categories");
    return response.json();
  };

  const { data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const fetchAmounts = async () => {
    const response = await fetch("/api/get-amount");
    if (!response.ok) throw new Error("Failed to fetch amounts");
    return response.json();
  };

  const { data: amountData } = useQuery({
    queryKey: ["amounts"],
    queryFn: fetchAmounts,
  });

  const addTransaction = async (transaction: {
    amount: string;
    dateAt: Date | null;
    note: string;
    method: string;
    category: string;
    transactionType: string;
    from: string;
  }) => {
    const response = await fetch("/api/post-transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    });
    if (!response.ok) throw new Error("Failed to add transaction");
    return response.json();
  };

  const { mutate } = useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      setAmount("");
      setNote("");
      setCategory("");
      setDate(null);
      setMethod("");
      setTransactionType("");
      setDisable(false);
      setFrom("");
      setError("");
      queryClient.invalidateQueries({ queryKey: ["amounts"] });
    },
    onError: (error: any) => {
      setError(error.message);
      setDisable(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !amount ||
      !category ||
      !method ||
      !dateAt ||
      !transactionType ||
      !from
    ) {
      setError("All fields are required.");
      return;
    }
    setDisable(true);
    mutate({ amount, dateAt, note, method, category, transactionType, from });
  };

  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-start pt-3",
        className
      )}
    >
      {amountData?.budgetCurrent?.length > 0 &&
      categoryData?.getAllCateGories?.length > 0 ? (
        <Dialog >
        <DialogTrigger asChild>
          <Button className="">ADD TRANSACTION</Button>
        </DialogTrigger>
        <DialogContent className="max-md:w-4/5 w-full h-4/5 flex items-center justify-center flex-col p-5">
          <DialogHeader>
            <DialogTitle>Add CateGory</DialogTitle>
            <DialogDescription>
              Add the categories what you want to have
            </DialogDescription>
          </DialogHeader>
          <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center  w-full max-sm:w-4/5 px-3 h-full py-3  text-white bg-green-700 rounded-xl relative"
        >
          <div className="w-full flex items-start h-12 text-zinc-800">
            <select
              name="from"
              id="from"
              className="rounded-sm border h-9 w-40"
              onChange={(e) => setFrom(e.target.value)}
              value={from}
              required
            >
              <option value="" disabled>
                Select Budget
              </option>
              {amountData.budgetCurrent.map((amount: any, index: number) => (
                <option key={index} value={amount.budgetFor}>
                  {amount.budgetFor}
                </option>
              ))}
            </select>
          </div>

          <input
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            name="amount"
            placeholder="Enter amount"
            className="border h-10 rounded-sm text-black w-full mb-5"
            value={amount}
            required
          />

          <input
            type="date"
            onChange={(e) => setDate(new Date(e.target.value))}
            name="date"
            className="border h-10 rounded-sm text-black w-full mb-5"
            value={dateAt ? dateAt.toISOString().split("T")[0] : ""}
            required
          />

          <select
            onChange={(e) => setMethod(e.target.value)}
            name="method"
            className="border h-10 rounded-sm text-black w-full mb-5"
            value={method}
            required
          >
            <option value="" disabled>
              Select a Method
            </option>
            <option value="cash">Cash</option>
            <option value="online">Online</option>
          </select>

          <select
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            className="border h-10 rounded-sm text-black w-full mb-5"
            value={category}
            required
          >
            <option value="" disabled>
              Select a Category
            </option>
            {categoryData.getAllCateGories.map((cate: any, index: number) => (
              <option key={index} value={cate.nameOfCategorey}>
                {cate.nameOfCategorey}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setTransactionType(e.target.value)}
            name="transactionType"
            className="border h-10 rounded-sm text-black w-full mb-5"
            value={transactionType}
            required
          >
            <option value="" disabled>
              Select a Transaction Type
            </option>
            <option value="spend">Spend</option>
            <option value="earn">Earn</option>
            <option value="loan">Loan</option>
          </select>

          <input
            type="text"
            onChange={(e) => setNote(e.target.value)}
            name="note"
            placeholder="Enter note"
            className="border h-10 rounded-sm text-black w-full mb-5"
            value={note}
          />

          <button
            type="submit"
            disabled={disable}
            className="border-2 p-2 rounded-md bg-white text-green-700"
          >
            Submit
          </button>

          {error && <p className="text-red-500 mt-3 text-lg">{error}</p>}
        </form>
        </DialogContent>
      </Dialog>
      ) : (
        <p className="text-white text-lg">Loading data...</p>
      )}
    </div>
  );
}

export default AddTransaction;
