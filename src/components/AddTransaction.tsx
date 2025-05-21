import { cn } from "@/lib/utils";
import React, { use, useEffect, useState } from "react";
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
import { AmountGet } from "@/app/accounts/page";
import { useToast } from "./ui/use-toast";

function AddTransaction({ className }: { className: string }) {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [method, setMethod] = useState("");
  const [dateAt, setDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [transactionType, setTransactionType] = useState("");
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const { toast } = useToast();

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
    try {
      const response = await fetch(`/api/get-amount`);
        const result = await response.json();

      if (result.ok) {
        if (Array.isArray(result.budgetCurrent)) {
          return result.budgetCurrent;
        } else {
          console.error("Unexpected API response structure from amount");
          return [];
        }
      } else {
        return [];
      }
    } catch (error) {
      console.error("Failed to fetch budget:", error);
      throw new Error("Sorry server error");
    }
  };

  const { data: amountData = [] } = useQuery({
    queryKey: ["amounts"],
    queryFn: async () => await fetchAmounts(),
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
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["amounts"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
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

    if (dateAt > endDate!) {
      toast({
        title: "Error",
        description: "Date should be less than end date",
        variant: "destructive",
      });
      setDate(null);
      return;
    }
    setDisable(true);
    mutate({ amount, dateAt, note, method, category, transactionType, from });
    toast({
      title: "Success",
      description: "Transaction added successfully",
      variant: "default",
    });
  };

  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-start pt-3 my-3 px-4",
        className
      )}
    >
      {amountData && categoryData?.getAllCateGories?.length > 0 ? (
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
          <DialogTrigger asChild>
            <Button>ADD TRANSACTION</Button>
          </DialogTrigger>

          {amountData?.length > 0 && amountData?.budgetCurrent?.length > 0 ? (
            <DialogContent className="w-[95%] h-4/5 max-lg:h-3/5 flex flex-col items-center justify-center rounded-lg p-2">
              <DialogHeader>
                <DialogTitle>Add Category</DialogTitle>
                <DialogDescription>
                  Add the categories you want to have
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center w-full h-full px-3 py-3 text-white bg-green-700 rounded-xl"
                aria-label="Add Transaction Form"
              >
     
                <div className="w-full flex items-start h-12 text-zinc-800 mb-5">
                  <select
                    name="from"
                    id="from"
                    className="rounded-sm border h-10 w-40"
                    onChange={(e) => {
                      setFrom(e.target.value);
                      setEndDate(() => {
                        const selectedBudget = amountData.find(
                          (budget: AmountGet) =>
                            budget.budgetFor === e.target.value
                        );
                        return selectedBudget
                          ? new Date(selectedBudget.endDate)
                          : null;
                      });
                    }}
                    value={from}
                    required
                  >
                    <option value="" disabled>
                      Select Budget
                    </option>
                    {amountData.map((amount: AmountGet) => (
                      <option key={amount._id} value={amount._id}>
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
                  {categoryData?.getAllCateGories?.map((cate: any) => (
                    <option
                      key={cate.nameOfCategorey}
                      value={cate.nameOfCategorey}
                    >
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
                  className="border-2 px-4 py-2 rounded-md bg-white text-green-700"
                >
                  Submit
                </button>

                {error && <p className="text-red-500 mt-3 text-lg">{error}</p>}
              </form>
            </DialogContent>
          ) : (
            <DialogContent className="flex flex-col items-center justify-center rounded-lg p-5">
             <DialogTitle>

                <span className="text-xl font-semibold ">
                  Seems like you haven’t added your budget yet
                </span>
             </DialogTitle>
                <Link href="/accounts">
                  <Button className="bg-green-700 text-white">
                    ADD BUDGET
                  </Button>
                </Link>

            </DialogContent>
          )}
        </Dialog>
      ) : (
        <Link href="/categories">
          <Button className="">ADD Categories</Button>
        </Link>
      )}
    </div>
  );
}

export default AddTransaction;
