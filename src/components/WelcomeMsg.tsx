'use client'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { usePathname } from 'next/navigation'
import React from 'react'

function WelcomeMsg() {
  const pathName= usePathname()

  const {user} = useKindeBrowserClient()
  const currentDate = new Date()
  if(pathName === '/' && !user){
    return(
      <div>
      <p className='text-white lg:text-xl max-sm:text-sm max-sm:text-center' >
      If you are here, why not give it a try? 
      </p>
      </div>
    )
  }
  else if(pathName === '/' && user){
    return(
      <div>
      <p className='text-[#ffc0f3] lg:text-xl max-sm:text-sm cursor-pointer max-sm:text-center'>
      <span className='hover:shadow-xl shrink text-xl shadow-pink-500'>I</span> {' '} <span className='hover:shadow-xl shadow-pink-500'>Hope</span>{' '} <span className='hover:shadow-xl shadow-pink-500'>You</span> {" "} <span className='hover:shadow-xl shadow-pink-500'>are</span> {' '} <span className='hover:shadow-xl shadow-pink-500'>Loving</span>{' '} <span className='hover:shadow-xl shadow-pink-500'>It</span>
      </p>
      </div>
    )
  }

  else{
    return (
      <div className='space-y-2 mb-4 max-sm:text-center'>
       <h2 className='text-2xl lg:text-4xl text-white font-medium '>Welcome {user?.given_name} 😁</h2>
  
       <p className='text-sm lg:text-base text-[#89b6fd]'>
        This is your financial Overview Report till <strong className='text-[#b0b8c6]'>{currentDate.getDate()}/{currentDate.getMonth()}/{currentDate.getFullYear()}</strong> 
       </p>
      </div>
     )
  }
}

export default WelcomeMsg