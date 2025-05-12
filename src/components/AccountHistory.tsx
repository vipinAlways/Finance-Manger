"use client";

import React, { useEffect, useState } from "react";
import { AmountGet } from "@/app/accounts/page";
import { useQuery } from "@tanstack/react-query";

import LineChart from "./LineChart";

const AccountHistory = ({ accountId }: { accountId: string }) => {
  const fetchBudget = async () => {
    try {
      const response = await fetch(`/api/get-amount?id=${accountId}`, );
      const result = await response.json();

      if (result.ok) {
        return result.budgetCurrent[0];
      } else {
        console.error("Error while getting amounts client-side");
        throw new Error("Invalid response: budgetCurrent is empty");
      }
    } catch (error) {
      console.error("Error while getting amounts client-side API", error);
      return [] ;
    }
  };

    const updateBudget = async () => {
    if (!accountId) return;

    try {
      const response = await fetch(`/api/update-budget?amountId=${accountId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);

      if (data.ok) {
        alert("Transaction has been deleted");
      }
    } catch (error) {
      console.error("Error during fetch operation:", error);
      alert(
        "An error occurred while deleting the transaction. Please try again."
      );
    }
  };
  const { data} = useQuery<AmountGet>({
    queryKey: ["budget"],
    queryFn: async () => fetchBudget(),
  });

  

  return (
    <div className="">
      {data && (
        <div >
          {data.budgetFor}
          {data.amount}
        </div>
      )}

      <div className="h-96">
        <LineChart
          forWhich={
            data ? data.budgetFor :""
          }
        />
      </div>
    </div>
  );
};

export default AccountHistory;
