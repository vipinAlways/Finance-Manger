import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Cross } from "lucide-react";

function AddTransaction({ className }: { className: string }) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [method, setMethod] = useState("");
  const [date, setDate] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [error, setError] = useState("");

  const addTransaction = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !category || !method || !date || !transactionType) {
      setError("All fields are required.");
      return;
    }

    setError("");
    try {
      let response = await fetch("http://localhost:3000/api/post-transaction", {
        method: "POST",
        body: JSON.stringify({
          amount,
          method,
          note,
          category,
          date,
          transactionType,
        }),
      });
      response = await response.json();
      console.log(response);
      if (response.ok) {
        console.log("Transaction added successfully");
        setAmount("");
        setNote("");
        setCategory("");
        setDate("");
        setMethod("");
        setTransactionType("");

        window.location.reload();
      } else {
        console.error("Failed to add transaction:", response);
      }
    } catch (error) {
      console.error("Error while adding transaction:", error);
    }
  };

  return (
    <div
      className={cn(
        `absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#5849494f] w-full h-full z-[99] `,
        className
      )}
    >
      <Button
        className={`rounded-full border-2 text-left absolute right-10 text-2xl w-fit h-fit bg-blue-50 text-blue-700 border-blue-500  `}
        onClick={() => window.location.reload()}
      >
        X
      </Button>
      <form
        onSubmit={addTransaction}
        className={`flex flex-col items-start py-7   w-2/5 max-sm:w-4/5 px-9  border-2 border-transparent rounded-sm absolute mb-10 text-white bg-blue-700 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  `}
      >
        <div className="flex flex-col gap-3 items-start my-3">
          <label htmlFor="amount" className="text-xl leading-none">
            Amount
          </label>
          <input
            type="text"
            onChange={(e) => setAmount(e.target.value)}
            name="amount"
            placeholder="Enter amount"
            id="amount"
            className="border w-60  h-8 rounded-sm text-black "
            value={amount}
          />
        </div>
        <div className="flex flex-col gap-3 items-start my-3">
          <label htmlFor="date" className="text-xl leading-none">
            Date
          </label>
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            name="date"
            placeholder="Enter date"
            id="date"
            className="border w-60  h-8 rounded-sm  text-black"
            value={date}
          />
        </div>

        <div className="flex flex-col gap-3 items-start my-3">
          <label htmlFor="method" className="text-xl leading-none">
            Method
          </label>
          <select
            onChange={(e) => setMethod(e.target.value)}
            name="method"
            id="method"
            className="border w-60  h-8 rounded-sm text-black "
            value={method}
          >
            <option value="" disabled >
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
        <div className="flex flex-col gap-3 items-start my-3">
          <label htmlFor="category" className="text-xl leading-none">
            Category
          </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            id="category"
            className="border w-60  h-8 rounded-sm text-black "
            value={category}
          >
            <option value="" disabled >
              Select a Category
            </option>
            <option value="car">Car</option>
            <option value="petrol">Petrol</option>
            <option value="food">Food</option>
            <option value="freelance">freelace</option>
            <option value="pocketMoney">Pocket Money</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex flex-col gap-3 items-start my-3">
          <label htmlFor="transactionTyped" className="text-xl leading-none">
            Transaction Type
          </label>
          <select
            onChange={(e) => setTransactionType(e.target.value)}
            name="transactionType"
            id="transactionType"
            className="border w-60  h-8 rounded-sm text-black "
            value={transactionType}
          >
             <option value="" disabled >Select a Transaction Type</option>
            <option value="spend" className="text-black">
              Spend
            </option>
            <option value="earn" className="text-black">
              Earn
            </option>
          </select>
        </div>
        <div className="flex flex-col gap-3 items-start my-3">
          <label htmlFor="note" className="text-xl leading-none">
            Note
          </label>
          <input
            type="text"
            onChange={(e) => setNote(e.target.value)}
            name="note"
            placeholder="Enter note"
            id="note"
            className="border w-60  h-8 rounded-sm text-black "
            value={note}
          />
        </div>
        <button type="submit" className="border-2 p-2 rounded-md">
          Submit
        </button>
        {error && <p className="text-red-500 mt-3 text-l">{error}</p>}
      </form>
    </div>
  );
}

export default AddTransaction;
