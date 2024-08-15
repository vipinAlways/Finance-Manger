import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

function DeleteBudget({ className, amountId }: { className: string; amountId: string }) {

const [animation,setAnimation] = useState('')

useEffect(()=>{
    window.addEventListener('scroll', function() {
        setAnimation('');
    });
},[])
  const deleteBudget  =async ()=>{
    try {
      const response = await fetch(`/api/deleteBudget/${amountId}`, { method: 'DELETE' });
      const data = await response.json();
      
      if (data.ok) {
        alert("Budget has been deleted");
      } else {
        console.error('Failed to delete budget');
      }
    } catch (error) {
      console.error('Error:', error);
    }
 
  }

  return (
    <div onMouseEnter={()=>setAnimation("animation")} className={cn('rotate-90 absolute top-1/2 -left-28 bg-green-600 text-white rounded-lg  -translate-x-20 -translate-y-1/2 p-3',className,animation) }>
        <Button onClick={deleteBudget} className='lg:text-xl max-sm:text-sm max-md:text-lg'>Delete Budget</Button>
    </div>
  )
}

export default DeleteBudget