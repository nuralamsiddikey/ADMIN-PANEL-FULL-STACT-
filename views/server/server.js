

//UPDATE SERVER
const update_server = (id) => {

  container = document.getElementById('update_server')
  fetch(`http://localhost:3000/api/server/findOne/${id}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      container.innerHTML = `
        
        <form >


        <label for="serverName">Server Name</label>
        <input
        name="name"
        value='${data.result.name}'
         type="text" 
         id="nserverName" 
         placeholder="Server name"
         class="form-control mb-1"
         >
         
         <label for="ip">Server Ip</label>
         <input
         name="serverIp"
         value='${data.result.serverIp}'
          type="text" 
          id="nip" 
          placeholder="Server ip"
          class="form-control mb-1"
          >

          
        <label for="type">Type</label>
        <select class="form-select form-select-md mb-3" 
        id="ntype"
        value='${data.result.type}'
        aria-label=".form-select-lg example">
         
         <option value="one">One</option>
         <option value="two">Two</option>
         <option value="three">Three</option>
       </select>
       
       <label for="pport">Proxy Port</label>
       <input
       name="proxyPort"
       value='${data.result.proxyPort}'
        type="text" 
        id="npport" 
        placeholder="Proxy port"
        class="form-control mb-1"
        >

        <label for="vport">Vpn Port</label>
        <input
        name="vpnPort"
        value='${data.result.vpnPort}'
         type="text" 
         id="nvport" 
         placeholder="Vpn Port"
         class="form-control mb-1"
         >
         <label for="sport">SSL Port</label>
         <input
         name="sslPort"
         value='${data.result.sslPort}'
          type="text" 
          id="nsport" 
          placeholder="SSL port"
          class="form-control mb-1"
          >

          <label for="type">Flag</label>
          <select class="form-select form-select-md mb-3" 
          id="nflag"
          value='${data.result.flag}'
          aria-label=".form-select-lg example">
           
          <option value="ALL">${data.result.flag}</option>
          <option value="BD">Bangladesh</option>
          <option value="DE">Germany</option>
          <option value="FR">France</option>
          <option value="GB">Great Britain</option>
          <option value="UK">England</option>
          <option value="NL">Netherland</option>
          <option value="SG">Singapore</option>


         </select>



      </form>

      <button onclick="save('${id}')" type="button" class="btn btn-primary">Save changes</button>
        
        `
    })
}



//SAVE SERVER
const save = (id) => {

  var name = document.getElementById("nserverName").value
  var serverIp = document.getElementById("nip").value
  var type = document.getElementById("ntype").value
  var proxyPort = document.getElementById("npport").value
  var vpnPort = document.getElementById("nvport").value
  var sslPort = document.getElementById("nsport").value
  var flag = document.getElementById("nflag").value

  const newInfo = {
    name,
    serverIp,
    type,
    proxyPort,
    vpnPort,
    sslPort,
    flag
  }



  fetch(`/api/server/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newInfo)


  })
  update_server()
  swal("Updated successfully!", {
    icon: "success",
  });
  setTimeout(() => {
    location.reload()
  }, 1000);

}



const delete_server = (id) => {

  swal({
    title: "Are you sure?",
    // text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        fetch(`/api/server/delete/${id}`, {
          method: 'DELETE',


        })

        swal("Server has been deleted!", {
          icon: "success",
        });
        setTimeout(() => {
          location.reload()
        }, 1000);
      } else {
        // swal("Your imaginary file is safe!");
      }
    });


}


// FETCH ALL SERVER 
const show_server = (page) => {
 document.getElementById('server_table').innerHTML = ''
  fetch(`http://localhost:3000/api/server/find/?page=${page}`)
    .then(res => res.json())
    .then(data => {

      const container = document.getElementById('server_table')

      data.result.map((element, index) => {
        const tr = document.createElement('TR')
        let n = index+1
        if(page>1){
          n=   10*(page-1)+n
        }
        tr.innerHTML = `
       <tr>
       <th scope="row">${n}</th>
       <td>${element.name}</td>
       <td>${element.serverIp}</td>
       <td>${element.type}</td>
       <td>${element.proxyPort}</td> 
       <td>${element.vpnPort}</td>
       <td>${element.sslPort}</td>
       <td>${element.flag}</td>
       <td>
       <button onclick="update_server('${element._id}')" type="button" class="btn btn-primary btn-sm mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
       update </button> 

       <button id="delete-button" type="button" class="btn btn-danger btn-sm mx-2" onclick="delete_server('${element._id}')">delete</button>
     
             
     </td>
     
     </tr>
       
       `
        container.appendChild(tr)

      })



    })

}
show_server()



//PAGINATION
fetch('http://localhost:3000/api/server/find/pagination')
  .then(res => res.json())
  .then(data => {

console.log(data)

    const pagination = document.getElementById('server_table_pagination')

    let pagination_number = 1
    let dataLen = data.result.length

    if (dataLen > 10) {
      pagination_number = Math.ceil(dataLen / 10)
    }

    for (let i = 1; i <= pagination_number; i = i + 1) {
      const span = document.createElement('SPAN')
      span.innerHTML = `
      <li  onclick="show_server('${i}')" class="page-item"><a class="page-link" href="#">${i}</a></li>
    
    `
      pagination.appendChild(span)

    }


  })









