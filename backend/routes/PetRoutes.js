const router =  require('express').Router()

const PetController = require('../controllers/PetController')

//middleware
const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-uploader')


router.get('/', PetController.getAll)
router.get('/mypets', verifyToken,  PetController.getAllUserPets)
router.get('/:id', PetController.getPetById)
router.get('/myadoptions', verifyToken,  PetController.getAllUserAdoptions)
router.post('/create', verifyToken, imageUpload.array('images'), PetController.create)

module.exports = router 