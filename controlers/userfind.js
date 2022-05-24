const router = require('express').Router()
const res = require('express/lib/response')
const {verifyToken} = require('../middlewares/verifyToken')
const User = require('../models/User')
const CryptoJS = require('crypto-js')


//GET ALL USER 
router.get('/user/find/all',verifyToken,async(req,res)=>{
    try{
        const adminId = req.user.id
         const user = await User.find({adminId})
        
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
         const result = user.slice(startIndex, endIndex);


       
          
         const newUser = result.map((user,index)=>{
             let obj = {}
          
             obj._id = user._id
             obj.userName = user.userName
             obj.email = user.email
             obj.password =  CryptoJS.AES.decrypt(user.password, process.env.USER_PASS_SEC).toString(CryptoJS.enc.Utf8);
             return obj
         })
 
    

         const len = user.length
         res.status(200).json({
             message: "Showing results",
             length: len,
             result: newUser,
         
             error: false
         })
    }
    catch(err){
        console.log(err)
    }
})


//GET ALL USER FOR PAGINATION
router.get('/user/find/all/pagination',verifyToken,async(req,res)=>{
    try{
        const adminId = req.user.id
         const user = await User.find({adminId})
        
        



         const newUser = user.map(user=>{
             let obj = {}
             obj._id = user._id
             obj.userName = user.userName
             obj.email = user.email
             obj.password =  CryptoJS.AES.decrypt(user.password, process.env.USER_PASS_SEC).toString(CryptoJS.enc.Utf8);
             return obj
         })



         const len = user.length
         res.status(200).json({
             message: "Showing results",
             length: len,
             result: newUser,
             error: false
         })
    }
    catch(err){
        console.log(err)
    }
})






module.exports = router