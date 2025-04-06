import React, { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useMutation } from "@tanstack/react-query";

function PostAmount() {
  const [amount, setAmount] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>(new Date());
  const { toast } = useToast();

  const handleSubmit = async ({
    BudAmount,
    sDate,
    Edate,
  }: {
    BudAmount: number;
    sDate: Date;
    Edate: Date;
  }) => {
    if (!BudAmount || !sDate || !Edate) {
      toast({
        title: "Amount and From are required",
        description: "If 'to' is empty, by default it will be 1 month.",
      });
      return;
    }

    try {
      const response = await fetch("/api/post-amount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ BudAmount, sDate, Edate }),
      });
      await response.json();
    } catch (error) {
      console.error("Error in try while posting amount:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      setAmount(0);
      setStartDate(new Date());
      setEndDate(new Date());
      toast({
        title: "Success",
        description: "Budget has been submited",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to post the amount. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="mt-4 w-full">
      <form
        onSubmit={(event: React.FormEvent) => {
          event.preventDefault();
          if (!startDate) {
            toast({
              title: "Missing Start Date",
              description: "Please select a start date.",
            });
            return;
          }
          mutate({ BudAmount: amount, sDate: startDate, Edate: endDate });
        }}
        className="w-1/2 mx-auto my-auto flex flex-col items-center h-[50vh] justify-around px-2 border-2 bg-gradient-to-r  from-green-800 via-green-300 to-green-500  rounded-lg"
      >
        <div className="flex flex-col items-center gap-2">
          <label
            htmlFor="amount"
            className="lg:text-xl max-md:text-lg max-sm:text-sm"
          >
            Budget For duration
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            onChange={(e) => setAmount(Number(e.target.value))}
            value={amount}
            placeholder="Enter amount"
            required
            className="border w-1/2 p-2 lg:text-xl max-md:text-lg max-sm:text-sm font-semibold rounded-md bg-zinc-300 text-green-400"
          />
        </div>
        <div className="flex justify-evenly w-full flex-col lg:flex-row">
          <div className="flex flex-col items-center gap-2">
            <label
              className="text-white lg:text-xl max-md:text-lg max-sm:text-sm"
              htmlFor="startDate"
            >
              From
            </label>
            <input
              className="border p-2 rounded-lg bg-green-600 text-white"
              type="date"
              name="startDate"
              id="startDate"
              required
              onChange={(e) => setStartDate(new Date(e.target.value))}
              value={startDate ? startDate.toISOString().split("T")[0] : ""}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <label
              className="text-white lg:text-xl max-md:text-lg max-sm:text-sm"
              htmlFor="endDate"
            >
              To
            </label>
            <input
              className="border p-2 rounded-lg bg-green-600 text-white"
              type="date"
              name="endDate"
              id="endDate"
              onChange={(e) => setEndDate(new Date(e.target.value))}
              value={endDate.toISOString().split("T")[0]}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="lg:text-xl max-md:text-lg max-sm:text-sm"
          disabled={isPending}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default PostAmount;
