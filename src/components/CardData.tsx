"use client";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/scrollbar";
import Link from "next/link";
import { Amount, Transaction } from "@/types";

function Data({ forWhich }: { forWhich: string }) {
  const [amount, setAmount] = useState<number>(0);
  const [from, setStartDate] = useState<string>("");
  const [to, setEndDate] = useState<string>("");
  const [budget, setBudget] = useState<Amount[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [earnAmount, setEarnAmount] = useState<number>(0);
  const [spendAmount, setSpendAmount] = useState<number>(0);
  const [loanAmount, setLoanAmount] = useState<number>(0);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch(
          `/api/get-transaction?page=1&perpage=20&from=${forWhich}`
        );
        const result = await response.json();

        if (result.transactions) {
          setTransactions(result.transactions);
        } else if (Array.isArray(result)) {
          setTransactions(result);
        } else {
          console.error("Error in transaction response");
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
            new Date(transaction.date) >= new Date(from) &&
            new Date(transaction.date) <= new Date(to)
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
        console.log("carddata");
        const result = await response.json();

        if (result.ok) {
          if (Array.isArray(result.amount)) {
            setBudget(result.amount);
          } else {
            console.error("Unexpected API response structure from amount");
          }
        } else {
          console.error("Error in fetching budget");
        }
      } catch (error) {
        console.error("Failed to fetch budget:", error);
      }
    };

    fetchBudget();
  }, [forWhich]);



 

  useEffect(() => {
    if (budget.length > 0) {
      budget.forEach((data) => {
        if (new Date(data.endDate) > new Date()) {
          setAmount(data.amount);
          setEndDate(new Date(data.endDate).toLocaleDateString());
          setStartDate(new Date(data.startDate).toLocaleDateString());
        } else {
          setAmount(0);
        }
      });
    }
    if (forWhich === "") {
     const total =  budget.reduce((total, data) => total + data.amount, 0)
      setAmount(total);
    }

  }, [forWhich,budget.length,budget]);

  const blances =  [
    {
      name:"Remaining Balance",
      amount:amount + (earnAmount - spendAmount),
      color:"bg-gradient-to-tr from-green-400 via-red-300 to-yellow-400"
    },
    {
      name:"Earned Amount",
      amount:earnAmount ,
      color:"bg-green-500"
    },
    {
      name:"Spend Amount",
      amount:spendAmount ,
      color:"bg-red-500"
    },
    {
      name:"Loan Amount",
      amount:loanAmount ,
      color:"bg-yellow-500"
    },
    
  ]

  return (
    <div className="flex  justify-evenly w-full flex-1 gap-2 items-center h-full flex-wrap">
     {
      blances.map((balance,index)=>(
        <Link
        href="/acounts"
        className={`hover:scale-105 transition ease-out hover:duration-200 h-32 md:w-52 w-32  flex items-center justify-around flex-col lg:text-lg max-sm:text-sm max-md:text-base p-2.5 py-4  text-white font-semibold rounded-xl ${balance.color}`}
        key={index}
      >
        <div>
          <h1 className="mb-2 underline">{balance.name}</h1>
         
        </div>
        <p className="lg:text-xl max-sm:text-sm max-md:text-lg">
          {balance.amount.toFixed(2)}
        </p>
      </Link>
      ))
     }

    
    </div>
  );
}

export default Data;
