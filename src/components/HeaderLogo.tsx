import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function HeaderLogo() {
  return (
    <Link href='/'>
        <div className='items-center hidden lg:flex'>
            <Image src='/next.svg' alt='logo' height={28} width={28}/>
            <p className='font-semibold text-white text-2xl ml-2.5'>
                Finance
            </p>
            {/* rpc feature allows sharing of the api spevification between server and the client */}
            
        </div>
    </Link>
  )
}
export default HeaderLogo