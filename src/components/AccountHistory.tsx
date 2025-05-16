"use client";

import React, { useEffect } from "react";
import { AmountGet } from "@/app/accounts/page";
import { useQuery } from "@tanstack/react-query";

import LineChart from "./LineChart";
import { Button } from "./ui/button";
import AddAmount from "./AddAmount";

const AccountHistory = ({ accountId }: { accountId: string }) => {
  const [idBudget, setIdBudget] = React.useState<AmountGet>();
  const fetchBudget = async () => {
    try {
      const response = await fetch(`/api/get-amount?id=${accountId}`);
      const result = await response.json();

      if (result.ok && result.budgetCurrent.length > 0) {
        return result.budgetCurrent;
      } else {
        console.error("Error while getting amounts client-side");
        throw new Error("Invalid response: budgetCurrent is empty");
      }
    } catch (error) {
      console.error("Error while getting amounts client-side API", error);
      return [];
    }
  };


  const { data=[] } = useQuery({
    queryKey: ["budget"],
    queryFn: async () => fetchBudget(),
  });

  useEffect(() => {
    let budget = data.find((item: AmountGet) => item._id === accountId);

    setIdBudget(budget);
  }, [accountId, data]);
 
  return (
    <div className="flex justify-around">
      <div>
        {idBudget && (
          <div>
            {idBudget.budgetFor}
            {idBudget.amount}
             {new Date(idBudget.endDate).toLocaleDateString("en-US") }
          </div>
        )}

        <div className="h-96">
          <LineChart forWhich={idBudget ? idBudget.budgetFor : ""} />
        </div>
      </div>

      <div>
       
      </div>
    </div>
  );
};

export default AccountHistory;
