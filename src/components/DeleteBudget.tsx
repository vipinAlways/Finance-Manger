import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function DeleteBudget({
  className,
  amountId,
}: {
  className?: string;
  amountId: string;
}) {
  const [animation, setAnimation] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    window.addEventListener("scroll", function () {
      setAnimation("");
    });
  }, []);
  const deleteBudget = async () => {
    try {
      const response = await fetch(`/api/delete-budget?amountId=${amountId}`, {
        method: "DELETE",
      });
      await response.json();
    } catch (error) {
      alert("server error");
    }
  };

  const { mutate } = useMutation({
    mutationFn: deleteBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget"] });
    },
    onError: (error) => {
      alert("server error");
    },
  });
  return (
    <div
      onMouseEnter={() => setAnimation("animation")}
      className={cn(
        "rotate-90 absolute top-1/2 -left-28 bg-green-600 text-white rounded-lg  -translate-x-20 -translate-y-1/2 p-3",
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
        Delete Budget
      </Button>
    </div>
  );
}

export default DeleteBudget;
