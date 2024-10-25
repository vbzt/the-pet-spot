const jwt = require('jsonwebtoken')

const User = require('../models/User')

const getUserByToken = async (token) => {   
  if(!token){ 
    return res.status(401).json({ message: 'Acesso negado'})
  }
  
  const decoded = jwt.verify(token, 'getapetsecrettoken')

  const userId = decoded.id

  const user = await User.findById({_id: userId})
  return user
}

module.exports = getUserByToken