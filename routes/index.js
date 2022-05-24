
const router = require('express').Router()

const {
    verifyToken,
   
    verifyUserAndAdmin,
    userVerifyToken
} = require('../middlewares/verifyToken')


router.get('/logout', function(req, res){
 
    res.clearCookie('jwt')
   
    res.redirect('/')
 
 });


router.get('/',async(req,res)=>{
   
    const messages = await req.consumeFlash('info');
    res.render('login/login', { messages });
})

  
router.get('/adminPanel',userVerifyToken,(req,res)=>{
        
  res.render('admin_panel/admin_panel',{name:'nirob'})
  
    
})

router.get('/server',userVerifyToken,(req,res)=>{
    res.render('server/server')
})

router.get('/payload',userVerifyToken,(req,res)=>{
    res.render('payload/payload')
})

router.get('/user',verifyToken,(req,res)=>{
    res.render('user/user')
})
router.get('/config',userVerifyToken,(req,res)=>{
    res.render('config/config')
})


router.get('/userLogin',async(req,res)=>{
 
    const messages = await req.consumeFlash('info');
    res.render('login/login', { messages });
})

router.get('/adminLogin',(req,res)=>{
    res.render('login/login.ejs',{type:'admin'})
})



module.exports = router