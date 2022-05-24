// const login =()=>{
//    const email = document.getElementById('email').value
//    const password = document.getElementById('password').value
//    const type = document.getElementById('type').value

//    const newInfo ={
//        email,
//        password

//    }

//     if(type =="admin"){
//         fetch(`/api/admin/login`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(newInfo)

//         })

//     }
//     else if(type =="user"){
//         fetch(`/api/userLogin/login`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(newInfo)

//         })
//     }
// }

document.getElementById("admin_login_form").style.display = "none";
document.getElementById('user-from-show-button').style.background = '#ff7675'
document.getElementById('user-from-show-button').style.border = '1px solid #ff7675'

const login_type = (x) => {
    const user_login_form = document.getElementById("user_login_form");
    const admin_login_form = document.getElementById("admin_login_form");
    const server_menu = document.getElementById("server_menu");
    const payload_menu = document.getElementById("payload_menu");
    const user_menu = document.getElementById("user_menu");

   const user_show_button = document.getElementById('user-from-show-button')
   const admin_show_button = document.getElementById('admin-from-show-button')


    if (x == "admin") {
        admin_show_button.style.background = "#ff7675"
        admin_show_button.style.border = " 1px solid #ff7675"
        user_show_button.style.background = "gray"
        user_show_button.style.border = "1px solid gray"

        admin_login_form.style.display = "block";

        user_login_form.style.display = "none";

         localStorage.setItem('type', "admin");
       
    } else {

        admin_show_button.style.background = "gray"
        admin_show_button.style.border = "1px solid gray"
        user_show_button.style.background = "#ff7675"
        user_show_button.style.border = " 1px solid #ff7675"



        admin_login_form.style.display = "none";
        user_login_form.style.display = "block";
        localStorage.setItem('type', "user");
        // localStorage.clear();
        
    }
};


const admin_login_submit = () => {
    const email = document.getElementById("admin_email").value;
    const password = document.getElementById("admin_password").value;


        let info ={email,password}
        fetch(`/api/admin/login`, {
            method: "POST",
            headers: {
               // 'Accept': 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify(info)
        })
        .then(res=>{
          

        })
        .catch(err=>console.log(err))

        //http://localhost:3000/adminPanel
    
};

 