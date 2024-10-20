const express = require('express')
const cors = require('cors')

const app = express()

const allowCrossDomain = (req, res, next) =>{
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.use(allowCrossDomain);

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