const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const petValidation = require('../helpers/pet-validation')
const Pet = require('../models/Pets')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PetController { 

  static async create(req, res){ 
    
    const { name, age, weight, color} = req.body
    const available = true
    const images = req.files

    if(!petValidation(req, res)) return

    const token = getToken(req)
    const user = await getUserByToken(token)

    const pet = new Pet({name, age, weight, color, available, images: [], user: {_id: user._id, name: user.name, image: user.image, phone: user.phone}})

    images.map((image)=> {
      pet.images.push(image.filename)
    })

    try {
      const newPet = await pet.save()
      res.status(201).json({message: 'Pet cadastrado com sucesso', newPet})
    } catch (error) {
      res.status(500).json({message:error})
    }

  }

  static async getAll(req, res){
    const pets = await Pet.find().sort('-createdAT')
    res.status(200).json({pets})
  }

  static async getAllUserPets(req, res){ 
    const token = getToken(req)
    const user = await getUserByToken(token)

    const pets = await Pet.find({'user._id': user._id}).sort('-createdAT')
    res.status(200).json({pets})
  }

  static async getAllUserAdoptions(req,res){ 
    const token = getToken(req)
    const user = await getUserByToken(token)
    const pets = await Pet.find({'adopter._id': user._id}).sort('-createdAT')
    res.status(200).json({message: 'ASDASD', pets})
  }

  static async getPetById(req,res){ 
    const id = req.params.id    
    
    if(!ObjectId.isValid(id)){ 
      res.status(422).json({message: 'ID Invalido'})
      return
    }

    const pet = await Pet.findById(id)
    if(!pet){
      res.status(404).json({message: 'Pet não encontrado'})
      return
    }
    res.status(200).json({pet})
  }

  static async removePetById(req,res){ 
    const id = req.params.id    
    
    if(!ObjectId.isValid(id)) {
      res.status(422).json({message: 'ID Invalido'})
      return
    }

    const pet = await Pet.findById(id)
    if(!pet){
      res.status(404).json({message: 'Pet não encontrado'})
      return
    }

    const token = getToken(req)
    const user = await getUserByToken(token)
    if(pet.user._id.toString() !== user._id.toString()) {
      res.status(422).json({message: 'Houve um problema em processar sua solicitação, tente novamente mais tarde'})
      return
    }
    await Pet.findByIdAndDelete(id)
    res.status(200).json({message: 'Pet removido com sucesso!'})    
  }

  static async updatePet(req,res){
    const id = req.params.id
    const { name, age, weight, color, available} = req.body
    const images = req.files
    let updatedData = {}

    if(!ObjectId.isValid(id)) {
      res.status(422).json({message: 'ID Invalido'})
      return
    }

    const pet = await Pet.findById(id)
    if(!pet){
      res.status(404).json({message: 'Pet não encontrado'})
      return
    }

    const token = getToken(req)
    const user = await getUserByToken(token)
    if(pet.user._id.toString() !== user._id.toString()) {
      res.status(422).json({message: 'Houve um problema em processar sua solicitação, tente novamente mais tarde'})
      return
    }

    if(petValidation(req, res)){
      updatedData = {...req.body}
      updatedData.available = updatedData.available === 'true' // returns to boolean type
      
      updatedData.images = [] 
      images.map((image) => { 
        updatedData.images.push(image.filename)
      })

      await Pet.findByIdAndUpdate(id, updatedData)
      res.status(200).json({message: 'Pet atualizado com sucesso'})
    }
  }

  static async schedule(req,res){ 
    const id = req.params.id

    const pet = await Pet.findById(id)
    if(!pet){
      res.status(404).json({message: 'Pet não encontrado'})
      return
    }

    const token = getToken(req)
    const user = await getUserByToken(token)

    if(pet.user._id.equals(user._id)) {
      res.status(422).json({message: 'Você não pode agendar uma visita consigo mesmo!'})
      return
    }

    if(pet.adopter){
      if(pet.adopter._id.equals(user._id)){
        res.status(422).json({message: 'Você já agendou uma visita com este pet!'}) 
        return
      }
    }

    pet.adopter = { 
      _id: user._id,
      name: user.name,
      image: user.image
    }

    await Pet.findByIdAndUpdate(id, pet)
    res.status(200).json({message: `A visita foi agendada com sucesso, entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone} para mais detalhes`})
  }

  static async concludeAdoption(req, res){ 
    const id = req.params.id 
    const pet = await Pet.findById(id)
    if(!pet){
      res.status(404).json({message: 'Pet não encontrado'})
      return
    }

    const token = getToken(req)
    const user = await getUserByToken(token)
    if(pet.user._id.toString() === user._id.toString()) {
      res.status(422).json({message: 'Não é possível adotar o seu próprio pet!'})
      return
    }

    pet.available = false
    await Pet.findByIdAndUpdate(id, pet)
    res.status(200).json({message: 'Pet adotado com sucesso!'})




  }
} 