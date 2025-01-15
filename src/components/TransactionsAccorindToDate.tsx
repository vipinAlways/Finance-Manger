import { cn } from '@/lib/utils';
import { Transaction } from '@/Models/Transaction.model';
import React, { useEffect, useState } from 'react'

function TransactionsAccorindToDate() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [from , setStartDate] = useState('')
  const [to , setEndDate] = useState('')
  const [earnAmount, setEarnAmount] = useState<number>(0);
  const [spendAmount, setSpendAmount] = useState<number>(0);
  const [loanAmount, setLoanAmount] = useState<number>(0);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch(
          `/api/get-transaction?page=1&perpage=${transactions.length}`
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
  }, [transactions.length]);

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
  return (
    <div className='w-full'>
        <div className='flex items-center gap-9 justify-center w-full'>
            <div className='flex flex-col items-center gap-2 '>
              <label htmlFor="from" className='lg:text-xl max-sm:text-sm max-md:text-lg'>From</label>
            <input type="date" name="from" id="from" onChange={(e)=>setStartDate(e.target.value)} value={from} className='bg-green-500 text-white p-2.5 rounded-lg lg:text-xl max-sm:text-sm max-md:text-lg ' />
            </div>
            <div className='flex flex-col items-center gap-2 '>
              <label htmlFor="to" className='lg:text-xl max-sm:text-sm max-md:text-lg'>To</label>
            <input type="date" name="to" id="to" onChange={(e)=>setEndDate(e.target.value)} value={to }  className='bg-green-500 text-white p-2.5 rounded-lg lg:text-xl max-sm:text-sm max-md:text-lg '/>
            </div>
        </div>

       <div className={cn('flex items-start justify-evenly w-full mt-4 lg:mt-6  ' , from === ''  || to=== ''  ? "hidden"  :'')}>
       {["earn", "spend", "loan"].map((type) => (
              <table key={type} className="flex flex-col items-center">
                <thead
                  className={`px-3 py-0.5 rounded-md text-white ${
                    type === "earn"
                      ? "bg-green-400"
                      : type === "spend"
                      ? "bg-red-400"
                      : "bg-yellow-400 text-zinc-100"
                  }`}
                >
                  <tr>
                    <th>{type.charAt(0).toUpperCase() + type.slice(1)}</th>
                  </tr>
                </thead>
                <tbody className="flex flex-col items-center lg:mt-4 mt-2 gap-3">
                  {transactions
                    .filter(
                      (transaction) =>
                        transaction.transactionType === type &&
                        new Date(transaction.date) >= new Date(from) &&
                        new Date(transaction.date) <= new Date(to)
                    )
                    .map((transaction) => (
                      <tr key={[transaction._id].toLocaleString()} className='flex items-end gap-3'>
                       <td>{transaction.amount}</td>
                        <td className='font-semibold'>{transaction.category}</td>
                      </tr>
                    ))}
                  <tr>
                    <td>
                      <strong>
                        Total:{" "}
                        <span
                          className={
                            type === "earn"
                              ? "text-green-500"
                              : type === "spend"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }
                        >
                          {type === "earn"
                            ? earnAmount
                            : type === "spend"
                            ? spendAmount
                            : loanAmount}
                        </span>
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
       </div>
    </div>
  )
}

export default TransactionsAccorindToDate