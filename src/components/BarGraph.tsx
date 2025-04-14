"use client";
import React, { useEffect, useState, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Amount, Transaction } from "../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarGraph({ forWhich }: { forWhich: string }) {
  const [transaction, setTransactions] = useState<Transaction[]>([]);
  const [budget, setBudget] = useState<Amount[]>([]);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await fetch(`/api/get-amount?from=${forWhich}`);
        const result = await response.json();
        console.log("bar graph",result);

        if (result?.ok && Array.isArray(result.budgetCurrent)) {
          
          setBudget(result.budgetCurrent);
        } else {
          console.error("Unexpected API response structure for budget data.");
        }
      } catch (error) {
        console.error("Error fetching budget data:", error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `/api/get-transaction?from=${forWhich}`
        );
        const result = await response.json();

        if (Array.isArray(result.transactions)) {
          setTransactions(result.transactions);
          console.log('result', result)
        } else {
          console.error(
            "Unexpected API response structure for transactions data."
          );
        }
      } catch (error) {
        console.error("Error fetching transactions data:", error);
      }
    };

    fetchBudget();
    fetchTransactions();
  }, [forWhich]);

  const dates = useMemo(() => {
    const dateSet = new Set<string>();
  
    budget.forEach((item) => {
      let currentDate = new Date(item.startDate);
      const endDate = new Date(item.endDate);
  
      while (currentDate <= endDate) {
        dateSet.add(currentDate.toDateString());
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
  
    return Array.from(dateSet)
      .map((d) => new Date(d))
      .sort((a, b) => a.getTime() - b.getTime());
  }, [budget]);
  

  const formatDate = (date: Date) =>
    `${date.getDate()} / ${date.getMonth() + 1}`;

  const data = {
    labels: dates.map((date) => formatDate(date)),
    datasets: [
      {
        label: "Earn",
        data: dates.map((date) => {
          const matchingTransaction = transaction.filter(
            (item) =>
              new Date(item.date).toLocaleDateString() ===
                date.toLocaleDateString() && item.transactionType === "earn"
          );
          return matchingTransaction.length > 0
            ? matchingTransaction.reduce((acc, curr) => acc + curr.amount, 0)
            : 0;
        }),
        backgroundColor: "rgba(75, 192, 192, 0.84)",
        borderColor: "green",
        borderWidth: 1,
      },
      {
        label: "Spend",
        data: dates.map((date) => {
          const matchingTransaction = transaction.filter(
            (item) =>
              new Date(item.date).toLocaleDateString() ===
                date.toLocaleDateString() && item.transactionType === "spend"
          );
          return matchingTransaction.length > 0
            ? matchingTransaction.reduce((acc, curr) => acc + curr.amount, 0)
            : 0;
        }),
        backgroundColor: "red",
        borderColor: "rgba(255, 99, 132, 0.24)",
        borderWidth: 1,
      },
      {
        label: "Loan",
        data: dates.map((date) => {
          const matchingTransaction = transaction.filter(
            (item) =>
              new Date(item.date).toLocaleDateString() ===
                date.toLocaleDateString() && item.transactionType === "loan"
          );
          return matchingTransaction.length > 0
            ? matchingTransaction.reduce((acc, curr) => acc + curr.amount, 0)
            : 0;
        }),
        backgroundColor: "rgba(241, 241, 4, 0.248)",
        borderColor: "yellow",
        borderWidth: 1,
        
        options: {
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 20, // Set the font size for the labels
                },
                color: "blue", // Optional: Set the color of the labels
              },
            },
          },}
      },
    ],
  };

  // const options = {
  //   responsive: true, // Enables responsiveness
  //   maintainAspectRatio: false, // Allows flexibility
  //   plugins: {
  //     legend: {
  //       labels: {
  //         font:
  //           16 
  //         ,
  //       },
  //     },
  //   },
  //   scales: {
  //     x: {
  //       ticks: {
  //         font: {
  //           size: window.innerWidth < 600 ? 10 : 14, // Adjust X-axis label size dynamically
  //         },
  //       },
  //     },
  //     y: {
  //       ticks: {
  //         font:14, // Adjust Y-axis label size dynamically
          
  //       },
  //     },
  //   },
  // };
  
  return <Bar  data={data} className="h-full w-full text-xl" />;
}

export default BarGraph;
