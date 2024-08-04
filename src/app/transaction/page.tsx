'use client'
import AddTransaction from '@/components/AddTransaction'
import TransactionTable from '@/components/TransactionTable'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

function page() {
   
    const [block, setBlock] = useState(false)

    const onclick = ()=>{
      if (block) setBlock(false)
        
      setBlock(true)
    }
   

 

  return (
   <div className=''>
        <div className='flex justify-end w-full'>
                <Button onClick={onclick}>Add Transaction</Button>

        </div>
                <AddTransaction className={block ?`` :'hidden' }/>

        <div className='w-full h-full relative '>
          <TransactionTable/>
        </div>
   </div>
  )
}
 
export default page