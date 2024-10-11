const jwt = require('jsonwebtoken')

const createUserToken = async (user, req, res) => { 

  const token = jwt.sign({
    name: user.name, 
    id: user._id
  }, "getapetsecrettoken")

  res.status(200).json({message: 'você esta autenticado', token, userId: user._id})
}

module.exports = createUserToken