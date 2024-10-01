"use client";

import { Transaction } from "@/Models/Transaction.model";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Amount } from "@/Models/Amount.model";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieGraph() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budget, setBudget] = useState<Amount[]>([]);
  const [from, setFrom] = useState<Date>();
  const [to, setTo] = useState<Date>();

  function generateColors(numColors: number) {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `hsl(${(i * 360) / numColors}, 70%, 50%)`;
      colors.push(color);
    }
    return colors;
  }

  useEffect(() => {
    async function fetchTransactions() {
      const response = await fetch(`/api/get-transaction?page=1&perpage=50`);
      const result = await response.json();

      if (Array.isArray(result.transactions)) {
        setTransactions((prev) => [...prev, ...result.transactions]);
      } else {
        console.error("Unexpected API response structure");
      }
    }

    fetchTransactions();
  }, []);

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

  const filteredTransactions = transactions.filter((item) => {
    return new Date(item.date) >= from! && new Date(item.date) <= to!;
  });

  const categoryTotals: { [key: string]: number } = filteredTransactions.reduce(
    (acc: { [key: string]: number }, curr: Transaction) => {
      if (curr.transactionType === "earn") {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      } else if (curr.transactionType === "spend") {
        acc[curr.category] = (acc[curr.category] || 0) - curr.amount;
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
        hoverOffset: 4,
      },
    ],
  };

  return <Doughnut data={data}  />;
}

export default PieGraph;
