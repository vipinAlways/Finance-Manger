import React from 'react';
import { Button } from './ui/button';

function DeleteTransaction(props: any) {
    // console.log(props.id);

    const deleteItem = async () => {
       try {
         let response = await fetch(`/api/delete-transaction/${props.id}`, { method: "delete" });
        
         response = await response.json();
         if (response.ok) {
             alert("Transaction has been DELETEd");
         } else {
             alert("Transaction has not been deleted");
         }
       } catch (error) {
        console.log(error);
       }
    }

    return (
        <Button onClick={deleteItem}>Delete</Button>
    );
}

export default DeleteTransaction;
