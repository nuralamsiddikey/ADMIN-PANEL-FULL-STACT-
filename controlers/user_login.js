const router = require("express").Router();
const CryptoJS = require("crypto-js");
const User = require("../models/User");
const jwt = require('jsonwebtoken')


router.post('/login',async(req,res,next)=>{
    try{
          const{email,password}= req.body


          if(email){
                 const user = await User.findOne({email:email})
                  if(user != null){

                    const originalPassword =  CryptoJS.AES.decrypt(user.password, process.env.USER_PASS_SEC).toString(CryptoJS.enc.Utf8);
                
                    if(originalPassword == password && user.email==email){
                        const token =  jwt.sign({
                              email: user.email,
                              id: user._id
                          },
                          
                         process.env.JWT_USER_SEC
                          ,{expiresIn:'2h'})
             
                       res.cookie("jwt",token).redirect('/adminPanel')
                        
                       //    token && res.status(200).json({
                       //        message: "Login Successfull",
                       //        token:token,
                       //        error: false
                       //    })
                         
                    }
                    else{
                       await req.flash('info', 'Access denied!');
                       res.redirect('/')
                    }



                  }
                  else{
                      await req.flash('info', 'Access denied!')
                      res.redirect('/')
                  }
                 
          }
          else{
            await req.flash('info', 'Access denied!');
            res.redirect('/')
          }
    }
    catch(err){
        next(err)
    }
})

module.exports = router