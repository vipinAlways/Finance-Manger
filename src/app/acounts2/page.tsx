// "use client";

// import React, { useEffect, useState } from "react";
// import PostAmount from "@/components/PostAmount";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { Amount } from "@/model/amount.model";
// import { Transaction } from "@/model/transaction.model";

// const Page = () => {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [duration, setDuration] = useState("Weekly");
//   const [amount, setAmount] = useState<number>(0);
//   const [earnAmount, setEarnAmount] = useState<number>(0);
//   const [spendAmount, setSpendAmount] = useState<number>(0);
//   const [loanAmount, setLoanAmount] = useState<number>(0);
//   const [loader, setLoader] = useState(true);
//   const [fetchedAmount, setFetchedAmount] = useState<Amount[]>([]);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const response = await fetch(`/api/get-transaction?page=1&perpage=${transactions.length}`);
//         const result = await response.json();

//         if (result.transactions || Array.isArray(result)) {
//           setTransactions(result.transactions || result);
//         } else {
//           console.error("Error in transaction data");
//         }
//       } catch (error) {
//         alert("Server error, please try again later.");
//       }
//     };

//     fetchTransactions();
//   }, []);

//   useEffect(() => {
//     const fetchAmounts = async () => {
//       try {
//         const response = await fetch("/api/get-amount");
//         const result = await response.json();

//         if (result.amount || Array.isArray(result)) {
//           setFetchedAmount(result.amount || result);
//         } else {
//           alert("Server error, please try again later.");
//         }
//       } catch (error) {
//         console.error("Error fetching amounts:", error);
//         alert("Server error, please try again later.");
//       }
//     };

//     fetchAmounts();
//   }, []);

//   useEffect(() => {
//     const calculateTotalAmount = (type: string) =>
//       transactions
//         .filter((transaction) => transaction.transactionType === type)
//         .reduce((total, transaction) => total + transaction.amount, 0);

//     setEarnAmount(calculateTotalAmount("earn"));
//     setLoanAmount(calculateTotalAmount("loan"));
//     setSpendAmount(calculateTotalAmount("spend"));
//   }, [transactions]);

//   useEffect(() => {
//     const calculateAmount = () => {
//       const oneWeekAgo = new Date();
//       oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

//       const oneMonthAgo = new Date();
//       oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

//       const currentDate = new Date();

//       if (!fetchedAmount.length) {
//         setAmount(0);
//         return;
//       }

//       const match = fetchedAmount.find((fetch) => {
//         const fetchDate = new Date(fetch.createdAt);

//         if (duration === "Weekly" && fetchDate >= oneWeekAgo && fetch.Weekly !== null) {
//           setAmount(fetch.Weekly);
//           return true;
//         } else if (duration === "Monthly" && fetchDate >= oneMonthAgo && fetch.Monthly !== null) {
//           setAmount(fetch.Monthly);
//           return true;
//         }
//         return false;
//       });

//       if (!match) {
//         alert(`You have not assigned a budget for this ${duration.toLowerCase()}`);
//         setAmount(0);
//       }
//     };

//     calculateAmount();
//   }, [duration, fetchedAmount]);

//   useEffect(() => {
//     const currentDate = new Date();

//     if (duration === "Weekly" && currentDate.getDay() === 7) {
//       alert("Weekly budget has expired");
//       setAmount(0);
//     } else if (duration === "Monthly" && currentDate.getDate() === 1) {
//       alert("Monthly budget has expired");
//       setAmount(0);
//     }
//   }, [duration]);

//   useEffect(() => {
//     setTimeout(() => setLoader(false), 1000);
//   }, []);

