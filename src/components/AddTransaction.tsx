import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

function AddTransaction({ className }: { className: string }) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [method, setMethod] = useState("");
  const [date, setDate] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState("");
  const [categoryGroup, setCategoryGroup] = useState<any[]>([]);

  const addTransaction = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !category || !method || !date || !transactionType) {
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
          date,
          note,
          method,
          category,
          transactionType,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        setAmount("");
        setNote("");
        setCategory("");
        setDate("");
        setMethod("");
        setTransactionType("");
        setDisable(true);
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

        console.log(result, "API response");

        if (result && Array.isArray(result.getAllCateGories)) {
          setCategoryGroup(result.getAllCateGories);
        } else {
          console.error("Unexpected API response structure for categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategory();
  }, []);

  return (
    <div
      className={cn(
        `absolute  top-[0%] -translate-y-[0%] left-1/2 -translate-x-1/2 bg-[#5849494f] w-[100vw] h-[100vh] z-[99] flex items-center justify-center flex-col `,
        className
      )}
    >
      <Button
        className={`rounded-full border-2 text-2xl w-fit h-fit bg-green-50 text-green-700 border-green-500  `}
        onClick={() => window.location.reload()}
      >
        X
      </Button>
      <form
        onSubmit={addTransaction}
        className={`flex flex-col items-start py-7   w-2/5 max-sm:w-4/5 px-9  border-2 border-transparent rounded-sm  mb-10 text-white bg-green-700 `}
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
        <button
          type="submit"
          disabled={disable}
          className="border-2 p-2 rounded-md"
        >
          Submit
        </button>
        {error && <p className="text-red-500 mt-3 text-l">{error}</p>}
      </form>
    </div>
  );
}

export default AddTransaction;
