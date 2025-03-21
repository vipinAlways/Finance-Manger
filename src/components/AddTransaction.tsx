import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { User } from "../types";
import Link from "next/link";

function AddTransaction({ className }: { className: string }) {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [method, setMethod] = useState("");
  const [dateAt, setDate] = useState<Date | null>();
  const [transactionType, setTransactionType] = useState("");
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState("");
  const [categoryGroup, setCategoryGroup] = useState<any[]>([]);
  const [getAmountFor, setGetAmountFor] = useState<any[]>([]);

  const addTransaction = async (e: React.FormEvent) => {
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

    setError("");

    try {
      const response = await fetch("/api/post-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          dateAt,
          note,
          method,
          category,
          transactionType,
          from,
        }),
      });

      if (response.ok) {
        await response.json();
        setAmount("");
        setNote("");
        setCategory("");
        setDate(null);
        setMethod("");
        setTransactionType("");
        setDisable(true);
        setFrom("");
        setError("");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to add transaction.");
      }
    } catch (error) {
      console.error("Error while adding transaction:", error);
      setError("An error occurred while adding the transaction.");
    }
  };

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
  }, [setCategory, setError]);

  useEffect(() => {
    const getAmount = async () => {
      try {
        const response = await fetch(`/api/get-amount`);

        const result = await response.json();
        if (result && Array.isArray(result.budgetCurrent)) {
          setGetAmountFor(result.budgetCurrent);
        } else {
          console.error("Unexpected API response structure for amounts");
          setError("Failed to fetch amounts.");
        }
      } catch (error) {
        console.error("Error fetching amounts:", error);
        setError("An error occurred while fetching amounts.");
      }
    };

    getAmount();
  }, []);

  return (
    <div
      className={cn(
        "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-0 bg-[#5849494f] w-[100vw] h-[100vh] z-[99] flex items-center justify-center flex-col",
        className
      )}
    >
      {getAmountFor.length > 0 && categoryGroup.length > 0 ? (
        <form
          onSubmit={addTransaction}
          className="flex flex-col items-center py-7 w-2/5 max-sm:w-4/5 px-9 mb-10 text-white bg-green-700 rounded-xl relative"
        >
          <Button
            className="rounded-full text-xl w-fit h-fit bg-green-50 text-green-700 hover:text-zinc-100 border-green-500 absolute top-1 right-2"
            onClick={() => window.location.reload()}
          >
            X
          </Button>
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
                Select Amount For
              </option>
              {getAmountFor.map((amount, index) => (
                <option key={index} value={amount.budgetFor}>
                  {amount.budgetFor}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5 items-start mb-5 w-2/3">
            <label htmlFor="amount" className="text-xl leading-none">
              Amount
            </label>
            <input
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              name="amount"
              placeholder="Enter amount"
              id="amount"
              className="border h-10 rounded-sm text-black w-full"
              value={amount}
            />
          </div>
          <div className="flex flex-col gap-1.5 items-start mb-5 w-2/3">
            <label htmlFor="date" className="text-xl leading-none">
              Date
            </label>
            <input
              type="date"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDate(new Date(e.target.value))
              }
              name="date"
              id="date"
              className="border h-10 rounded-sm text-black w-full"
              value={dateAt ? dateAt.toISOString().split("T")[0] : ""}
            />
          </div>

          <div className="flex flex-col gap-1.5 items-start mb-5 w-2/3">
            <label htmlFor="method" className="text-xl leading-none">
              Method
            </label>
            <select
              onChange={(e) => setMethod(e.target.value)}
              name="method"
              id="method"
              className="border h-10 rounded-sm text-black w-full"
              value={method}
            >
              <option value="" disabled>
                Select a Method
              </option>
              <option value="cash" className="text-black">
                Cash
              </option>
              <option value="online" className="text-black">
                Online
              </option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5 items-start mb-5 w-2/3">
            <label htmlFor="category" className="text-xl leading-none">
              Category
            </label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              id="category"
              className="border h-10 rounded-sm text-black w-full"
              value={category}
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
          <div className="flex flex-col gap-1.5 items-start mb-5 w-2/3">
            <label htmlFor="transactionTyped" className="text-xl leading-none">
              Transaction Type
            </label>
            <select
              onChange={(e) => setTransactionType(e.target.value)}
              name="transactionType"
              id="transactionType"
              className="border h-10 rounded-sm text-black  w-full"
              value={transactionType}
            >
              <option value="" disabled>
                Select a Transaction Type
              </option>
              <option value="spend" className="text-black">
                Spend
              </option>
              <option value="earn" className="text-black">
                Earn
              </option>
              <option value="loan" className="text-black">
                Loan
              </option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5 items-start mb-5 w-2/3">
            <label htmlFor="note" className="text-xl leading-none">
              Note
            </label>
            <input
              type="text"
              onChange={(e) => setNote(e.target.value)}
              name="note"
              placeholder="Enter note"
              id="note"
              className="border h-10 rounded-sm text-black  w-full"
              value={note}
            />
          </div>

          <button
            type="submit"
            disabled={disable}
            className="border-2 p-2 rounded-md"
          >
            Submit
          </button>
          {error && <p className="text-red-500 mt-3 text-l">{error}</p>}
        </form>
      ) : (
        <div>
          {getAmountFor.length === 0 && categoryGroup.length === 0 ? (
            <div className="flex flex-col items-center gap-5 relative">
              <Button
                className="rounded-full text-xl w-fit h-fit bg-green-50 text-green-700 hover:text-zinc-100 border-green-500 absolute -top-10 right-0"
                onClick={() => window.location.reload()}
              >
                X
              </Button>
              <h1 className="text-center text-3xl text-zinc-100 ">
                Opps ! Looks like You Haven&#39;t Asign any budget and Category
              </h1>
              <div className="flex gap-5 justify-center">
                <Link
                  href="/acounts"
                  className="text-green-500 p-2 rounded-lg  bg-zinc-200"
                >
                  Set Budget
                </Link>
                <Link
                  href="/categories"
                  className="text-green-500 p-2 rounded-lg  bg-zinc-200"
                >
                  Set Category
                </Link>
              </div>
            </div>
          ) : (
            <div>
              {getAmountFor.length === 0 ? (
                <div className="flex flex-col items-center gap-5 relative ">
                  <Button
                    className="rounded-full text-xl w-fit h-fit bg-green-50 text-green-700 hover:text-zinc-100 border-green-500 absolute -top-10 right-0"
                    onClick={() => window.location.reload()}
                  >
                    X
                  </Button>
                  <h1 className="text-center text-3xl text-zinc-100 ">
                    Opps ! Looks like You Haven&#39;t Asign any budget
                  </h1>
                  <div>
                    <Link
                      href="/acounts"
                      className="text-green-500 p-2 rounded-lg  bg-zinc-200"
                    >
                      Set Budget
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-5 relative">
                  <Button
                    className="rounded-full text-xl w-fit h-fit bg-green-50 text-green-700 hover:text-zinc-100 border-green-500 absolute -top-10 right-0"
                    onClick={() => window.location.reload()}
                  >
                    X
                  </Button>
                  <h1 className="text-center text-3xl text-zinc-100 ">
                    Opps ! Looks like You Haven&#39;t Asign any Category
                  </h1>
                  <div>
                    <Link
                      href="/categories"
                      className="text-green-500 p-2 rounded-lg  bg-zinc-200"
                    >
                      Set Category
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AddTransaction;
