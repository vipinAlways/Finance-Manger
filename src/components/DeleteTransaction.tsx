"use client";
import React from "react";
import { Button } from "./ui/button";

type DeleteTransactionProps = {
  transactionId: string;
};

const DeleteTransaction: React.FC<DeleteTransactionProps> = ({
  transactionId,
}) => {
  const deleteTransaction = async () => {
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
          window.location.reload();
        }
      } catch (error) {
        console.error("Error during fetch operation:", error);
        alert(
          "An error occurred while deleting the transaction. Please try again."
        );
      }
    } else null;
  };
  return <Button onClick={deleteTransaction}>Delete</Button>;
};

export default DeleteTransaction;