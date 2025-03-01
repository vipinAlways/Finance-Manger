"use client"
import AccountHistory from "@/components/AccountHistory"
import { use } from "react"


const page = ({params}:{params:Promise<{acountId :string}>}) => {
  const {acountId} = use(params)
  return (
    <div>
        <AccountHistory accountId ={acountId}/>
    </div>
  )
}

export default page