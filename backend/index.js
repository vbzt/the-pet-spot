const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors({ credentials: true, origin: 'http://localhost:3002'}))

app.use(express.static('public'))
app.use(express.json())

//routes
const UserRoutes = require("./routes/UserRoutes")
const PetRoutes = require("./routes/PetRoutes")
app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)

app.listen(5000, ()=> { 
  console.log('>> server on')
})