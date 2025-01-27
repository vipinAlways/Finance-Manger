'use client'
import React, { useState } from 'react'
import NavButton from './NavButton' 
import { usePathname, useRouter } from 'next/navigation'

import { Sheet,SheetContent,SheetTrigger } from './ui/sheet'
import { useMedia } from 'react-use'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'


const routes =[
    {href:'/dashboard',label:"Overview"},
    {href:'/transaction',label:"Transactions"},
    {href:'/acounts',label:"Acounts"},
    {href:'/categories',label:"Categories"},      
          
]
function Navbar() {
  const [isOpen,setIsopen] =useState(false)
    const pathName  = usePathname()
    const router = useRouter()
    const isMobile = useMedia("(max-width:1024px)",false)

    const onClick =(href:string)=>{
      router.push(href)
      setIsopen(false)
    }

    if (isMobile) {
      return(
        <Sheet open={isOpen} onOpenChange={setIsopen} >
            <SheetTrigger asChild>
              <Button variant="outline" size='sm' className='font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/20 transition '>
                <Menu className='size-4'/>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='px-2'>
              <nav className='flex flex-col gap-y-2 pt-6'>
                {routes.map((route)=>(
                    <Button variant={route.href === pathName ? "secondary":"ghost"} key={route.href} onClick={()=>onClick(route.href)} className='w-full justify-start'>
                      {route.label}
                    </Button>
                ))}
              </nav>
            </SheetContent>
        </Sheet>
      )
    }

  return (
    <nav className='hidden lg:flex items-center gap-x-2 overflow-x-auto '>
        {routes.map((route)=>(
            <NavButton key={route.href} href={route.href}
            label={route.label} isActive={pathName=== route.href}/>
        ))}
    </nav>
  )
}

export default Navbar