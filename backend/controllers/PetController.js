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
    res.status(200).json({pets})
  }

  static async getPetById(req,res){ 
    const id = req.params.id    
    if(!ObjectId.isValid(id)) {
      res.status(422).json({message: 'ID invalido'})
      return
    }

    const pet = await Pet.findById(id)
    if(!pet){
      res.status(404).json({message: 'Pet não encontrado'})
    }
    res.status(200).json({pet})



  }
}