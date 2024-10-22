import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "./components/pages/Home"
import Register from "./components/pages/Auth/Register"
import Login from "./components/pages/Auth/Login"
import Navbar from "./components/layouts/Navbar"
import Footer from "./components/layouts/Footer"
import Container from "./components/layouts/Container"

import { UserProvider } from "./context/UserContext"
import Message from "./components/layouts/Message"
import EditProfile from "./components/pages/User/EditProfile"

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar></Navbar>
        <Message></Message>
          <Container>
          <Routes>
            <Route path="/login" element = {<Login></Login>}></Route>
            <Route path="/register" element = {<Register></Register>}></Route>
            <Route path="/" element = {<Home></Home>}></Route>
            <Route path='/user/profile/edit' element = {<EditProfile></EditProfile>}></Route>
          </Routes>
          </Container>
        <Footer></Footer>
      </UserProvider>
    </Router>
  )
}

export default App
