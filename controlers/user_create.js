const router = require('express').Router()
const { verifyToken } = require('../middlewares/verifyToken')
const User = require('../models/User')
const CryptoJS = require('crypto-js')




// CHECK IS USER ALEAY EXIST
router.get('/find', verifyToken, async (req, res) => {
    try {

        const adminId = req.user.id
      const{
          userName,
          email
      } = req.query

        const user = await User.find({$or:[{userName,adminId},{email,adminId}]})
     
        if (user.length) {
            res.send({
                result: true
            })
        }
        else {
            res.send({
                result: false
            })
        }

    }
    catch (err) {
        console.log(err)
    }
})



//USER CREATE
router.post('/create', verifyToken, async (req, res, next) => {
    try {

        const adminId = req.user.id

        let {
            userName,
            email,
            password
        } = req.body

        password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.USER_PASS_SEC
        ).toString();

        const checkUser = {
            userName,
            email,
            adminId
        }


        const existUser = await User.findOne(checkUser)

        if (existUser != null) {
            res.status(404).json({
                message: "User already exist",
                error: true
            })
        }
        else {

            const newUser = new User({
                userName,
                email,
                password,
                adminId
            })
            if (userName && email && password) {
                const user = await newUser.save()
             
                    res.status(200).json({
                        message: "User created successfully",
                        error: false
                   
                })
            }



            else {
                res.status(403).send("can't created")
            }
        }



    }
    catch (err) {
        next(err)
    }
})


// USER DELETE
router.delete('/delete/:id', verifyToken, async (req, res, next) => {
    try {
        const object = {
            userId: req.user.id,
            _id: req.params.id
        }
        const userExistence = await User.findOne(object)

        if (userExistence) {
            const result = await User.findOneAndDelete(object)

            res.status(200).json({
                message: "Delete successfully",
                error: false
            })
        }
        else {
            res.status(404).json({
                message: "User did not found",
                error: false
            })
        }
    }
    catch (err) {
        next(err)
    }
})


// USER FIND BY ID
router.get('/findOne/:id', verifyToken, async (req, res, next) => {
    try {
        const object = {
            _id: req.params.id,
            userId: req.user.id
        }
        const user = await User.findOne(object)
        const len = user.length
        const originalPassword = CryptoJS.AES.decrypt(user.password, process.env.USER_PASS_SEC).toString(CryptoJS.enc.Utf8);
        const u = {
            userName: user.userName,
            email: user.email,
            password: originalPassword
        }

        if (user) {
            res.status(200).json({
                message: "Showing results",
                length: len,
                result: u,
                error: false

            })
        }
        else {
            res.status(404).json({
                message: "Didn't found  user",

                error: true
            })
        }
    }

    catch (err) {
        next(err)
    }
})


//USER UPDATE
router.put('/update/:id', verifyToken, async (req, res, next) => {
    try {

        const object = {
            adminId: req.user.id,
            _id: req.params.id
        }
        const newpassword = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.USER_PASS_SEC
        ).toString();

        const newBody = {
            userName: req.body.userName,
            email: req.body.email,
            password: newpassword
        }

        User.findOneAndUpdate(object,
            {
                $set: newBody
            },
            { new: true },
            (err, result) => {
                console.log(result)
                res.status(200).json({
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





module.exports = router