"use client";
import AccountHistory from "@/components/AccountHistory";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React, { useEffect } from "react";
import { AmountGet } from "../page";
import AddAmount from "@/components/AddAmount";


const Page = ({ params }: { params: { acountId: string } }) => {
  const [idBudget, setIdBudget] = React.useState<AmountGet>();
  const { acountId } = params;
  const { toast } = useToast();
  const fetchBudget = async () => {
    try {
      const response = await fetch(`/api/get-amount?id=${acountId}`);
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
    let budget = data.find((item: AmountGet) => item._id === acountId);

    setIdBudget(budget);
  }, [acountId, data]);

  const deleteBudget = async () => {
    if (!acountId) return;

    try {
      const response = await fetch(`/api/delete-budget?amountId=${acountId}`, {
        method: "DELETE",
      });
      await response.json();
    } catch (error) {
      console.error("Error during fetch operation:", error);
      alert(
        "An error occurred while deleting the transaction. Please try again."
      );
    }
  };

  const { mutate } = useMutation({
    mutationFn: deleteBudget,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Budget has been deleted",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description:
          "An error occurred while deleting the budget. Please try again.",
        variant: "destructive",
      });
    },
  });

   

  return (
    <div className="flex items-center justify-around">
      <AccountHistory accountId={acountId} />
      <div className="flex flex-col justify-around h-80">
        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className=" hover:bg-green-700 hover:scale-105 hover:transition-all hover:duration-150 hover:ease-out text-white font-semibold px-4 py-2 rounded-lg transition duration-200">
                Update Budget
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="min-h-96 min-w-96 ">
              <AlertDialogTitle className="w-full text-center">
                Update BUDGET
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                Update your budget for {idBudget?.budgetFor} here
              </AlertDialogDescription>

              {idBudget && <AddAmount budData={idBudget} />}

              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <Button onClick={() => mutate()} className="hover:bg-green-700 hover:scale-105 hover:transition-all hover:duration-150 hover:ease-out">Drop budget</Button>
      </div>
    </div>
  );
};

export default Page;
