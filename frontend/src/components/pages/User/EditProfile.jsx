import styles from './Profile.module.css'
import formStyles from "../../form/Form.module.css"
import Input from '../../form/input'
import { useEffect, useState } from 'react'
import useFlashMessage from '../../../hooks/useFlashMessage'
import api from '../../../utils/api'
const Profile = () => {
  const [user, setUser] = useState({})
  const [preview, setPreview] = useState()
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get('/users/checkuser', {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        })
        setUser(data)
      } catch (error) {
        console.error('>> err:', error)
      }
    }
  
    if (token) {
      fetchUser()
    }
  }, [token])
  

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
    console.log(user)
  }

  function onFileChange(e) {
    setPreview(e.target.files[0])
    setUser({ ...user, [e.target.name]: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let msgType = 'success'

    const formData = new FormData()

    const userFormData = await Object.keys(user).forEach((key) =>
      formData.append(key, user[key]),
    )

    formData.append('user', userFormData)

    const data = await api
      .patch(`/users/edit/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data)
        return response.data
      })
      .catch((err) => {
        console.log(err)
        msgType = 'error'
        return err.response.data
      })

    setFlashMessage(data.message, msgType)
  }

  return (
    <section>
      <h1>Perfil</h1>
      <p>Preview Image</p>
      <form>
        <Input text= 'Imagem' type= 'file' name = 'imagem' ></Input>
        <Input text="E-mail" type="email" name="email" placeholder="Digite o e-mail" handleOnChange={handleChange} value={user.email || ''}></Input>
        <Input text="Nome" type="text" name="name" placeholder="Digite o nome" handleOnChange={handleChange} value={user.name || ''} />
        <Input text="Telefone" type="text" name="phone" placeholder="Digite o seu telefone" handleOnChange={handleChange} value={user.phone || ''} ></Input>
        <Input text="Senha" type="password" name="password" placeholder="Digite a sua senha" handleOnChange={handleChange}></Input>
        <Input text="Confirmação de senha" type="password" name="confirmpassword" placeholder="Confirme a sua senha" handleOnChange={handleChange}></Input>
        <input type="submit" value="Editar" />
      </form>
    </section>
  )
}

export default Profile