"use client";
import AddAmount from "@/components/AddAmount";
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
  const [hidden, setHidden] = useState(true);
  const [hidden2, setHidden2] = useState(true);
  const [nameOfBudget, setNameOfBudget] = useState("");
  const [index, setIndex] = useState(0);
  const { toast } = useToast();

 
  const getBudgets = async () => {
    try {
      const response = await fetch("/api/get-amount", { cache: "no-store" });
      const result = await response.json();
      console.log(result.budgetNameForBudget,"budgetNAme");
      if (Array.isArray(result.amount)) setBudget(result.amount);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  useEffect(() => {
    getBudgets();
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
        getBudgets(); 
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


  useEffect(() => {
    if (!budget.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev < budget.length - 1 ? prev + 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, [budget]);
 
  return (
    <div className="h-full w-full relative py-3 flex items-start">
      <aside className="h-[31rem] w-36 sticky top-2 flex flex-col items-center justify-between rounded-lg bg-green-200 py-3 px-2">
        <h1 className="w-full text-lg tracking-tight py-1 px-0.5 bg-[#16a34a] text-center rounded-lg text-green-100">
          Your Budgets
        </h1>

        <div className="h-96 w-full flex flex-col items-center overflow-y-auto gap-3 pt-1">
          {budget.map((bud) => (
            <Link
              href={`/acounts/${bud._id}`}
              key={bud._id}
              className="text-2xl cursor-pointer capitalize text-[#052e2a] hover:bg-green-300/55 rounded-full  w-full  p-1 text-center"
            >
              {bud.budgetFor}
            </Link>
          ))}
        </div>

        <Button
          className="text-sm p-1 w-full"
          onClick={() => setHidden(!hidden)}
        >
          Another Budget
        </Button>

        {!hidden && (
          <div className="w-4/5 absolute top-1/2 left-[55%] h-full -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-50 bg-opacity-10 bg-green-600">
            <div className="w-96 h-[25rem] mx-4">
              <AddAmount hidden="" />
            </div>
          </div>
        )}
      </aside>

      <div className="w-full text-5xl relative flex flex-col gap-3 font-sans">
        <div className="p-2 flex flex-col items-start gap-2 w-64">
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

        <div className="h-full mx-auto relative border-2 border-[#10B981] w-[30rem] p-3 rounded-md">
          <div className="h-56 flex items-center w-full overflow-x-auto overflow-y-hidden scroll-smooth touch-pan-left">
            <div className="flex space-x-4 relative w-full">
              {budget.map(
                (show, i) =>
                  i === index && (
                    <Link
                      key={i}
                      href={`/acounts/${show._id}`}
                      className="md:w-[28rem] md:h-52 max-md:w-40 max-md:h-44 flex items-center text-[#0F766E]"
                    >
                      <Image
                        src={"/image1.jpg"}
                        alt="Budget Image"
                        height={60}
                        width={120}
                        className="object-contain rounded-full"
                      />
                      <div className="flex justify-around h-full w-full p-2 flex-col">
                        <div className="flex flex-col items-center gap-2 border-b pb-5 border-[#047857]">
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
                          <p className="text-xl rounded-full p-2 flex w-full items-center justify-center gap-3 text-[#0F766E]/80">
                            <span className="w-fit flex">Till :</span>
                            <span className="text-lg w-fit">
                              {new Date(show.endDate).toString().replace("GMT+0530 (India Standard Time)","")}
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
      </div>
    </div>
  );
};

export default Page;
