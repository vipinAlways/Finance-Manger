  "use client";
import DeleteBudget from "@/components/DeleteBudget";
import PostAmount from "@/components/PostAmount";
import TransactionsAccorindToDate from "@/components/TransactionsAccorindToDate";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon} from "lucide-react";
import React, { useEffect, useState } from "react";

function home() {
  const [amount, setAmount] = useState<number>(0);
  const [from, setStartDate] = useState("");
  const [amountId, setAmountId] = useState("");
  const [to, setEndDate] = useState("");
  const [budget, setBudget] = useState<Amount[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loader, setLoader] = useState(true);
  const [hidden, setHidden] = useState(true);
  const [earnAmount, setEarnAmount] = useState<number>(0);
  const [spendAmount, setSpendAmount] = useState<number>(0);
  const [loanAmount, setLoanAmount] = useState<number>(0);
  
  const currentDate = new Date();
  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch(
          `/api/get-transaction?home=1&perhome=${transactions.length}`
        );
        const result = await response.json();

       setTransactions(result.transaction)
      } catch (error) {
        alert("Currently our servers are not working, please try again later.");
      }
    }

    fetchTransactions();
  }, [transactions.length]);

  useEffect(() => {
    const fetchBudget = async () => {
      const response = await fetch("/api/get-amount");
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
    };

    fetchBudget();
  }, []);

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
    setTimeout(() => {
      setLoader(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (budget.length > 0) {
      budget.forEach((data) => {
        if (new Date(data.endDate) > currentDate) {
          setAmount(data.amount);
          setEndDate(new Date(data.endDate).toLocaleDateString());
          setStartDate(new Date(data.startDate).toLocaleDateString());
          //@ts-ignore
          setAmountId(data._id)
        } else {
          setAmount(0);
        }
      });
    }
  }, [budget,currentDate]);

  useEffect(()=>{
    if (new Date(to) < currentDate) {
      setAmount(0)
    }
  },[currentDate])


  const tableShow = () => {
    setHidden((prevHidden) => !prevHidden);
  };

  if (loader) {
    return (
      <div className="flex justify-center items-center space-x-2 mt-4">
        <div
          className="w-4 h-4 bg-green-500 rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-4 h-4 bg-green-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-4 h-4 bg-green-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full items-start flex  justify-between  ">
      {amount === 0 ? (
        <PostAmount />
      ) : (
        <div className="mt-4 flex items-start flex-col relative w-96">

          <DeleteBudget className="" amountId={amountId}/>
          <div className="cursor-pointer flex flex-col gap-6 items-center w-fit  bg-gradient-to-tr from-green-800 via-green-300 to-green-500 px-4 rounded-lg py-6 ">
            <div className="flex flex-col items-center gap-3">
              <h1 className="lg:text-2xl max-sm:text-lg max-md:text-xl text-white">
                Here is your Budget
              </h1>
              <span className="bg-green-600 text-white w-fit h-fit lg:px-4 p-2 lg:text-2xl max-sm:text-lg max-md:text-xl rounded-lg">
                {amount}
              </span>
            </div>
            <div className="lg:w-80 w-60 mt-4 lg:text-xl max-sm:text-sm max-md:text-lg flex items-center">
              <span className="p-2 text-white bg-green-600 rounded-md mr-3.5">
                {from}
              </span>
              <ArrowRightIcon className="text-white animate-blink w-10" />
              <span className="p-2 text-white bg-green-600 rounded-md ml-3.5">
                {to}
              </span>
            </div>
          </div>

          <div className="flex flex-col  w-full  items-center gap-5 "> 
          <div className="flex w-full  justify-around lg:mt-6 mt-3 flex-1 max-h-[40vh] overflow-auto ">
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
                <tbody className="flex flex-col items-center lg:mt-4 mt-2 gap-2">
                  {transactions
                    .filter(
                      (transaction) =>
                        transaction.transactionType === type &&
                        new Date(transaction.date) >= new Date(from) &&
                        new Date(transaction.date) <= new Date(to)
                    )
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
          {(earnAmount === 0 && loanAmount === 0 && spendAmount === 0) ? <div>
        <span className="text-red-600"> No transaction found between {from} to {to}</span>
      </div> :<div className="flex items-center flex-col">
            <h1 className="lg:text-xl max-sm:text-sm max-md:text-lg ">Here is remaining balance <span>{amount + earnAmount -spendAmount}</span></h1>

            <p className="animate-blink">(note: Here we have not included Loan amount)</p>
        </div>}
          </div>
      
        </div>
      )}

        <div className="flex items-center flex-col mt-4 lg:mt-8 gap-4 flex-1  w-96" >
          <Button onClick={tableShow}
             className="lg:text-xl max-sm:text-sm max-md:text-lg " >
            {
              hidden ? <span>Watch Transaction according to Dates</span> :<span> click to close the table </span>
            }
          </Button>

          {
            hidden ? '' : <div className="w-full">
            <TransactionsAccorindToDate/>
          </div> 
          }


        </div>

    </div>
  );
}

export default home;
