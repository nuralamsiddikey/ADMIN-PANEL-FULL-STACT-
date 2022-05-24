const router = require('express').Router()
const Server = require('../models/Server')
const { userVerifyToken } = require('../middlewares/verifyToken')
const res = require('express/lib/response')

//CREATE SERVER
router.post('/create', userVerifyToken, async (req, res, next) => {
    try {

        const userId = req.user.id

        const newServer = new Server({ ...req.body, userId })
        const server = await newServer.save()

        //   res.status(200).json({
        //      message: "Successfully created server",
        //      error: false
        //  })

    }
    catch (err) {
        next(err)
    }
})





//FIND ALL SERVER PAGINATION
router.get('/find/pagination',userVerifyToken,async (req, res, next) => {
    try {
        const userId = req.user.id
        const server = await Server.find({userId})
        const len = server.length
        
    

      


        if (server) {
            res.status(200).json({
                message: "Showing results",
                length: len,
                result: server,
                error: false

            })
        }
        else {
            res.status(200).json({
                message: "Didn't found any server",

                error: true
            })
        }
    }

    catch (err) {
        next(err)
    }
})






//FIND ALL SERVER
router.get('/find',userVerifyToken,async (req, res, next) => {
    try {
        const userId = req.user.id
        const server = await Server.find({userId})
      
        
        let page = parseInt(req.query.page)
        let limit = parseInt(req.query.limit)
        if (!page) {
            page = 1
        }
        if (!limit) {
            limit = 10
        }

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const result = server.slice(startIndex, endIndex);

        const len = result.length

        if (server) {
            res.status(200).json({
                message: "Showing results",
                length: len,
                result: result,
                error: false

            })
        }
        else {
            res.status(200).json({
                message: "Didn't found any server",

                error: true
            })
        }
    }

    catch (err) {
        next(err)
    }
})


//FIND ONE SERVER
router.get('/findOne/:id', userVerifyToken,async (req, res, next) => {
    try {
       const object ={
           _id: req.params.id,
           userId: req.user.id
       }
        const server = await Server.findOne(object)
        const len = server.length
    

        if (server) {
            res.status(200).json({
                message: "Showing results",
                length: len,
                result: server,
                error: false

            })
        }
        else {
            res.status(200).json({
                message: "Didn't found  server",

                error: true
            })
        }
    }

    catch (err) {
        next(err)
    }
})







//UPDATE SERVER
router.put('/update/:id', userVerifyToken,async(req, res, next) => {
    try {
        const object ={
            userId: req.user.id,
            _id: req.params.id
        }
        const {
            name,
            serverIp,

            vpnPort,
            sslPort,
            type,
            flag
        } = req.body
        Server.findOneAndUpdate(object,
            {
                $set: {
                    name,
                    serverIp,

                    vpnPort,
                    sslPort,
                    type,
                    flag
                }
            },
            { new: true },
            (err, result) => {
                result && res.status(200).json({
                    message: "Updated successfull",
                    result: result,
                    error: false
                })
            })
    }
    catch (err) {
        next(err)
    }
})

//delete SERVER
router.delete('/delete/:id', userVerifyToken,async (req, res, next) => {
    try {
               const object ={
                   userId: req.user.id,
                   _id: req.params.id
               }
        const serverExistence = await Server.findOne(object)

        if (serverExistence) {
            const result = await Server.findOneAndDelete({ _id: req.params.id })

            result && res.status(200).json({
                message: "Delete successfully",
                error: false
            })
        }
        else {
            res.status(404).json({
                message: "Server did not found",
                error: false
            })
        }
    }
    catch (err) {
        next(err)
    }
})


module.exports = router