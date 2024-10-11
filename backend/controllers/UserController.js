const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')

module.exports = class UserController { 

  static async register(req, res){ 
    const { name, email, phone, password, confirmpassword} = req.body

    if(!name){
      res.status(422).json('O nome é obrigatorio')
      return
    }

    if(!email){
      res.status(422).json('O email é obrigatorio')
      return
    }

    if(!phone){
      res.status(422).json('O telefone é obrigatorio')
      return
    }

    if(!password){
      res.status(422).json('A senha é obrigatoria')
      return
    }

    if(!confirmpassword){
      res.status(422).json('A confirmação de senha é obrigatoria')
      return
    }

    if(password !== confirmpassword){ 
      res.status(422).json('A senha e a confirmação de senha devem ser iguais')
      return
    }

    const userExists = await User.findOne({email: email})
    if (userExists) {
      res.status(422).json('Por favor utilize outro email')
      return 
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
   
    const user = new User({ name, email, phone, password: passwordHash})

    try{
      const newUser = await user.save()
      
      await createUserToken(newUser, req, res)
    }catch(err){
      res.status(500).json({message: err})
    }
  }

  static async login(req, res){ 
    const { email, password } = req.body 

    if(!email){
      res.status(422).json('O email é obrigatorio')
      return
    }

    if(!password){
      res.status(422).json('A senha é obrigatoria')
      return
    }

    const user = await User.findOne({email: email})
    if (!user) {
      res.status(422).json('Nao ha usuario cadastrado com esse email')
      return 
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    if(!checkPassword ){
      res.status(422).json('Senha incorreta')
      return 
    }

    await createUserToken(user, req, res)
  }

  static async checkUser(req, res){ 
    let currentUser

    if(req.headers.authorization){
    
      const token = getToken(req)
      const decoded = jwt.verify(token,'getapetsecrettoken')

     currentUser = await User.findById(decoded.id)
  
      currentUser.password = undefined

    }else{ 
      currentUser = null
    }
    res.status(200).send(currentUser)
  }

  static async getUserById(req, res) { 
    const id = req.params.id 
    const user = await User.findById(id).select("-password")

    if(!user){ 
      res.status(422).json({ message: 'Usuario nao encontrado'})
      return
    }
    
    res.status(200).json({user})
  }

  static async editUser(req, res){
    const { name, email, phone, password, confirmpassword} = req.body 
    const id = req.params.id

    const user = await User.findById(id)
    if(!user){
       res.status(422).json({message: 'Usuario nao encontrado'})
    }


  }
}