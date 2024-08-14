import React, { useEffect, useState } from "react";
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
import { Transaction } from "@/model/transaction.model";
import { Amount } from "@/model/amount.model";

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

function BarGraph() {
  const [transaction, setTransactions] = useState<Transaction[]>([]);
  const [budget, setBudget] = useState<Amount[]>([]);

  useEffect(() => {
    async function fetchTransactions() {
      const response = await fetch(
        `/api/get-transaction?page=1&perpage=${transaction.length}`
      );
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
const dates: Date[] = [];

function getDates() {
  budget.forEach((item) => {
    let currentDate = new Date(item.startDate);
    const endDate = new Date(item.endDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });
}

getDates();

const data = {
  labels: dates.map((date) => `${date.getDate()} / ${date.getMonth()}`),
  datasets: [
    {
      label: "Earn",
      data: dates.map((date) => {
        const matchingTransaction = transaction.find((item) =>
          new Date(item.date).toLocaleDateString() === date.toLocaleDateString() && item.transactionType === "earn"
        );
        return matchingTransaction ? matchingTransaction.amount : 0;
      }),
      backgroundColor: "rgba(75, 192, 192, 0.84)",
      borderColor: "green",
      borderWidth: 1,
    },
    {
      label: "Spend",
      data: dates.map((date) => {
        const matchingTransaction = transaction.find((item) =>
          new Date(item.date).toLocaleDateString() === date.toLocaleDateString() && item.transactionType === "spend"
        );
        return matchingTransaction ? matchingTransaction.amount : 0;
      }),
      backgroundColor: "red",
      borderColor: "rgba(255, 99, 132, 0.24)",
      borderWidth: 1,
    },
    {
      label: "Loan",
      data: dates.map((date) => {
        const matchingTransaction = transaction.find((item) =>
          new Date(item.date).toLocaleDateString() === date.toLocaleDateString() && item.transactionType === "loan"
        );
        return matchingTransaction ? matchingTransaction.amount : 0;
      }),
      backgroundColor: "rgba(241, 241, 4, 0.248)",
      borderColor: "yellow",
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

return <Bar options={options} data={data}  />;

}

export default BarGraph;
