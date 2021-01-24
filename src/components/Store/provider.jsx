import React, {
    createContext,
    useCallback,
    useState,
    useContext,
  } from 'react'
  //import UserAuth from '../services/auth'
  import auth from '../../utils/auth'
  
  const AuthContext = createContext({})
  
  const AuthProvider = ({ children }) => {
    const [data, setData] = useState(() => {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      const permissions = localStorage.getItem('permissions')
    
      if (token && user) {
        return {
          token,
          /* user: JSON.parse(user), */
          user: user,
          //access: JSON.parse(access),
          permissions,
        }
      }
  
      return {}
    })
  
    const signIn = useCallback(async ({ email, password }) => {
      
      const response = await auth.login({email, password})
      console.log('response do provider: ', response)
      /* const {
        token,
        user,
        permissions,
      } = response.data */
      const token = response.token
      const user = response.user
      const permissions = response.permission
  
      localStorage.setItem('token', token)
      localStorage.setItem('user', user)
      localStorage.setItem('permissions', permissions)
     
      setData({ token, user, permissions })
    }, [])
  
    const signOut = useCallback(() => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('access')
      localStorage.removeItem('permissions')
      
      setData({})
    }, [])

    const isLogged = useCallback(() => {
      if(data.token) return true
      return false
    }, [])
  
    return (
      <AuthContext.Provider
        value={{
          user: data.user,
          permissions: data.permissions,
          token: data.token,
          data: data,
          signIn,
          signOut,
          isLogged
        }}>
        {children}
      </AuthContext.Provider>
    )
  }
  
  function useAuth() {
    const context = useContext(AuthContext)
    /* console.log('contexto useauth ', context) */
    if (!context) {
      throw new Error('useAuth must be used within an AuthPovider')
    }
  
    return context
  }
  
  export { AuthProvider, useAuth }