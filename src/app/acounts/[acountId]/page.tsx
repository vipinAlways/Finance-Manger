"use client"
import AccountHistory from "@/components/AccountHistory"
import { Button } from "@/components/ui/button"
import { use, useEffect } from "react"


const page = ({params}:{params:Promise<{acountId :string}>}) => {
  const {acountId} = use(params)

  
  const deleteBudget = async () => {
    if (!acountId) return;

    try {
      const response = await fetch(`/api/delete-budget?amountId=${acountId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);

      if (data.ok) {
        alert("Transaction has been deleted");
      }
    } catch (error) {
      console.error("Error during fetch operation:", error);
      alert("An error occurred while deleting the transaction. Please try again.");
    }
  };
  return (
    <div>
        <AccountHistory accountId ={acountId}/>

        <Button onClick={deleteBudget}>Delete budget</Button>
    </div>
  )
}

export default page