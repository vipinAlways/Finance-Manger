'use client'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { usePathname } from 'next/navigation'
import React from 'react'

function WelcomeMsg() {
  const pathName= usePathname()

  const {user} = useKindeBrowserClient()
  const currentDate = new Date()
  if(pathName === '/'){
    return(
      <div>
      <p className='text-white lg:text-xl max-sm:text-sm'>
        Here you can manage your Expencess
      </p>
      </div>
    )
  }
  return (
    <div className='space-y-2 mb-4'>
     <h2 className='text-2xl lg:text-4xl text-white font-medium '>Welcome {user?.given_name} 😁</h2>

     <p className='text-sm lg:text-base text-[#89b6fd]'>
      This is your financial Overview Report till <strong className='text-[#b0b8c6]'>{currentDate.getDate()}/{currentDate.getMonth()}/{currentDate.getFullYear()}</strong> 
     </p>
    </div>
   )
}

export default WelcomeMsg