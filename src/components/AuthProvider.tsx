"use client"

import { KindeProvider } from '@kinde-oss/kinde-auth-nextjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'

const AuthProvider = ({children}:{children:React.ReactNode}) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>

    <KindeProvider>
        {children}
    </KindeProvider>
    </QueryClientProvider>
  )
}

export default AuthProvider