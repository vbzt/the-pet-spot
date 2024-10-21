import Input from "../../form/input"
import styles from "../../form/Form.module.css"
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { Context } from "../../../context/UserContext"



const Login = () => {

  const [user, setUser] = useState({})
  const {login} = useContext(Context)
  const handleChange = (e) => { 
    setUser({...user, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login(user)
  }
  return (
    <section className= {styles.formContainer}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} >
        <Input text='E-mail' type = 'email' name = 'email' placeholder= 'Digite o seu email' handleOnChange={handleChange}></Input>
        <Input text='Senha' type = 'password' name = 'password' placeholder= 'Digite a sua senha' handleOnChange={handleChange}></Input>
        <input type="submit" value="Entrar" />
        <p>Ainda não possuí uma conta? <Link to= '/register' className="colored">Clique aqui</Link></p>
      </form>
    </section>
  )
}

export default Login