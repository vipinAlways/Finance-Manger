'use client'
import React from 'react'
import NavButton from './NavButton'
import { usePathname } from 'next/navigation'

const routes =[
    {href:'/',label:"Overview"},
    {href:'/transaction',label:"Aransactions"},
    {href:'/acounts',label:"Acounts"},
    {href:'/categories',label:"Categories"},      
    {href:'/settings',label:"Settings"},      
]
function Navbar() {

    const pathName  = usePathname()
  return (
    <nav className='hidden lg:flex items-center gap-x-2 overflow-x-auto'>
        {routes.map((route)=>(
            <NavButton key={route.href} href={route.href}
            label={route.label} isActive={pathName=== route.href}/>
        ))}
    </nav>
  )
}

export default Navbar