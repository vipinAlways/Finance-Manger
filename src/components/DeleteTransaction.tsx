"use client";
import React from "react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "./ui/use-toast";


type DeleteTransactionProps = {
  transactionId: string;
};

const DeleteTransaction: React.FC<DeleteTransactionProps> = ({
  transactionId,
}) => {
  const {toast} = useToast()
  const deleteTransaction = async (transactionId:string) => {
    if (transactionId) {
      try {
        const response = await fetch(
          `/api/delete-transaction?transactionId=${transactionId}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();
        if (data.ok) {
          alert("Transaction has been deleted");
          
        }
      } catch (error) {
        console.error("Error during fetch operation:", error);
        alert(
          "An error occurred while deleting the transaction. Please try again."
        );
      }
    } else null;
  };


  const {mutate} =useMutation({
    mutationFn:deleteTransaction,
    onSuccess:()=>{
      toast({
        title: "Success",
        description: "Transaction deleted successfully",
        action: <Button variant="outline">Undo</Button>,
      })
    }
  })
  return <Button onClick={()=>mutate(transactionId)}>Delete</Button>;
};

export default DeleteTransaction;