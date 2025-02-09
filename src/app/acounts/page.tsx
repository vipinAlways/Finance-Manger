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
          variant: "destructive",
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
    <div className="h-full w-full relative py-3 flex items-start">
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
        {!hidden && (
          <div className="w-4/5 absolute top-1/2 left-[55%] h-full -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-50 bg-opacity-10  bg-green-600">
            <div className="w-96 h-[25rem] mx-4">
              <AddAmount hidden="" />
            </div>
          </div>
        )}
      </aside>
      <div className="w-full text-5xl relative ">
        <div className="p-2 h-24 flex flex-col items-start gap-2 w-64">
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

       
      
          <div className="h-full md:w-[10rem] w-1/3 mx-auto relative border-4 ">
            <div className="h-64 flex items-center w-full overflow-x-auto card-container overflow-y-hidden scroll-smooth touch-pan-left">
              <div className="flex space-x-4 scroll-item scroll-smooth touch-pan-left">
                 { budget.map((show , index) => (
                    <Link
                      key={index}
                      href={show.budgetFor}
                      className={`md:w-48 md:h-56 max-md:w-40 max-md:h-44 border border-zinc-300 flex-shrink-0 flex flex-col items-center rounded-xl p-1.5 justify-between bg-textWhite duration-300 transition-all ease `}
                    >
                    

                      <h1 className="md:text-xl text-zinc-700 group-hover:text-textWhite duration-300 ease">
                       
                      </h1>

                      <div className="w-full flex items-start px-2.5 group-hover:text-textWhite duration-300 ease text-zinc-800">
                        <p className="text-sm border-2 border-zinc-200 rounded-full p-2 flex items-center justify-center gap-3 text-center group-hover:border-white">
                       
                          <span className="text-sm rotate-45 transition group-hover:animate-shake">
                            &uarr;
                          </span>
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
      
      </div>
    </div>
  );
};

export default Page;
