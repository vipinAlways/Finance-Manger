'use client'
import AddTransaction from '@/components/AddTransaction'
import TransactionTable from '@/components/TransactionTable'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

function page() {
   
    const [block, setBlock] = useState(false)
   

 

  return (
   <div className='w-full'>
        <div className='flex justify-end w-full'>
                <Button onClick={()=>(setBlock(true))}>Add Transaction</Button>

                <AddTransaction className={block ?`block` :'hidden' }/>
        </div>

        <TransactionTable/>
   </div>
  )
}
 
export default page