//   if (loader) {
//     return (
//       <div className="mt-4 flex justify-center items-center space-x-2">
//         {[0, 0.2, 0.4].map((delay, index) => (
//           <div
//             key={index}
//             className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"
//             style={{ animationDelay: `${delay}s` }}
//           ></div>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="relative mt-4 flex max-sm:flex-col max-sm:items-center max-md:pt-6 lg:pt-8 max-sm:pt-4 gap-5 h-[66vh]">
//       <div className="absolute left-full top-0 -translate-x-full -translate-y-0">
//         <select
//           name="duration"
//           id="duration"
//           className="lg:w-36 p-1.5 lg:p-2 border-2 lg:text-lg text-sm rounded-md"
//           onChange={(e) => setDuration(e.target.value)}
//           value={duration}
//         >
//           <option value="Weekly">Weekly</option>
//           <option value="Monthly">Monthly</option>
//         </select>
//       </div>

//       {amount === 0 ? (
//         <div className="flex flex-col justify-between items-center">
//           <PostAmount />
//           <h1>You have not assigned your {duration} balance</h1>
//         </div>
//       ) : (
//         <div className="flex flex-col items-center lg:sticky max-md:sticky top-0 w-1/3 max-sm:w-full">
//           <span className="mb-4 animate-blink text-blue-500 text-sm max-sm:mb-1 max-sm:tracking-tight max-sm:mt-5">
//             <span className="font-bold text-black">Note:</span> YOUR {duration} BUDGET WILL EXPIRE{" "}
//             {duration === "Weekly" ? "IN 7 DAYS" : "AFTER A MONTH"}
//           </span>
//           <h1 className="flex flex-col text-center mt-4 gap-3 items-center font-bold w-full bg-blue-600 max-sm:text-xl rounded-lg lg:text-3xl max-md:text-2xl">
//             {duration} Budget
//             <span className="text-white bg-blue-600 px-4 py-1.5 max-sm:text-xl rounded-lg lg:text-2xl max-md:text-2xl w-fit">
//               {amount}
//             </span>
//           </h1>
//           <div className="max-md:text-xl max-sm:text-lg text-2xl w-full mt-2 lg:mt-6 flex flex-col items-center justify-around bg-blue-600 rounded-lg">
//             <h1 className="font-semibold text-center">Remaining balance of {duration}</h1>
//             <span
//               className={cn(
//                 "p-2 rounded-lg text-center",
//                 amount + earnAmount - spendAmount < 0 ? "text-red-400" : "text-green-400"
//               )}
//             >
//               {amount + earnAmount - spendAmount}
//             </span>
//           </div>
//         </div>
//       )}

//       <div className="flex flex-col w-2/3 max-sm:w-full items-center">
//         <div className="mt-4 lg:mt-7">
//           <h1 className="lg:text-3xl max-sm:text-2xl max-sm:tracking-tight max-sm:mb-4 text-center text-blue-500">
//             Here is your {duration} financial data
//           </h1>
//           <div className="flex justify-around lg:mt-6 mt-3 flex-1">
//             {["earn", "spend", "loan"].map((type) => (
//               <table key={type} className="flex flex-col items-center">
//                 <thead
//                   className={`px-3 py-0.5 rounded-md text-white ${
//                     type === "earn"
//                       ? "bg-green-400"
//                       : type === "spend"
//                       ? "bg-red-400"
//                       : "bg-yellow-400 text-zinc-100"
//                   }`}
//                 >
//                   <tr>
//                     <th>{type.charAt(0).toUpperCase() + type.slice(1)}</th>
//                   </tr>
//                 </thead>
//                 <tbody className="flex flex-col items-center lg:mt-4 mt-2">
//                   {transactions
//                     .filter((transaction) => transaction.transactionType === type)
//                     .map((transaction) => (
//                       <tr key={[transaction._id].toLocaleString()}>
//                         <td>{transaction.amount}</td>
//                       </tr>
//                     ))}
//                   <tr>
//                     <td>
//                       <strong>
//                         Total:{" "}
//                         <span
//                           className={
//                             type === "earn"
//                               ? "text-green-500"
//                               : type === "spend"
//                               ? "text-red-600"
//                               : "text-yellow-600"
//                           }
//                         >
//                           {type === "earn"
//                             ? earnAmount
//                             : type === "spend"
//                             ? spendAmount
//                             : loanAmount}
//                         </span>
//                       </strong>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;


