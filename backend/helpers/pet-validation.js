const petValidation = (req, res) => {
  const { name, age, weight, color } = req.body
  const images = req.files

  if (!name) {
    res.status(422).json({message: 'O nome é obrigatório'})
    return false
  }

  if (!age) {
    res.status(422).json({message: 'A idade é obrigatória'})
    return false
  }

  if (!weight) {
    res.status(422).json({message: 'O peso é obrigatório'})
    return false
  }

  if (!color) {
    res.status(422).json({message: 'A cor é obrigatória'})
    return false
  }

  if(images.length === 0){ 
    res.status(422).json({message: 'A foto é obrigatória'})
    return false
  }
  return true
}

module.exports = petValidation