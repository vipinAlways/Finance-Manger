import React from 'react';
import { Button } from './ui/button';

function DeleteTransaction({ transactionID }: { transactionID: string }) {
    const deleteItem = async () => {
       try {
         const response = await fetch(`/api/delete-transaction/${transactionID}`, { method: "DELETE" });
         const data = await response.json();

         if (data.ok) {
             alert("Transaction has been deleted");
         } else {
             alert(`Transaction has not been deleted: ${data.message}`);
         }
       } catch (error) {
        console.error(error);
        alert("An error occurred while deleting the transaction");
       }
    }

    return (
        <Button onClick={deleteItem}>Delete</Button>
    );
}

export default DeleteTransaction;
