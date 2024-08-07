"use client";

import { Button } from "@/components/ui/button";
import { Transaction } from "@/model/transaction.model";
import React, { useEffect, useState } from "react";

function Page() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [duration, setDuration] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [amount, setAmount] = useState("");

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
            "Currently our servers are not working, please try again later."
          );
        }
      } catch (error) {
        alert("Currently our servers are not working, please try again later.");
      }
    }

    fetchTransactions();
  }, []);

  const amountChange = () => {
    if (duration === "Weekly") {
      setIsDisabled(true);

      setTimeout(() => {
        setIsDisabled(false);
      }, 604800000);
    } else {
      const date = new Date();
      const month = date.getMonth();
      const year = date.getFullYear();
      let timeOut;
      if (
        month === 1 ||
        month === 3 ||
        month === 5 ||
        month === 7 ||
        month === 8 ||
        month === 10 ||
        month === 12
      ) {
        timeOut = 2678400000;
      } else if (month === 2) {
        timeOut = 2419200000;
      } else if (month === 2 && year % 4 === 0) {
        timeOut === 2505600000;
      } else {
        timeOut === 2592000000;
      }
      setIsDisabled(true);

      setTimeout(() => {
        setIsDisabled(false);
      }, timeOut);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex justify-evenly items-center">
        <div className="flex lg:gap-4 gap-2 items-center">
          <input
            type="text"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            placeholder="Set your Estimate Amount"
            className="border-2 lg:p-2 lg:text-lg max-sm:text-sm text-lg rounded-md "
            readOnly={isDisabled}
          />
          <Button
            className="lg:p-2 lg:text-lg text-sm md:text-lg "
            disabled={isDisabled}
            onClick={amountChange}
          >
            Submit
          </Button>
        </div>

        <div>
          <select
            name="duration"
            id="duration"
            className="lg:w-36 p-1.5 lg:text-lg text-sm"
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
          >
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>
      </div>

      <div>
        
      </div>
    </div>
  );
}

export default Page;
