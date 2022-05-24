const router = require('express').Router()
const Config = require('../models/Config')
const Server = require('../models/Server')
const Payload = require('../models/Payload')
const{userVerifyToken} = require('../middlewares/verifyToken')
var xxtea = require('xxtea-node');



//CREATE CONFIG
router.put('/create',userVerifyToken,async (req, res) => {
   
    try {
        const userId = req.user.id
        const{
            releaseNote,
            releaseVersion
        } = req.body


        const existConfig = await Config.findOne({userId: userId})
      
        if(existConfig){
             Config.findOneAndUpdate({userId: userId},
                {
                    $set:{
                        releaseNote,
                        releaseVersion
                    }
                },
                {new: true},
                (err,result)=>{
                   res.status(201).json("Updated successfully")
                }
                
                )
        }
        else{
   // if don't exist create new
        const {
            releaseNote,
            releaseVersion
        } = req.body
        const config = new Config({
            releaseNote,
            releaseVersion,
            userId
        })
        const savedConfig = await config.save()
        if (savedConfig) {
            res.status(200).send("Successfully saved")
        }
        else {
            res.status(200).send("not saved saved")
        }
        }


    }
    catch (err) {
        console.log(err)
    }

})

//FIND RELEASE NOTE AND RELEASE VERSION
router.get('/find/rel/ver',userVerifyToken,async(req,res)=>{
     try{
         const userId = req.user.id
         Config.findOne({userId},(err,result)=>{
             res.status(200).json({
                 message: "Showing results",
                 result: result,
                 error: false
             })
         })
     }
     catch(err){
         console.log(err)
     }
})









//FIND json
router.get('/find',userVerifyToken,async(req,res)=>{
    try{
        let mainObject ={}

        let data = {}
       let main = []

    let pdata ={}
    let pmain =[]

    let sdata ={}
    let smain =[]


        const userId = req.user.id
         const config = await Config.find({userId},{releaseNote: 1,releaseVersion:1,_id: 0})
         const server = await Server.find({userId},{_id: 0,__v:0})
         const httppayload = await Payload.find({userId: userId, type:'http'},{_id: 0, __v: 0})
         const sslpayload = await Payload.find({userId: userId, type:'ssl'},{_id: 0, __v: 0})
     
   mainObject.ReleseVersion = config[0].releaseVersion
   mainObject.releaseNote = config[0].releaseNote


//   server.forEach((result)=>{
//           data.Name = result.name
        
//            data.Flag = result.flag
//            data.ServerIPHost = result.serverIp
//            data.OpenVPNTCPPort = result.vpnPort 
//            data.OpenVPNSSLPORT = result.sslPort 
//            data.ProxyPort = result.proxyPort
//            data.Category = 'VIP'
//           main.push(data)
//           console.log(main);
//           data = {}
//   })

 


  const fserver = server.map(result=>{
         console.log(result);
           data.Name = result.name
        
           data.Flag = result.flag
           data.ServerIPHost = result.serverIp
           data.OpenVPNTCPPort = result.vpnPort 
           data.OpenVPNSSLPORT = result.sslPort 
           data.ProxyPort = result.proxyPort
           data.Category = 'VIP'

           main.push(data)
         
           mainObject.Servers = main
            data = {}
       })





  httppayload.map(result=>{
         pdata.Name = result.name
         pdata.Payload = result.tweak
         pdata.Info = result.info
         pdata.TunnelType = 0
         pdata.ProxySettings = {
             Squid:result.customProxy,
             Port: result.proxyPort
            }
        pdata.Flag = result.flag
        pdata.Type = result.type
        pmain.push(pdata)

        mainObject.Networks = pmain
        pdata = {}
  })


 
  sslpayload.map(result=>{
    sdata.Name = result.name
    sdata.SNIHost = result.tweak
    sdata.Info = result.info
    sdata.TunnelType = 1
   
   sdata.Flag = result.flag
   sdata.Type = result.type
   smain.push(sdata)

   mainObject.SSLNetworks = smain
   smain = {}
})



const key =  process.env.XXTEA_SEC

var result = JSON.stringify(mainObject);
var encrypt_data = xxtea.encrypt(xxtea.toBytes(result), xxtea.toBytes(key));
const a =  new Buffer(encrypt_data).toString('base64')
      
 


         res.json(a) 
    }  
    catch(err){
        console.log(err)
    }
})


 

module.exports = router
