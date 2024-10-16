import { NavLink } from "react-router-dom"
import Logo from '../../assets/img/logo.svg'
import styles from './Navbar.module.css'

const Navbar = () => {
  return (
    <nav>
      <div className= {styles.logo}>
        <img src= {Logo} alt="" />
        <h2>Pet Spot</h2>
      </div>
      <ul>
        <li><NavLink to = '/'>Adotar</NavLink></li>
        <li><NavLink to = '/login'>Entrar</NavLink></li>
        <li><NavLink to = '/register'>Regitrar</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navbar