



let counter =0
const showSidebar=()=>{
   console.log("show side bar")
   if(counter==0){
    document.getElementById('sidebar').style.display="block"
    document.getElementById('sidebar').style.width="170px"
    counter++
   }
   else{
    document.getElementById('sidebar').style.display="none"
    counter--
   }
}
const type = localStorage.getItem('type')
if(type ==='admin'){
    document.getElementById('server_menu').style.display ="none"
    document.getElementById('payload_menu').style.display ="none"
    document.getElementById('config_menu').style.display ="none"
    document.getElementById('server_menu_ml').style.display ="none"
    document.getElementById('payload_menu_ml').style.display ="none"
    document.getElementById('config_menu_ml').style.display ="none"

    document.getElementById('user_menu').style.display ="block"
    document.getElementById('user_menu_ml').style.display ="block"

}
else{
   document.getElementById('server_menu').style.display ="block"
   document.getElementById('payload_menu').style.display ="block"
   document.getElementById('config_menu').style.display ="block"
   document.getElementById('server_menu_ml').style.display ="block"
   document.getElementById('payload_menu_ml').style.display ="block"
   document.getElementById('config_menu_ml').style.display ="block"

   document.getElementById('user_menu').style.display ="none"
   document.getElementById('user_menu_ml').style.display ="none"

}

// fetch(`http://localhost:3000/api/server/find`)
// .then(res => res.json())
// .then(data => {
//    const len = data.result.len
//    document.getElementById('total-server').innerHTML = 
// })


