const router = require("express").Router();
const CryptoJS = require("crypto-js");
const Admin = require("../models/Admin");
const jwt = require('jsonwebtoken')


router.post("/post", async (req, res, next) => {
  try {
    const email = "admin1@gmail.com";

    const password = CryptoJS.AES.encrypt(
      "admin1",
      process.env.ADMIN_PASS_SEC
    ).toString();

    const newAdmin = new Admin({ email, password });
    const admin = newAdmin.save();

  } catch (err) {
    next(err);
  }
});

// router.post('/login',(req,res)=>{
  
//     res.redirect('/adminPanel')
//     console.log(req.body)
  
// })
 
 
router.post('/login', async(req, res) => {
 
 
    const { email, password } = req.body


    if (email) {
      const admin = await Admin.findOne({ email: email })
   




      if (admin != null) {
        const originalPassword = CryptoJS.AES.decrypt(admin.password, process.env.ADMIN_PASS_SEC).toString(CryptoJS.enc.Utf8);
        if (originalPassword == password && admin.email == email) {
          const token =  jwt.sign({
            email: admin.email,
            id: admin._id,

          },

            process.env.JWT_SEC
            , { expiresIn: '2h' })

         
            res.cookie("jwt",token).redirect('/user')
           
      

          // res.cookie("type","admin")
          //  res.status(200).json({
          //           message: "Login Successfull",
          //           token:token,
          //           error: false
          //       })
        }
        else {
          await req.flash('info', 'Access denied!');
          res.redirect('/')
        }
      }
     else {

        await req.flash('info', 'Access denied!');
        res.redirect('/')

      }



    }
    else {
      await req.flash('info', 'Access denied!');
        res.redirect('/')
    }

})


//ADMIN FIND
router.get('/find', async (req, res) => {
  try {

    const admin = await Admin.findOne({ email: req.query.email })

    if (admin != null) {
      res.status(200).send({ result: true })
    }
    else {
      res.status(200).send({ result: false })
    }
  }
  catch (err) {
    console.log(err)
  }
})









module.exports = router;
