import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { getKindeServerSession, LogoutLink,LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/server'

async function  AuthButtons() {

    const {getUser} = getKindeServerSession()

    const user = await getUser()
  return (
    
    <div className='flex justify-center items-center'>
       {user ? <div>
           <Button className=''><LogoutLink >Log out</LogoutLink></Button>
       </div> :<div className='flex justify-center items-center gap-2'>
       <Button>
            <LoginLink className='p-2 text-base'>Sign in</LoginLink>
        </Button>
       <Button>
            <RegisterLink className='p-2 text-base'>Sign up</RegisterLink>
        </Button>
        </div>}  
       
       
    </div>
  )
}

export default AuthButtons