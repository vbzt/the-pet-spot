import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className= {styles.footer}>
      <span><p>Made with 💓 by <a className="colored" target="blank" href="https://github.com/vbzt">vbzt</a></p></span>
      <span><h2 >The Pet Spot</h2><p> &copy;2024</p></span>
    </footer>
  )
}

export default Footer