"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import Image from "next/image";
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
  const [budget, setBudget] = useState<AmountGet[]>([]);
  const [budgetName, setBudgetName] = useState<[]>([]);
  const [budgetUpdated, setBudgetUpdated] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [hidden2, setHidden2] = useState(true);
  const [nameOfBudget, setNameOfBudget] = useState("");
  const [index, setIndex] = useState(0);
  const { toast } = useToast();

  const AddBudgetName = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/post-budgetName", {
        method: "POST",
        body: JSON.stringify({ nameOfBudget }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      toast({
        title: data.ok ? "Budget Added Successfully" : "Error",
        description: data.ok
          ? `Your budget for "${nameOfBudget}" has been added.`
          : data.message,
        variant: data.ok ? "default" : "destructive",
      });

      if (data.ok) {
        setNameOfBudget("");
        setHidden2(true);
        setBudgetUpdated((prev) => !prev);
      }
    } catch (error: any) {
      console.error("Error while adding budget name:", error);
      toast({
        title: "Error",
        description: "Something went wrong!",
        variant: "destructive",
      });
    }

    window.location.reload();
  };

  useEffect(() => {
    const getBudgets = async () => {
      try {
        const response = await fetch("/api/get-amount", { cache: "no-store" });
        const result = await response.json();
        if (Array.isArray(result.amount)) setBudget(result.amount);
        if (Array.isArray(result.budgetNameForBudget))
          setBudgetName(result.budgetNameForBudget);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };
    getBudgets();
  }, [budgetUpdated]);

  useEffect(() => {
    if (!budget.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev < budget.length - 1 ? prev + 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, [budget]);

  if (budgetName.length === 0) {
    return (
      <div className="w-full py-3 flex items-center justify-center gap-4 h-[30rem] flex-col">
        <h1 className="text-4xl flex flex-col items-start gap-1 px-2 font-light ">
          You have not added any budget name.
          <span> Please add a budget name to continue.</span>
        </h1>
        <div className="p-2 flex flex-col items-start gap-2 w-64 h-40">
          <Button
            disabled={!hidden}
            onClick={() => setHidden2(!hidden2)}
            className="h-10"
          >
            ADD NAME
          </Button>
          <form
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
      </div>
    );
  }

  if (budget.length === 0) {
    return (
      <div className="w-full py-3 flex items-start gap-4 h-[30rem] flex-col">
        dslj
      </div>
    );
  }
  return (
    <div className="h-full w-full relative py-3 flex items-start gap-4 ">
      <div className="w-full text-5xl relative flex flex-col gap-8 font-sans">
        <div className="p-2 flex flex-col items-start gap-2 w-64 h-28">
          <Button
            disabled={!hidden}
            onClick={() => setHidden2(!hidden2)}
            className="h-10"
          >
            ADD NAME
          </Button>
          <form
            onSubmit={AddBudgetName}
            className={cn("flex", hidden2 && "hidden")}
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

        <div className="h-full mx-auto relative bg-green-600 text-green-50 w-[30rem] p-3 rounded-md">
          <div className="h-56 flex items-center w-full overflow-x-auto overflow-y-hidden scroll-smooth touch-pan-left">
            <div className="flex space-x-4 relative w-full">
              {budget.map(
                (show, i) =>
                  i === index && (
                    <Link
                      key={i}
                      href={`/acounts/${show._id}`}
                      className="md:w-[28rem] md:h-52 max-md:w-40 max-md:h-44 flex items-center "
                    >
                      <Image
                        src={"/image1.jpg"}
                        alt="Budget Image"
                        height={60}
                        width={120}
                        className="object-contain rounded-full"
                      />
                      <div className="flex justify-around h-full w-full p-2 flex-col">
                        <div className="flex flex-col items-center gap-2 border-b pb-5 border-green-50">
                          <h1 className="md:text-4xl font-bold">
                            Name of Budget
                          </h1>
                          <h1
                            className={cn(
                              "flex justify-around capitalize font-serif",
                              show.budgetFor.split(" ").length < 4
                                ? "text-5xl"
                                : "text-3xl"
                            )}
                          >
                            {show.budgetFor}
                          </h1>
                        </div>
                        <div className="w-full flex items-center justify-center font-serif">
                          <p className="text-2xl rounded-full p-2 flex w-full items-center justify-center gap-3">
                            <span className="w-fit flex">Till :</span>
                            <span className="text-xl w-fit text-start">
                              {new Date(show.endDate)
                                .toString()
                                .replace("GMT+0530 (India Standard Time)", "")}
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
              )}
            </div>
          </div>
        </div>
        <div className="flex w-full items-start flex-col">
          <h1 className="w-full flex-col flex items-start gap-1.5">
            <span className=" text-zinc-700 ">Last Month's Savings</span>
            <span>Summary</span>
          </h1>
          <ul>
            {budget.map((bud: AmountGet, index) => (
              <li
                key={index.toString() + bud.budgetFor}
                className="flex items-center gap-10"
              >
                <h1>{bud.budgetFor}</h1>
                <div className="flex items-center gap-6">
                  <h1>{bud.amount}</h1>
                  <h1>{bud.budgetFor}</h1>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
