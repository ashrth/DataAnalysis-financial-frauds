import constate from 'constate'
import { useState } from 'react';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false); 
  const [user, setUser] = useState({
    name: 'Kushagra'
  })

  const login = ()=>{
    
  }

  const logout = ()=>{

  }

  return {
    authVerificationInProgress: isLoading,
    user,
    login,
    logout
  }
}

export const [AuthProvider, useAuthContext] = constate(useAuth)
