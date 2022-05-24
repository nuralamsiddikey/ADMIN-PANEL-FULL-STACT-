

function create_server(){

 var name = document.getElementById("serverName").value

var serverIp = document.getElementById("ip").value
var type = document.getElementById("type").value
var proxyPort = document.getElementById("pport").value
var vpnPort = document.getElementById("vport").value
var sslPort = document.getElementById("sport").value
var flag = document.getElementById("flag").value

    const newInfo ={
       name,
       serverIp,
     
       vpnPort,
       sslPort,
       proxyPort,
       type,
       flag
    }
 
    fetch('/api/server/create',{
              method:'POST',
              headers: {
                  'Content-Type': 'application/json',
                  },
                  body:JSON.stringify(newInfo)
      
})
 

document.getElementById('modal_dismiss').style.display="none"


toastr.success('Successfully created server');
   setTimeout(() => {
   location.reload()
   
   }, 1000);
  
}





// form.onclick = function(e){
//   e.preventDefault();
// var serverName = document.getElementById("serverName").value

// var ip = document.getElementById("ip").value
// var type = document.getElementById("type").value
// var pport = document.getElementById("pport").value
// var vport = document.getElementById("vport").value
// var sport = document.getElementById("sport").value
// var flag = document.getElementById("flag").value

//     const newValue ={
//         serverName:serverName,

//         ip:ip,
//         type:type,
//         pport:pport,
//         vport:vport,
//         sport:sport,
//         flag:flag
//     }
    
//     fetch('/api/server/create',{
//         method:'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             },
//             body:JSON.stringify(newValue)
//     })
// .then(res=>res.json())
// .then(data=>{
//   toastr.success('Successfully created server');
// })
// .catch(err=>{
//     console.log(err)
// })

// }

function nirob(){
  
 
}


