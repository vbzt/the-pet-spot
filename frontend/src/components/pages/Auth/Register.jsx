import Input from "../../form/input"
import styles from "../../form/Form.module.css"
import { Link } from "react-router-dom"
import { useState } from "react"

const Register = () => {

  const [user, setUser] = useState({})
  const handleChange = (e) => { 
    setUser({...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(user)
  }
  return (
    <section className= {styles.formContainer}>
      <h1>Registrar conta</h1>
      <form onSubmit={handleSubmit} >
        <Input text='Nome' type = 'text' name = 'name' placeholder= 'Digite o seu nome' handleOnChange={handleChange}></Input>
        <Input text='E-mail' type = 'email' name = 'email' placeholder= 'Digite o seu email' handleOnChange={handleChange}></Input>
        <Input text='Telefone' type = 'text' name = 'phone' placeholder= 'Digite o seu telefone' handleOnChange={handleChange}></Input>
        <Input text='Senha' type = 'password' name = 'password' placeholder= 'Digite a sua senha' handleOnChange={handleChange}></Input>
        <Input text='Confirme a senha' type = 'password' name = 'confirmpassword' placeholder= 'Confirme a sua senha' handleOnChange={handleChange}></Input>
        <input type="submit" value="Cadastrar" />
        <p>Já possuí uma conta? <Link to= '/login' className="colored">Clique aqui</Link></p>
      </form>
    </section>
  )
}

export default Register