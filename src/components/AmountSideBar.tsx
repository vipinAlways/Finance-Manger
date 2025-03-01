"use client";
import { AmountGet } from "@/app/acounts/page";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import AddAmount from "./AddAmount";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AmountSideBar = () => {
  const [budget, setBudget] = useState<AmountGet[]>([
    {
      budgetFor: "",
      amount: 0,
      endDate: new Date(),
      startDate: new Date(),
    },
  ]);
  const [haveBudgetName , setHaveBudgetName] = useState(false);
  useEffect(() => {
    const getbudgets = async () => {
      try {
        const response = await fetch("/api/get-amount");
        console.log("sidebar");
        const result = await response.json();

        if (Array.isArray(result.amount)) {
          setBudget(result.amount);

          if (Array.isArray(result.budgetNameForBudget) && result.budgetNameForBudget.length > 0) {
            setHaveBudgetName(true);
          
            
          }
        } else {
          console.log("some error while fetching in array checking");
        }
      } catch (error) {
        console.log("error in client ", error);
      }
    };

    getbudgets();
  },[]);
  return (
    <div className=" w-fit h-fit py-3 flex sticky top-48 left-0 bg-green-500 rounded-md">
      <aside className="h-[30rem] w-40 p-1 flex flex-col sticky top-0 items-center justify-between">
        <h1 className="w-full text-xl text-center rounded-lg text-green-100 ">
          Your budgets
        </h1>

        <div className="h-96 w-full flex flex-col items-center">
          {budget.length > 0 &&
            budget.map((bud, index) => (
              <Link
                href={`/acounts/${bud._id}`}
                key={bud.budgetFor + index}
                className="text-xl cursor-pointer"
              >
                {bud.budgetFor}
              </Link>
            ))}
        </div>
        <AlertDialog>

          <AlertDialogTrigger asChild>
            <Button variant="outline">Add Budget</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="min-h-96 min-w-96 ">
            <AlertDialogTitle className="w-full text-center">ADD BUDGET</AlertDialogTitle>
             {
              haveBudgetName ? <AddAmount /> : <p>please add budget name first</p>
             }
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            
          </AlertDialogContent>
        </AlertDialog>
      </aside>
    </div>
  );
};

export default AmountSideBar;
