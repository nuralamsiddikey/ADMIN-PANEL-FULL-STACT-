const express = require('express')
const session = require('express-session');
const path = require('path');
const { flash } = require('express-flash-message');
const app = express()
const mongoose = require('mongoose')
const dotenv  = require('dotenv')



var cookieParser = require('cookie-parser')
var toastr = require('express-toastr');
app.use(cookieParser('secret'));



app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        // secure: true, // becareful set this option, check here: https://www.npmjs.com/package/express-session#cookiesecure. In local, if you set this to true, you won't receive flash as you are using `http` in local, but http is not secure
      },
    })
  );
  
  app.use(flash({ sessionKeyName: 'flashMessage' }));

  app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
  });
  




const bodyParser = require('body-parser')
dotenv.config()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'));
var cookieParser = require('cookie-parser');
app.use(cookieParser());




//STATIC FILES
app.use(express.static('views/admin_panel'))
app.use(express.static('views/login'))
app.use(express.static('views/server'))
app.use(express.static('views/payload'))
app.use(express.static('views/user'))
app.use(express.static('views/config'))



//IMPORT CONTROLLERS
const serverRouter = require('./controlers/server')
const payloadRouter = require('./controlers/payload')
const adminRouter   = require('./controlers/admin_login')
const userRouter   = require('./controlers/user_create')
const userLoginRouter =require('./controlers/user_login')
 const configRouter = require('./controlers/config')
 const findUserRouter = require('./controlers/userfind')
app.use('/api/server', serverRouter)
app.use('/api/payload',payloadRouter)
app.use('/api/admin',adminRouter)
app.use('/api/user',userRouter)
app.use('/api/userLogin',userLoginRouter)
app.use('/api/config',configRouter)
app.use('/api/user',findUserRouter)
 
//IMPORT ROUTES
const routeHandlder = require('./routes/index')
app.use('/',routeHandlder)




//ERROR HANDLER
const errorHandlerRouter = require('./middlewares/errorHandler')
app.use(errorHandlerRouter)


//ROUTE NOT FOUND
app.use((req,res,next)=>{
    res.status(404).json({message: "Not found!"})
})



//DATABASE CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/8may')
.then(()=>console.log("DBConnection successfull"))
.catch(err=>console.log(err))


    
 
//SERVER LISTENIGN
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log('Backend server is runnign..');
}) 