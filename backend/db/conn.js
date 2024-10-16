const mongoose = require('mongoose')

async function main(){ 
  try{ 
    await mongoose.connect('mongodb://localhost:27017/getapet')
    console.log('>> mongoose ok')
  }
  catch(e){
    console.log('>> mongoose err: ', e)
  }
}

main()

module.exports = mongoose
