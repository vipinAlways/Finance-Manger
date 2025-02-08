"use client";
import AddAmount from "@/components/AddAmount";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export interface AmountGet {
  budgetFor: string;
  startDate: Date;
  amount: number;
  endDate: Date;
  _id?: string;
}
const Page = () => {
  const [budget, setBudget] = useState<AmountGet[]>([
    {
      budgetFor: "",
      amount: 0,
      endDate: new Date(),
      startDate: new Date(),
    },
  ]);
  const [hidden, setHidden] = useState(true);
  const [hidden2, setHidden2] = useState(true);
  const [nameOfBudget, setNameOfBudget] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const getbudgets = async () => {
      try {
        const response = await fetch("/api/get-amount");
        const result = await response.json();

        if (Array.isArray(result.amount)) {
          setBudget(result.amount);
        } else {
          console.log("some error while fetching in array checking");
        }
      } catch (error) {
        console.log("error in client ", error);
      }
    };

    getbudgets();
  }, []);


  const AddBudgetName = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/post-budgetName", {
        method: "POST",
        body: JSON.stringify({ nameOfBudget }), 
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (data.ok) {
        toast({
          title: "Budget Added Successfully",
          description: `Your budget for "${nameOfBudget}" has been added.`,
        });

        setNameOfBudget("");
        setHidden2(true);
      } else {
        toast({
          title: "Budget Added Successfully",
          description: `${data.message}`,
          variant:"destructive"
        });

        setNameOfBudget("");
        setHidden2(true);
      }
    } catch (error: any) {
      console.error("Error while adding budget name:", error);

      toast({
        title: "Error",
        description: "Something went wrong!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-full w-full relative py-3 flex ">
      <aside className="h-[31rem]  w-36 sticky top-2 flex flex-col items-center justify-between  rounded-lg bg-green-200 py-3 px-2">
        <h1 className="w-full text-lg tracking-tight py-1 px-0.5 bg-[#16a34a] text-center rounded-lg text-green-100 ">
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
                {bud.budgetFor.toUpperCase()}
              </Link>
            ))}
        </div>

        <Button
          className="text-sm p-1  w-full"
          onClick={() => setHidden(hidden ? false : true)}
        >
          Another budget
        </Button>
      </aside>
      {!hidden && (
        <div className="w-4/5 absolute top-1/2 left-[55%] h-full -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-50 bg-opacity-10  bg-green-600">
          <div className="w-96 h-[25rem] mx-4">
            <AddAmount hidden="" />
          </div>
        </div>
      )}
      <div className="w-full h-[30rem] flex items-center justify-center text-5xl relative">
        <div className="absolute top-0 left-5 h-24 flex flex-col items-start gap-2 w-64">
          <Button
            disabled={!hidden}
            onClick={() => setHidden2(!hidden2)}
            className="h-10"
          >
            ADD NAME
          </Button>
          <form
            action="POST"
            onSubmit={AddBudgetName}
            className={cn("flex items-center gap-3", hidden2 && "hidden")}
          >
            <input
              type="text"
              value={nameOfBudget}
              onChange={(e) => setNameOfBudget(e.target.value)}
              className="h-10 w-60 rounded-lg text-lg px-3"
              placeholder="Enter the name..."
            />
          </form>
        </div>
        <h1>Your Budget</h1>
      </div>

      <div className="w-full h-full p-2">
        <div className="flex overflow-hidden">
          
        </div>
      </div>
    </div>
  );
};

export default Page;
