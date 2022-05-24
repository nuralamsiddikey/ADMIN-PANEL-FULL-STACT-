const router = require('express').Router()
const Payload = require('../models/Payload')
const {userVerifyToken} = require('../middlewares/verifyToken')

//CREATE payload
router.post('/create',userVerifyToken,async(req,res,next)=>{
  try{
       const{
           name,
           flag,
           info,
           customProxy,
           proxyPort,
           type,
           tweak
       } = req.body
   
        const  userId = req.user.id
        const payloadObj = {
            name,
            flag,
            userId,
            info,
            customProxy,
            proxyPort,
            type,
            tweak
        }
       
         const newPayload = new Payload(payloadObj)
         const payload = await newPayload.save()
          if(payload){
              console.log("success")
          }
  }
  catch(err){
      next(err)
  }
})




//FIND ALL payload PAGINATION
router.get('/find/pagination', userVerifyToken,async (req, res, next) => {
    try {
        const object ={
            userId: req.user.id,

        }
        const payload = await Payload.find(object)
        const len = payload.length
      
 
     

        if (payload) {
            res.status(200).json({
                message: "Showing results",
                length: len,
                result: payload,
                error: false

            })
        }
        else {
            res.status(200).json({
                message: "Didn't found any payload",

                error: true
            })
        }
    }

    catch (err) {
        next(err)
    }
})








//FIND ALL payload
router.get('/find', userVerifyToken,async (req, res, next) => {
    try {
        const object ={
            userId: req.user.id,

        }
        const payload = await Payload.find(object)
      
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
        const result = payload.slice(startIndex, endIndex);

        const len = result.length

        if (payload) {
            res.status(200).json({
                message: "Showing results",
                length: len,
                result: result,
                error: false

            })
        }
        else {
            res.status(200).json({
                message: "Didn't found any payload",

                error: true
            })
        }
    }

    catch (err) {
        next(err)
    }
})


// FIND PAYLOAD BY ID
router.get('/findOne/:id', userVerifyToken,async (req, res, next) => {
    try {
       
  const object ={
      userId: req.user.id,
      _id: req.params.id

  }

        const payload = await Payload.findOne(object)
        const len = payload.length
    

        if (payload) {
            res.status(200).json({
                message: "Showing results",
                length: len,
                result: payload,
                error: false

            })
        }
        else {
            res.status(200).json({
                message: "Didn't found  payload",

                error: true
            })
        }
    }

    catch (err) {
        next(err)
    }
})












//UPDATE payload
router.put('/update/:id', userVerifyToken,async(req,res,next)=>{
    try{
        const object ={
            userId: req.user.id,
            _id: req.params.id
      
        }
        const{
           name,
           flag,
           info,
           customProxy,
           proxyPort,
           type,
           tweak
        }= req.body
        console.log(req.params.id)
      Payload.findOneAndUpdate(object,
        {
            $set:{
                name,
                flag,
                info,
                customProxy,
                proxyPort,
                type,
                tweak
            }
        },
       {new: true},
        (err,result)=>{
        //  result && res.status(200).json({
        //      message: "Updated successfull",
        //      result:result,
        //      error: false
        //  })
        console.log("success")
      })
    }
    catch(err){
        next(err)
    }
})



//delete payload
router.delete('/delete/:id', userVerifyToken,async(req,res,next)=>{
    try{

        const object ={
            userId: req.user.id,
            _id: req.params.id
      
        }


        const payloadExistence = await Payload.findOne(object)

          if(payloadExistence){
            const result = await  Payload.findOneAndDelete({_id: req.params.id})

            result && res.status(200).json({
                message: "Delete successfully",
                error: false
            })
          }
          else{
              res.status(404).json({
                  message:"Payload did not found",
                  error: false
              })
          }
    }
    catch(err){
        next(err)
    }
})






module.exports = router