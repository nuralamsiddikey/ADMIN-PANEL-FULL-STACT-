const mongoose = require('mongoose')
const Schema = mongoose.Schema


const configSchema = new Schema({
    releaseNote: { type: String ,required: true},
    releaseVersion: { type: String , required: true},
    userId:{type: String, required: true}
   
})

 module.exports = mongoose.model('Config',configSchema)