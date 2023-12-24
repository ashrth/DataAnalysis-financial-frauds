import constate from 'constate'
import { useState } from 'react';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false); 
  const [user, setUser] = useState({
    name: 'Kushagra'
  })

  return {
    authVerificationInProgress: isLoading,
    user,
  }
}

export const [AuthProvider, useAuthContext] = constate(useAuth)
