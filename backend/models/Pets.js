const mongoose = require('../db/conn')
const { Schema } = mongoose

const Pet = mongoose.model("Pet", new Schema({ 
  name: { type: String, required: true},
  color: { type: String, required: true},
  age: { type: Number, required: true},
  weigth: { type: Number, required: true},
  image: { type: Array, required: true},
  available: { type: Boolean, require: true},
  user: Object,
  adopter: Object
  }, 
  { timestamps: true },
))

module.exports = Pet