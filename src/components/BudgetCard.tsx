import { AmountGet } from "@/app/accounts/page";
import { Amount, Transaction } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { set } from "mongoose";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "./ui/use-toast";

const BudgetCard = ({ budget }: { budget: AmountGet }) => {
  const [earn, setEarn] = useState(0);
  const [spend, setSpend] = useState(0);
  const [loan, setLoan] = useState(0);
  const [gradient, setGradinant] = useState("");
    const [total, setTotal] = useState<number>(0);
  const fetchTransactions = async () => {
    if (!budget) return [];
    try {
      const response = await fetch(
        `/api/get-transaction?from=${budget?.budgetFor}`
      );
      const result = await response.json();

      return Array.isArray(result.transactions) ? result.transactions : [];
    } catch (error) {
      console.error("Transaction fetch error:", error);
      alert("Currently our servers are not working, please try again later.");
      return [];
    }
  };
  console.log("budget", budget.budgetFor);

  const { data: transactionData = [] } = useQuery({
    queryKey: ["transaction",budget.budgetFor],
    queryFn: async () => fetchTransactions(),
  });




  const calculateTotalAmount = useCallback(
    (type: string) =>
      transactionData.reduce((total: number, transaction: Transaction) => {
        if (
          transaction.transactionType === type &&
          transaction.from === budget.budgetFor
        ) {
          const transactionDate = new Date(transaction.date);
          const startDate = new Date(budget?.startDate);
          const endDate = new Date(budget?.endDate);
          if (transactionDate >= startDate && transactionDate <= endDate) {
            return total + transaction.amount;
          }
        }
        return total;
      }, 0),
    [transactionData]
  );

  useEffect(() => {
    const earnVal = calculateTotalAmount("earn");
    const spendVal = calculateTotalAmount("spend");
    const loanVal = calculateTotalAmount("loan");
  
    setEarn(earnVal);
    setSpend(spendVal);
    setLoan(loanVal);
    setTotal(earnVal - spendVal); 
  }, [calculateTotalAmount]);
  
  useEffect(() => {
    const totalVal = Math.abs(earn) + Math.abs(spend) + Math.abs(loan);
  
    if (totalVal === 0) {
      setGradinant("linear-gradient(to right, #ccc 0%, #ccc 100%)");
      return;
    }
  
    const spendPercent = (Math.abs(spend) / totalVal) * 100;
    const earnPercent = (Math.abs(earn) / totalVal) * 100;
    const loanPercent = (Math.abs(loan) / totalVal) * 100;
  
    const gradient = `linear-gradient(
      to right,
      rgba(255,99,132,0.6) 0%,
      rgba(255,99,132,0.6) ${spendPercent.toFixed(2)}%,
      rgba(75,192,192,0.84) ${spendPercent.toFixed(2)}%,
      rgba(75,192,192,0.84) ${(spendPercent + earnPercent).toFixed(2)}%,
      rgba(241,241,4,0.6) ${(spendPercent + earnPercent).toFixed(2)}%,
      rgba(241,241,4,0.6) 100%
    )`;
  
    setGradinant(gradient);
  }, [earn, spend, loan]);
  
  

  

  return (
    <div className="w-96 h-48 bg-[rgba(46,204,113,0.5)] backdrop:blur-md border border-white/30 rounded-xl p-6 shadow-[0_4px_10px_2px_rgba(117,171,140,0.2)] hover:shadow-[0_4px_12px_3px_rgba(0,0,0,0.25)] hover:transition-all hover:duration-300 hover:ease-in-out duration-300 ease-in-out hover:scale-[1.01] flex flex-col gap-3 items-start relative">
      <div className="flex items-center gap-2">
        <Image
          src="/image1.jpg"
          alt="green"
          width={40}
          height={40}
          className="rounded-full"
        />
        <h1 className="text-2xl text-white/80 font-medium">
          {budget.budgetFor}
        </h1>
      </div>
      <div
      style={{ background: gradient }}
        className={`w-full h-4 rounded-lg group text-zinc-700`}
      >
        <div className="absolute top-2/3 -translate-y-2/3  left-2/3 -translate-x-1/3 rounded bg-white/20 backdrop:blur-lg hidden group-hover:block transition-all duration-300 ease-linear p-2 ">
          <ul className="text-base w-40 z-50 relative">
            <h1 className="border-b border-black/40 text-lg px-2">
              {budget.budgetFor} Usage
            </h1>
            <div className="border-b border-black/20 px-4">
              <li className="space-x-2 list-disc w-full marker:text-black/20 marker:text-xl hover:marker:text-black ">
                <span>Earn</span>
                <span>{earn}</span>
              </li>
            </div>
            <div className="border-b border-black/20 px-4">
              <li className="space-x-2 list-disc w-full marker:text-black/20 marker:text-xl hover:marker:text-black">
                <span>Spend</span>
                <span>{spend}</span>
              </li>
            </div>
            <div className="border-b border-black/20 px-4">
              <li className="space-x-2 list-disc w-full marker:text-black/20 marker:text-xl hover:marker:text-black">
                <span>Loan</span>
                <span>{loan}</span>
              </li>
            </div>
          </ul>
        </div>
      </div>
      <div></div>
      <div>
       <h1>
       {new Date(budget.startDate).toLocaleDateString("en-US") }
       </h1>

       <h1>
        {budget.amount}  {total}
       </h1>
       
       
      </div>
  
    </div>
  );
};

export default BudgetCard;
