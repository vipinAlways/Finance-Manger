"use client";

import React, { useEffect } from "react";
import { AmountGet } from "@/app/accounts/page";
import { useQuery } from "@tanstack/react-query";
import LineChart from "./LineChart";
import Image from "next/image";

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

  const { data = [] } = useQuery({
    queryKey: ["budget"],
    queryFn: async () => fetchBudget(),
  });

  useEffect(() => {
    let budget = data.find((item: AmountGet) => item._id === accountId);

    setIdBudget(budget);
  }, [accountId, data]);

  return (
    <div className="font-serif py-4">
      <div className="flex flex-col justify-between h-full gap-4  max-lg:h-fit">
        {idBudget && (
          <div className="flex gap-2 items-center w-full justify-start max-md:justify-center  max-md:flex-col">
            <div className="text-2xl font-bold  w-full flex items-center gap-2">
              <div className="relative w-10 h-10">
                <Image
                  src={idBudget.image}
                  alt={idBudget.budgetFor}
                  fill
                  lazyBoundary="100px"
                />
              </div>
              <h1 className="text-4xl max-lg:text-2xl">{idBudget.budgetFor}</h1>
            </div>
            <div className="flex flex-col items-start justify-center w-full">
              <h1>Amount{" "} : {idBudget.amount}</h1>
              <h1>Duration{" "}: {new Date(idBudget.startDate).toLocaleDateString("en-US")} - {new Date(idBudget.endDate).toLocaleDateString("en-US")}</h1>
            </div>
          </div>
        )}

        <div className="h-[30rem] max-lg:h-[11rem] max-lg:w-80 w-[50vw]">
          <LineChart forWhich={idBudget ? idBudget.budgetFor : ""} />
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default AccountHistory;
