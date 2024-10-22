const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors({
  origin: '*',
  allowedHeaders: ['Authorization', 'Content-Type'], 
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}))

app.use(express.static('public'))
app.use(express.json())

const UserRoutes = require("./routes/UserRoutes")
const PetRoutes = require("./routes/PetRoutes")
app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)

app.listen(5000, () => {
  console.log('>> server on')
})
