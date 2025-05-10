"use client";

import React, { useEffect, useState } from "react";
import { AmountGet } from "@/app/accounts/page";
import { useQuery } from "@tanstack/react-query";

import LineChart from "./LineChart";

const AccountHistory = ({ accountId }: { accountId: string }) => {
  const fetchBudget = async () => {
    try {
      const response = await fetch(`/api/get-amount`);
      const result = await response.json();

      if (result.ok) {
        return result.budgetCurrent;
      } else {
        console.error("Error while getting amounts client-side");
        return [];
      }
    } catch (error) {
      console.error("Error while getting amounts client-side API", error);
      return [];
    }
  };
  const { data } = useQuery({
    queryKey: ["budget"],
    queryFn: async () => fetchBudget(),
  }); 
  

  return (
    <div className="">
      {data &&
        data.map((bud: AmountGet) => {
          return (
            bud?._id === accountId && (
              <div key={bud._id}>
                {bud.budgetFor}
                {bud.amount}
              </div>
            )
          );
        })}

      <div className="h-96">
      <LineChart
        forWhich={
          data?.find((bud: AmountGet) => bud._id === accountId)?.budgetFor!
        }
      />
      </div>
    </div>
  );
};

export default AccountHistory;
