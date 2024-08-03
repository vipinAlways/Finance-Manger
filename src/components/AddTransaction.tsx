import { cn } from "@/lib/utils";
import React, { useState } from "react";

function AddTransaction({ className }: { className: string }) {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [category, setCategory] = useState('');
  const [method, setMethod] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const addTransaction = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if any input field is empty
    if (!amount || !note || !category || !method || !date) {
      setError('All fields are required.');
      return;
    }

    setError(''); // Clear any existing error message

    try {
      let response = await fetch("http://localhost:3000/api/post-transaction", {
        method: "POST",
        body: JSON.stringify({ amount, method, note, category, date }),
      });
      response = await response.json();
      if (response.ok) {
        console.log("Transaction added successfully");
        setAmount('');
        setNote('');
        setCategory('');
        setDate('');
        setMethod('');
      } else {
        console.error("Failed to add transaction:", response);
      }
    } catch (error) {
      console.error("Error while adding transaction:", error);
    }
  };

  return (
    <div className={cn(``, className)}>
      <form onSubmit={addTransaction}>
        <label htmlFor="amount">Amount</label>
        <input
          type="text"
          onChange={(e) => setAmount(e.target.value)}
          name="amount"
          placeholder="Enter amount"
          id="amount"
          className="border w-60 h-8 rounded-sm m-3"
          value={amount}
        />
        <label htmlFor="date">Date</label>
        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
          name="date"
          placeholder="Enter date"
          id="date"
          className="border w-60 h-8 rounded-sm m-3"
          value={date}
        />
        <label htmlFor="method">Method</label>
        <input
          type="text"
          onChange={(e) => setMethod(e.target.value)}
          name="method"
          placeholder="Enter method"
          id="method"
          className="border w-60 h-8 rounded-sm m-3"
          value={method}
        />
        <label htmlFor="category">Category</label>
        <input
          type="text"
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          placeholder="Enter category"
          id="category"
          className="border w-60 h-8 rounded-sm m-3"
          value={category}
        />
        <label htmlFor="note">Note</label>
        <input
          type="text"
          onChange={(e) => setNote(e.target.value)}
          name="note"
          placeholder="Enter note"
          id="note"
          className="border w-60 h-8 rounded-sm m-3"
          value={note}
        />
        <button type="submit" className="border">
          Submit
        </button>
      </form>
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
}

export default AddTransaction;
