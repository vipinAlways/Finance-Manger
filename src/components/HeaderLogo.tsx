import Link from 'next/link'
import React from 'react'

function HeaderLogo() {
  return (
    <Link href='/'>
        <div className='items-center hidden lg:flex'>
        
            <p className='font-semibold text-white text-2xl ml-2.5'>
                Finance
            </p>
                      
        </div>
    </Link>
  )
}
export default HeaderLogo