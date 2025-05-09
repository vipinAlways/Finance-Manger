"use client";


import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Amount, Transaction } from "@/types";


ChartJS.register(ArcElement, Tooltip, Legend);

function PieGraph({forWhich}: {forWhich: string}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budget, setBudget] = useState<Amount[]>([]);
  const [from, setFrom] = useState<Date>();
  const [to, setTo] = useState<Date>();

  function generateColors(numColors: number) {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `hsl(${(i * 360) / numColors}, 70%, 50%,0.9)`;
      colors.push(color);
    }
    return colors;
  }

 

  useEffect(() => {
    budget.forEach((item) => {
      if (
        new Date(item.startDate) <= new Date() &&
        new Date(item.endDate) >= new Date()
      ) {
        setFrom(new Date(item.startDate));
        setTo(new Date(item.endDate));
      }
    });
  }, [budget]);



    useEffect(() => {
      const fetchBudget = async () => {
        try {
          const response = await fetch(`/api/get-amount?from=${forWhich}`);
          const result = await response.json();
          console.log("piegraph");
    
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
            `/api/get-transaction?page=1&perpage=20&from=${forWhich}`
          );
          const result = await response.json();
    
          if (Array.isArray(result.transactions)) {
            setTransactions(result.transactions);
          } else {
            console.error("Unexpected API response structure for transactions data.");
          }
        } catch (error) {
          console.error("Error fetching transactions data:", error);
        }
      };
    
      fetchBudget();
      fetchTransactions();
    }, [forWhich]);

  const filteredTransactions = transactions.filter((item) => {
    return new Date(item.date) >= from! && new Date(item.date) <= to!;
  });
  const categoryTotals: { [key: string]: number } = filteredTransactions.reduce(
    (acc: { [key: string]: number }, curr: Transaction) => {
      const categoryKey = curr.category.toUpperCase();
      if (curr.transactionType === "earn") {
        acc[categoryKey] = (acc[categoryKey] || 0) + curr.amount;
      } else if (curr.transactionType === "spend") {
        acc[categoryKey] = (acc[categoryKey] || 0) + curr.amount;
      }
      return acc;
    },
    {}
  );
  
  

  const allCategory = Object.keys(categoryTotals);
  const dataValues = Object.values(categoryTotals);
  const backgroundColors = generateColors(allCategory.length);

  const data = {
    labels: allCategory,
    datasets: [
      {
        label: "total exepnce catrgory wise",
        data: dataValues,
        backgroundColor:backgroundColors,
        hoverOffset: 2,
        borderWidth: 3,
    
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: window.innerWidth < 600 ? 12 : 16, 
          },
        },
      },
    },
  };
  


 return <Doughnut data={data}  options={options} className="h-full p-2 w-full"   />;
}

export default PieGraph;
