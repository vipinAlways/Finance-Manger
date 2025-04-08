"use client";
import AccountHistory from "@/components/AccountHistory";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";

import { use } from "react";

const Page = ({ params }: { params: Promise<{ acountId: string }> }) => {
  const { acountId } = use(params);
  const { toast } = useToast();

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

  const updateBudget = async () => {
    if (!acountId) return;

    try {
      const response = await fetch(`/api/update-budget?amountId=${acountId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);

      if (data.ok) {
        alert("Transaction has been deleted");
      }
    } catch (error) {
      console.error("Error during fetch operation:", error);
      alert(
        "An error occurred while deleting the transaction. Please try again."
      );
    }
  };
  return (
    <div>
      <AccountHistory accountId={acountId} />

      <Button onClick={() => mutate()}>Delete budget</Button>
    </div>
  );
};

export default Page;
