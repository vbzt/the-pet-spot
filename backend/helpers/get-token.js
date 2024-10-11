const getToken = (req) => { 
  const authHeader = req.header.authorization
  const token = authHeader.split(' ')[1]
  return token
}

module.exports = getToken