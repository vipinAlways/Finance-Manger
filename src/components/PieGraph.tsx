// "use client";

// import { Transaction } from '@/model/transaction.model';
// import React, { useEffect, useState } from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// // Register ArcElement, Tooltip, and Legend
// ChartJS.register(ArcElement, Tooltip, Legend);

// function PieGraph() {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);

//   useEffect(() => {
//     async function fetchTransactions() {
//       const response = await fetch(`/api/get-transaction?page=1&perpage=50`);
//       const result = await response.json();

//       if (Array.isArray(result.transactions)) {
//         setTransactions((prev) => [...prev, ...result.transactions]);
//       } else {
//         console.error("Unexpected API response structure");
//       }
//     }

//     fetchTransactions();
//   }, []);

//   const allCategory = Array.from(new Set(transactions.map((item) => item.category)));

//   const data = {
//     labels: allCategory, 
//     datasets: [
//       {
//         label: 'Transaction According to Category',
//         data: allCategory.map((category) => {
//           return transactions
//             .filter((item) => item.category === category)
//             .reduce((acc, curr) => acc + curr.amount, 0);
//         }),
//         backgroundColor: allCategory.map(() => 'rgb(255, 99, 132)'),
//         hoverOffset: 4,
//       },
//     ],
//   };

//   return <Doughnut data={data} />;
// }

// export default PieGraph;
