import React from "react";
import { Button } from "./ui/button";

type DeleteTransactionProps = {
  transactionID: string;
};

function DeleteTransaction({ transactionID }: DeleteTransactionProps) {
  const deleteItem = async () => {
    try {
      const response = await fetch(`/api/delete-transaction/${transactionID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the transaction");
      }

      const data = await response.json();

      if (data.ok) {
        alert("Transaction has been deleted");
      } else {
        alert(`Transaction has not been deleted: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      alert(`An error occurred while deleting the transaction: ${transactionID}`);
    }
  };

  return (
    <Button onClick={deleteItem}>Delete</Button>
  );
}

export default DeleteTransaction;
