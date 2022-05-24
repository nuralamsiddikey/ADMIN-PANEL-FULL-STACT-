const mongoose = require('mongoose')
const Schema = mongoose.Schema


const payloadSchema = new Schema({
    name: { type: String, required: true },
    flag: { type: String, required: true },
    userId:{type: String, required: true},
    info: { type: String, required: true },
    customProxy: { type: String, required: true },
    
    proxyPort: { type: String, required: true },
    type: { type: String, required: true },
    tweak: { type: String, required: true },
})

 module.exports = mongoose.model('Payload',payloadSchema)