"use client";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/scrollbar";
import Link from "next/link";
import { Amount, Transaction } from "@/types";

function Data({ forWhich = "" }: { forWhich: string }) {
  const [amount, setAmount] = useState<number>(0);
  const [from, setStartDate] = useState<Date>();
  const [to, setEndDate] = useState<Date>();
  const [budget, setBudget] = useState<Amount[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [earnAmount, setEarnAmount] = useState<number>(0);
  const [spendAmount, setSpendAmount] = useState<number>(0);
  const [loanAmount, setLoanAmount] = useState<number>(0);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch(`/api/get-transaction?from=${forWhich}`);
        const result = await response.json();

        if (result.transactions && Array.isArray(result.transactions)) {
          setTransactions(result.transactions);
        } else {
          return [];
        }
      } catch (error) {
        alert("Currently our servers are not working, please try again later.");
      }
    }

    fetchTransactions();
  }, [forWhich]);

  useEffect(() => {
    const calculateTotalAmount = (type: string) =>
      transactions
        .filter((transaction) => transaction.transactionType === type)
        .reduce((total, transaction) => {
          if (
            new Date(transaction.date) >= from! &&
            new Date(transaction.date) <= to!
          ) {
            return total + transaction.amount;
          }
          return total;
        }, 0);

    setEarnAmount(calculateTotalAmount("earn"));
    setLoanAmount(calculateTotalAmount("loan"));
    setSpendAmount(calculateTotalAmount("spend"));
  }, [transactions, from, to]);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await fetch(`/api/get-amount?from=${forWhich}`);
        const result = await response.json();

        if (result.ok) {
          if (Array.isArray(result.budgetCurrent)) {
            setBudget(result.budgetCurrent);
          } else {
            console.error("Unexpected API response structure from amount");
            return [];
          }
        } else {
          console.error("Error in fetching budget");
          throw new Error("Sorry server error");
        }
      } catch (error) {
        console.error("Failed to fetch budget:", error);
        throw new Error("Sorry server error");
      }
    };

    fetchBudget();
  }, [forWhich]);
  useEffect(() => {
    if (budget.length > 0) {
      if (forWhich === "") {
        let earliestStart = new Date(budget[0].startDate);
        let latestEnd = new Date(budget[0].endDate);

        budget.forEach(({ startDate, endDate }) => {
          const start = new Date(startDate);
          const end = new Date(endDate);

          if (start < earliestStart) earliestStart = start;
          if (end > latestEnd) latestEnd = end;
        });

        setStartDate(earliestStart);
        setEndDate(latestEnd);

        const totalAmount = budget.reduce((sum, b) => sum + b.amount, 0);
        setAmount(totalAmount);
      } else {
        const futureBudget = budget.find(
          (b) => new Date(b.endDate) > new Date()
        );

        if (futureBudget) {
          setAmount(futureBudget.amount);
          setStartDate(new Date(futureBudget.startDate));
          setEndDate(new Date(futureBudget.endDate));
        } else {
          setAmount(0);
        }
      }
    }
  }, [forWhich, budget]);

  const blances = [
    {
      name: "Remaining Balance",
      amount: amount + (earnAmount + spendAmount),
      color: "bg-gradient-to-tr from-green-400 via-red-300 to-yellow-400",
    },
    {
      name: "Earned Amount",
      amount: earnAmount,
      color: "bg-[#2ecc71]",
    },
    {
      name: "Spend Amount",
      amount: spendAmount,
      color: "bg-red-500",
    },
    {
      name: "Loan Amount",
      amount: loanAmount,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="flex justify-evenly w-full flex-1 gap-2 max-lg:gap-4 items-center h-fit flex-wrap">
      {blances.map((balance, index) => (
        <Link
          href="/acounts"
          className={`hover:scale-105 transition ease-out hover:duration-200 h-32 lg:w-52 w-[90%] flex items-center justify-around flex-col lg:text-lg max-sm:text-sm max-md:text-base p-2.5 py-4 text-white font-semibold rounded-xl ${balance.color}`}
          key={index}
        >
          <div>
            <h1 className="mb-2 underline">{balance.name}</h1>
          </div>
          <p className="lg:text-xl max-sm:text-sm max-md:text-lg">
            {balance.amount.toFixed(2)}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default Data;
