const mongoose = require('mongoose')
const Schema = mongoose.Schema


const serverSchema = new Schema({
    name: { type: String, required: true },
    serverIp: { type: String, required: true },
    userId: { type: String, required: true },
    vpnPort: { type: String, required: true },
    sslPort: { type: String, required: true },
    proxyPort: { type: String, required: true },
    type: { type: String, required: true },
    flag: { type: String, required: true },
})

 module.exports = mongoose.model('Server',serverSchema)