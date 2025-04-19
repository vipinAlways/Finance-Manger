"use client";

import React, { useEffect, useState } from "react";
import { AmountGet } from "@/app/accounts/page";
import { useQuery } from "@tanstack/react-query";

const AccountHistory = ({ accountId }: { accountId: string }) => {
  const [budget, setBudget] = useState<AmountGet[] | null>(null);
  const fetchBudget = async () => {
    try {
      const response = await fetch("/api/get-amount");
      console.log("ac history");
      const result = await response.json();

      if (result.ok) {
        return result.budgetCurrent
      } else {
        console.error("Error while getting amounts client-side");
        return [];
      }
    } catch (error) {
      console.error("Error while getting amounts client-side API", error);
      return []
    }
  };
   const {data}  = useQuery({
    queryKey: ["budget"],
    queryFn:async ()=> fetchBudget(),
   })
  useEffect(() => {
    setBudget(data)
  }, [data]);

  return (
    <div>
      {budget &&
        budget.map((bud) => {
          return (
            bud?._id === accountId && (
              <div key={bud._id}>
                {bud.budgetFor}
                {bud.amount}
               <h1> {bud?.startDate?.toLocaleDateString()}</h1>
              </div>
            )
          );
        })}
    </div>
  );
};

export default AccountHistory;
