const editValidation = (req, res) => {
  const { name, email, phone, password, confirmpassword } = req.body

  if (!name) {
    res.status(422).json('O nome é obrigatório')
    return false
  }

  if (!email) {
    res.status(422).json('O email é obrigatório')
    return false
  }

  if (!phone) {
    res.status(422).json('O telefone é obrigatório')
    return false
  }

  if(password && password !== confirmpassword){
    res.status(422).json('As senhas não conferem')
  }


  return true
}

module.exports = editValidation