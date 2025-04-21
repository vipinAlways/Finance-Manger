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
import { Line } from "react-chartjs-2";
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
        console.log("bar graph", result);

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
        const response = await fetch(`/api/get-transaction?from=${forWhich}`);
        const result = await response.json();

        if (Array.isArray(result.transactions)) {
          setTransactions(result.transactions);
          console.log("result", result);
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
        label: "Moves",
        data: dates.map((date) => {
          const matchingTransaction = transaction.filter(
            (item) =>
              new Date(item.date).toLocaleDateString() ===
              date.toLocaleDateString()
          );
          return matchingTransaction.length > 0
            ? matchingTransaction.reduce((acc, curr) => acc + curr.amount, 0)
            : null;
        }),

        backgroundColor: "red",
        borderColor: "rgba(255, 99, 132, 0.24)",
        borderWidth: 1,
        tension: 0.2,
        fill: false,
      },
    ],
  };

  return (
    <Line
      data={data}
      options={{ responsive: true }}
      className="h-full w-full text-xl"
    />
  );
}

export default BarGraph;
