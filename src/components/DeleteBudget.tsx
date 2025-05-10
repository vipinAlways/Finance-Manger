import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./ui/use-toast";

function DeleteBudget({
  className,
  amountId,
}: {
  className?: string;
  amountId: string;
}) {
  const [animation, setAnimation] = useState("");
  const queryClient = useQueryClient();


  const {toast} = useToast()

  const deleteBudget = async () => {
    try {
      const response = await fetch(`/api/delete-budget?amountId=${amountId}`, {
        method: "DELETE",
      });
      await response.json();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const { mutate } = useMutation({
    mutationFn: deleteBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    },
  });
  return (
    <div
      onMouseEnter={() => setAnimation("animation")}
      className={cn(
        "rotate-90 absolute top-1/2 -left-28 bg-[#2ecc71] text-white rounded-lg  -translate-x-20 -translate-y-1/2 p-3",
        className,
        animation
      )}
    >
      <Button
        onClick={(e) => {
          e.preventDefault();
          mutate();
        }}
        className="lg:text-xl max-sm:text-sm max-md:text-lg"
      >
        Drop Budget
      </Button>
    </div>
  );
}

export default DeleteBudget;
