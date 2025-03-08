"use client";

import React, { useEffect, useState } from "react";
import { AmountGet } from "@/app/acounts/page";

const AccountHistory = ({ accountId }: { accountId: string }) => {
  const [budget, setBudget] = useState<AmountGet[] | null>(null);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await fetch("/api/get-amount");
        console.log("ac history");
        const result = await response.json();

        if (result.ok) {
          setBudget(result.budgetCurrent);
        } else {
          console.error("Error while getting amounts client-side");
        }
      } catch (error) {
        console.error("Error while getting amounts client-side API", error);
      }
    };

    fetchBudget();
  }, []);

  return (
    <div>
      {budget &&
        budget.map((bud) => {
          return (
            bud?._id === accountId && (
              <div key={bud._id}>
                {bud.budgetFor}
                {bud.amount}
              </div>
            )
          );
        })}
    </div>
  );
};

export default AccountHistory;
