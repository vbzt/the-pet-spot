import api from '../utils/api'

import {useState, useEffect} from 'react'
import {useNavigate } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth() { 
  const [authenticated, setAuthenticated] = useState(false)
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){ 
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }
  }, [])

  async function register(user){ 
    const { setFlashMessage } = useFlashMessage()
    let msgText = 'Cadastro realizado com sucesso'
    let msgType = 'success'
    try {
      const { data } = await api.post('/users/register', user)
      await authUser(data)

    } catch (error) {
        msgText = error.response.data.message
        msgType = 'error'
    }

    setFlashMessage(msgText, msgType)
  }


  async function login(user){ 
    const { setFlashMessage } = useFlashMessage()
    let msgText = 'Login realizado com sucesso'
    let msgType = 'success'

    try {
      
      const { data } = await api.post('/users/login', user)
      await authUser(data)

    } catch (error) {
      msgText = error.response.data
      msgType = 'error'
    }
    setFlashMessage(msgText, msgType)
  }


  async function authUser(data){
    setAuthenticated(true)
    localStorage.setItem('token', JSON.stringify(data.token))
    navigate('/')
  }

  async function logout(){ 
    const msgText = 'Logout realizado com sucesso'
    const msgType = 'success'
    setAuthenticated(false)
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = undefined
    navigate('/')
    setFlashMessage(msgText, msgType)
  }
  return {authenticated, register, logout, login}
}