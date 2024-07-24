import React from 'react'
import HeaderLogo from './HeaderLogo'
import Navbar from './Navbar'
import { Button } from './ui/button'
import AuthButtons from './AuthButtons'
import { cn } from '@/lib/utils'
import WelcomeMsg from './WelcomeMsg'

function Header() {
  return (
    <header className={cn('bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-4 lg:px-14 h-fit pb-4')}>

        <div className='max-w-screen-2xl mx-auto  '>
            <div className='w-full flex items-center justify-between mb-14 '>
                <div className='flex items-center lg:gap-16'>
                    <HeaderLogo/>
                    <Navbar/>
                     </div>
                <div className='flex justify-center items-center'>
                      <AuthButtons/>
                </div>

            </div>

            <div>
             <WelcomeMsg/>
            </div>
        </div>
    </header>
  )
}

export default Header