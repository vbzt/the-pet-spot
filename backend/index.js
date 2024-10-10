const express = require('express')
const cors = require('cors')

const app = express()


app.use(cors({ credentials: true, origin: 'http://localhost:3002'}))

app.use(express.static('public'))

//routes
const UserRoutes = require("./routes/UserRoutes")
app.use('/users', UserRoutes)

app.listen(5000, ()=> { 
  console.log('>> server on')
})