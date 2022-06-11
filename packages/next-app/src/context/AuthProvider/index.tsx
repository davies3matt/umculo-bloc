import React, { useState, createContext, useContext, useEffect } from 'react'
import { Auth } from "aws-amplify";

import { AuthData } from '../../../types'

type AuthProviderProps = {
  isAuthenticated: boolean
  isAuthenticating: boolean
  user: AuthData
  register: (email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  confirm: (email: string, code: string) => Promise<void>
  setUser: React.Dispatch<React.SetStateAction<any | undefined>>
}

const AuthContext = createContext<Partial<AuthProviderProps>>({})

export const useAuthContext = (): Partial<AuthProviderProps> => useContext(AuthContext)

const AuthProvider: React.FC = ({ children }) => {
  
  const [isAuthenticating, setIsAuthenticating] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<AuthData>()
  
  useEffect(() => {
    if (user) {
      setIsAuthenticated(true)
      setIsAuthenticating(false)
    }
  }, [user])
  
  const logout = async () => {
    await Auth.signOut()
    setUser(undefined)
    setIsAuthenticated(false)
  }
  
  const login = async (email: string, password: string): Promise<void> => {
    try {
      // update auth loading state
      setIsAuthenticating(true)
      
      // sign in user
      const user = await Auth.signIn(email, password)
      localStorage.setItem('userId', user.attributes.sub)
      // set auth context
      setUser({
        token: user.signInUserSession.accessToken.jwtToken,
        username: user.attributes.sub
      })
      
      setIsAuthenticated(true)
      setIsAuthenticating(false)
    } catch (error) {
      setIsAuthenticating(false)
      throw error
    }
  }
  
  const register = async (email: string, password: string): Promise<void> => {
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email
        },
      })
    } catch (error) {
      throw error
    }
  }
  
  const confirm = async (email: string, code: string): Promise<void> => {
    try {
      await Auth.confirmSignUp(email, code)
    } catch (error) {
      throw error
    }
  }
  
  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        logout,
        confirm,
        isAuthenticated,
        isAuthenticating,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
