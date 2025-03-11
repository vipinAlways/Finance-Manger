"use client"

import { KindeProvider } from '@kinde-oss/kinde-auth-nextjs'
import React from 'react'

const AuthProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <KindeProvider>
        {children}
    </KindeProvider>
  )
}

export default AuthProvider