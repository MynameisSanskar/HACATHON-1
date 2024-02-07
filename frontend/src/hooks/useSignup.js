import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const Navigate=useNavigate()

  const signup = async (userType,email, password,username,props) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:3001/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ userType,email, password,username })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
      
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})
    

      // update loading state
      setIsLoading(false)
      Navigate('/')
    }
  }

  return { signup, isLoading, error }
}