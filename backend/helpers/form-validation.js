const formValidation = (req, res) => {
  const { name, email, phone, password, confirmpassword } = req.body

  if (!name) {
    res.status(422).json({message: 'O nome é obrigatório'})
    return false
  }

  if (!email) {
    res.status(422).json({message: 'O email é obrigatório'})
    return false
  }

  if (!phone) {
    res.status(422).json({message: 'O telefone é obrigatório'})
    return false
  }

  if (!password) {
    res.status(422).json({message: 'A senha é obrigatória'})
    return false
  }

  if (!confirmpassword) {
    res.status(422).json({message: 'A confirmação de senha é obrigatória'})
    return false
  }

  if (password !== confirmpassword) {
    res.status(422).json({message:'A senha e a confirmação de senha devem ser iguais' })
    return false
  }

  return true
}

module.exports = formValidation