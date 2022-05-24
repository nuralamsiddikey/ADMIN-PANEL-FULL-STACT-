
//USER CREATE 
const user_create = () => {
    const userName = document.getElementById('userName').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const info = {
        userName,
        email,
        password
    }
    fetch(`/api/user/find/?userName=${userName}&email=${email}`)
        .then(res => res.json())
        .then(data => {
console.log(data.result)
            if (data.result == true) {
                swal("The user already exist!", {
                    icon: "error",
                });
            }
            else {
                fetch(`/api/user/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(info)

                })
                    .then(res => {
                        console.log(res)
                        if (res.status == 200) {
                            swal("Created successfully!", {
                                icon: "success",
                            });

                        }
                        else {
                            swal("Fillup all the fields!", {
                                icon: "error",
                            });

                        }


                        setTimeout(() => {
                            location.reload()

                        }, 1500);


                    })

            }

        })



}


//DELETE USER FUNCTION
const delete_user = (id) => {
    console.log(id)
    swal({
        title: "Are you sure?",
        // text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                fetch(`/api/user/delete/${id}`, {
                    method: 'DELETE',


                })
                    .then(data => {
                        if (data.status == 200) {
                            swal("User has been deleted!", {
                                icon: "success",
                            });
                            setTimeout(() => {
                                location.reload()
                            }, 1000);
                        }
                    })


            } else {
                // swal("Your imaginary file is safe!");
            }
        });

}


//USER UPDATED 
const save = (id) => {

    var userName = document.getElementById("nuserName").value
    var email = document.getElementById("nemail").value
    var password = document.getElementById("npassword").value


    const newInfo = {
        userName,
        email,
        password
    }



    fetch(`/api/user/find/?userName=${userName}&email=${email}`)
        .then(res => res.json())
        .then(data => {

            if (data.result == true) {
                swal("The user already exist!", {
                    icon: "error",
                });
            }
            else {


                fetch(`/api/user/update/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newInfo)


                })
                    .then(data => {
                        if (data.status == 200) {
                            swal("Updated successfully!", {
                                icon: "success",
                            });
                            setTimeout(() => {
                                location.reload()
                            }, 1000);
                        }
                    })


            }

        })


}






// UPDATE USER FUNCTION
const update_user = (id) => {
    container = document.getElementById('update_user_modal')
    fetch(`http://localhost:3000/api/user/findOne/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            container.innerHTML = `
          
          <form >
  
  
          <label for="nuserName">User name</label>
          <input
         
          value=${data.result.userName}
           type="text" 
           id="nuserName" 
        
           class="form-control mb-1"
           >
           
           <label for="nemail">Email</label>
           <input
         
           value=${data.result.email}
            type="text" 
            id="nemail" 
           
            class="form-control mb-1"
            >
  
            <label for="npassword">Password</label>
            <input
             type="text"
             value=${data.result.password}
          
          
             id="npassword" 
            
             class="form-control mb-1"
             >


  
        </form>
  
        <button onclick="save('${id}')" type="button" class="btn btn-primary mt-3">Save changes</button>
          
          `
        })
}







//USER FIND
const pagination = (page) => {
    document.getElementById('user_table_data').innerHTML = ''
    fetch(`/api/user/user/find/all/?page=${page}`)
        .then(res => res.json())
        .then(data => {
   
            const container = document.getElementById('user_table_data')
            data.result.map((element,index) => {
                let n = index+1
                if(page>1){
                  n=   10*(page-1)+n
                }
         
                const tr = document.createElement('TR')
                tr.innerHTML = `
        <td>${n}</td>
         <td>${element.userName}</td>
         <td>${element.email}</td>
         <td>${element.password}</td>
       
       <td>  <button  onclick="update_user('${element._id}')" style="background:#1abc9c; width: 4rem; margin-right: 2%" type="button" class="btn btn-primary btn-sm border-0 " data-bs-toggle="modal" data-bs-target="#staticBackdrop">
         update
       </button>  

        <button  onclick="delete_user('${element._id}')" class="btn btn-success btn-sm  border-0" style="background: #e74c3c; width: 4rem"> delete</button> </td>

          `
           container.appendChild(tr)
             })

        })
        .catch(err => console.log(err))

}
pagination()


//FRONTEND PAGINATION
fetch('/api/user/user/find/all/pagination')
    .then(res => res.json())
    .then(data => {


        const pagination = document.getElementById('user_table_pagination')

        let pagination_number = 1
        let dataLen = data.result.length

        if (dataLen > 10) {
            pagination_number = Math.ceil(dataLen / 10)
        }

        for (let i = 1; i <= pagination_number; i = i + 1) {
            const span = document.createElement('SPAN')
            span.innerHTML = `
         <li  onclick="pagination('${i}')" class="page-item"><a class="page-link" href="#">${i}</a></li>
 
 `
            pagination.appendChild(span)


        }




    })
