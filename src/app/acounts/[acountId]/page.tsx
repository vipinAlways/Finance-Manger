import AccountHistory from "@/components/AccountHistory"


const page = async({params}:{params:Promise<{acountId :string}>}) => {

    const acountId  = (await params).acountId
  return (
    <div>
        <AccountHistory accountId ={acountId}/>
    </div>
  )
}

export default page