"use client";

import React, { useEffect, useState } from "react";
import PostAmount from "@/components/PostAmount";
import { cn } from "@/lib/utils";
import { Amount } from "@/model/amount.model";
import { Transaction } from "@/model/transaction.model";

const Page = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [duration, setDuration] = useState("Weekly");
  const [amount, setAmount] = useState<number>(0);
  const [earnAmount, setEarnAmount] = useState<number>(0);
  const [spendAmount, setSpendAmount] = useState<number>(0);
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [loader, setLoader] = useState(true);
  const [fetchedAmount, setFetchedAmount] = useState<Amount[]>([]);


  function getCurrentWeekRange(): { startOfWeek: Date; endOfWeek: Date } {
    const now = new Date();
  
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    startOfWeek.setHours(0, 0, 0, 0); 
  
  
    const endOfWeek = new Date(now);
    endOfWeek.setHours(23, 59, 59, 999); 
    console.log(startOfWeek,endOfWeek);
    return { startOfWeek, endOfWeek };
  }
  
  function getCurrentMonthRange(): { startOfMonth: Date; endOfMonth: Date } {
    const now = new Date();
  
    // Start of the month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    startOfMonth.setHours(0, 0, 0, 0); // Set to the start of the day
  
    // End of the month
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of the month
    endOfMonth.setHours(23, 59, 59, 999); // Set to the end of the day
  console.log(startOfMonth,endOfMonth);
    return { startOfMonth, endOfMonth };
  }
  

  // Fetch and filter transactions
  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch(`/api/get-transaction?page=1&perpage=${transactions.length}`);
        const result = await response.json();

        if (result.amount || Array.isArray(result)) {
          if (duration === "Weekly") {
           const { startOfWeek, endOfWeek } = getCurrentWeekRange();
          const filteredTransactionsOfWeek:Transaction[] = (result.transactions || result).filter(
            (transaction: Transaction) => {
              
              return  transaction.date > startOfWeek &&  transaction.date < endOfWeek;
            }
          );
          setTransactions(filteredTransactionsOfWeek);
         }
         
          const {startOfMonth,endOfMonth} = getCurrentMonthRange()
         const filteredTransactionsOfMonth:Transaction[] = (result.transactions || result).filter(
          (transaction: Transaction) => {
            const transactionDate = new Date(transaction.date);
            return transactionDate >= startOfMonth && transactionDate <= endOfMonth;
          }
        );
        setTransactions(filteredTransactionsOfMonth);
        } else {
          console.error("Error in transaction data");
        }
      } catch (error) {
        alert("Server error, please try again later.");
      }
    }

    fetchTransactions();
  }, []);

  useEffect(() => {
    const fetchAmounts = async () => {
      try {
        const response = await fetch("/api/get-amount");
        const result = await response.json();

        if (result.amount || Array.isArray(result)) {
          setFetchedAmount(result.amount || result);
        } else {
          alert("Server error, please try again later.");
        }
      } catch (error) {
        console.error("Error fetching amounts:", error);
        alert("Server error, please try again later.");
      }
    };

    fetchAmounts();
  }, []);

  useEffect(() => {
    const calculateTotalAmount = (type: string) =>
      transactions
        .filter((transaction) => transaction.transactionType === type)
        .reduce((total, transaction) => total + transaction.amount, 0);

    setEarnAmount(calculateTotalAmount("earn"));
    setLoanAmount(calculateTotalAmount("loan"));
    setSpendAmount(calculateTotalAmount("spend"));
  }, [transactions]);

  useEffect(() => {
    const calculateAmount = () => {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      if (!fetchedAmount.length) {
        setAmount(0);
        return;
      }

      const match = fetchedAmount.find((fetch) => {
        const fetchDate = new Date(fetch.createdAt);

        if (duration === "Weekly" && fetchDate >= oneWeekAgo && fetch.Weekly !== null) {
          setAmount(fetch.Weekly);
          return true;
        } else if (duration === "Monthly" && fetchDate >= oneMonthAgo && fetch.Monthly !== null) {
          setAmount(fetch.Monthly);
          return true;
        }
        return false;
      });

      if (!match) {
        alert(`You have not assigned a budget for this ${duration.toLowerCase()}`);
        setAmount(0);
      }
    };

    calculateAmount();
  }, [duration, fetchedAmount]);

  useEffect(() => {
    const currentDate = new Date();

    if (duration === "Weekly" && currentDate.getDay() === 7) {
      alert("Weekly budget has expired");
      setAmount(0);
    } else if (duration === "Monthly" && currentDate.getDate() === 1) {
      alert("Monthly budget has expired");
      setAmount(0);
    }
  }, [duration]);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);
  }, []);

  if (loader) {
    return (
      <div className="mt-4 flex justify-center items-center space-x-2">
        {[0, 0.2, 0.4].map((delay, index) => (
          <div
            key={index}
            className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: `${delay}s` }}
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative mt-4 flex max-sm:flex-col max-sm:items-center max-md:pt-6 lg:pt-8 max-sm:pt-4 gap-5 h-[66vh]">
      <div className="absolute left-full top-0 -translate-x-full -translate-y-0">
        <select
          name="duration"
          id="duration"
          className="lg:w-36 p-1.5 lg:p-2 border-2 lg:text-lg text-sm rounded-md"
          onChange={(e) => setDuration(e.target.value)}
          value={duration}
        >
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>

      {amount === 0 ? (
        <div className="flex flex-col justify-between items-center">
          <PostAmount />
          <h1>You have not assigned your {duration} balance</h1>
        </div>
      ) : (
        <div className="flex flex-col items-center lg:sticky max-md:sticky top-0 w-1/3 max-sm:w-full">
          <span className="mb-4 animate-blink text-blue-500 text-sm max-sm:mb-1 max-sm:tracking-tight max-sm:mt-5">
            <span className="font-bold text-black">Note:</span> YOUR {duration} BUDGET WILL EXPIRE{" "}
            {duration === "Weekly" ? "IN 7 DAYS" : "AFTER A MONTH"}
          </span>
          <h1 className="flex flex-col text-center mt-4 gap-3 items-center font-bold w-full bg-blue-600 max-sm:text-xl rounded-lg lg:text-3xl max-md:text-2xl">
            {duration} Budget
            <span className="text-white bg-blue-600 px-4 py-1.5 max-sm:text-xl rounded-lg lg:text-2xl max-md:text-2xl w-fit">
              {amount}
            </span>
          </h1>
          <div className="max-md:text-xl max-sm:text-lg text-2xl w-full mt-2 lg:mt-6 flex flex-col items-center justify-around bg-blue-600 rounded-lg">
            <h1 className="font-semibold text-center">Remaining balance of {duration}</h1>
            <span
              className={cn(
                "p-2 rounded-lg text-center",
                amount + earnAmount - spendAmount < 0 ? "text-red-400" : "text-green-400"
              )}
            >
              {amount + earnAmount - spendAmount}
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-col w-2/3 max-sm:w-full items-center">
        <div className="mt-4 lg:mt-7">
          <h1 className="lg:text-3xl max-sm:text-2xl max-sm:tracking-tight max-sm:mb-4 text-center text-blue-500">
            Here is your {duration} financial data
          </h1>
          <div className="flex justify-around lg:mt-6 mt-3 flex-1">
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
                <tbody className="flex flex-col items-center lg:mt-4 mt-2">
                  {transactions
                    .filter((transaction) => transaction.transactionType === type)
                    .map((transaction) => (
                      <tr key={[transaction._id].toLocaleString()}>
                        <td>{transaction.amount}</td>
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
      </div>
    </div>
  );
};

export default Page;
