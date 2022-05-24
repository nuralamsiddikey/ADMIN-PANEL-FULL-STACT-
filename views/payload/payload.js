//SAVE UPDATED PAYLOAD
const save_updated_payload = (id) => {
  var name = document.getElementById("npayloadName").value
  var info = document.getElementById("ninfo").value
  var customProxy = document.getElementById("ncustomProxy").value;
  var proxyPort = document.getElementById("nproxyPort").value
  var type = document.getElementById("ntype").value
  var tweak = document.getElementById("ntweak").value
  var flag = document.getElementById("nflag").value

  const newInfo = {
    name,
    flag,
    info,
    customProxy,
    proxyPort,
    type,
    tweak,


  }

  console.log(id)
  fetch(`/api/payload/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newInfo)

  })


  //document.getElementById('update_payload').style.display = "none"
  swal("Updated successfully!", {
    icon: "success",
  });

  setTimeout(() => {
    location.reload()

  }, 1500);

}





// DELETE PAYLOAD
const delete_payload = (id) => {

  swal({
    title: "Are you sure?",
    // text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        fetch(`/api/payload/delete/${id}`, {
          method: 'DELETE',


        })

        swal("Payload has been deleted!", {
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

// UPDATE PAYLOAD

const update_payload = (id) => {
  const container = document.getElementById('payload_update_modal')
  fetch(`http://localhost:3000/api/payload/findOne/${id}`)
    .then(res => res.json())
    .then(data => {

      container.innerHTML = `
               <form >
 

               <label for="serverName">Payload Name</label>
               <input
               name="payload"
                value='${data.result.name}'
                type="text" 
                id="npayloadName" 
                placeholder="Payload name"
                class="form-control mb-1"
                >
                
                <label for="info">Info.</label>
                <textarea
                
                 type="text" 
                 id="ninfo" 
                 placeholder="Text"
                 class="form-control mb-1"
                 >${data.result.info}</textarea>
                
                 <label for="customProxy">Custom Proxy</label>
                 <input
                  value='${data.result.customProxy}'
                  type="number" 
                  id="ncustomProxy" 
                  placeholder="Custom proxy"
                  class="form-control mb-1"
                  >
                  
                  <label for="proxyPort">Proxy Port</label>
                  <input
                   value ='${data.result.proxyPort}'
                   type="number" 
                   id="nproxyPort" 
                   placeholder="Proxy port"
                   class="form-control mb-1"
                   >
                   
                 
               <label for="type">Type</label>
               <select class="form-select form-select-md mb-3"
               value ='${data.result.type}'
               id="ntype"
               aria-label=".form-select-lg example">
                
                <option value="One">One</option>
                <option value="Two">Two</option>
                <option value="Three">Three</option>
              </select>
              
              <label for="tweak">Tweak</label>
              <input
              value = '${data.result.tweak}'
             type="text"

               id="ntweak" 
               placeholder="Teaks"
               class="form-control form-control-lg mb-1"
               >
     
            
               
     
                 <label for="type">Flag</label>
                 <select class="form-select form-select-md mb-3" 
                 value ='${data.result.flag}'
                 id="nflag"
                 aria-label=".form-select-lg example">
                  
                  <option value="A">One</option>
                  <option value="B">Two</option>
                  <option value="C">Three</option>
                </select>
     
     
             </form>
             <button onclick="save_updated_payload('${id}')" class ="btn btn-success ">Save Changes</button>

               `
    })

}





//FETCH ALL APYLOADS
const show_payload = (page) => {
document.getElementById('payload_table').innerHTML = ''
  fetch(`http://localhost:3000/api/payload/find/?page=${page}`)
    .then(res => res.json())
    .then(data => {
     console.log(data)
      const container = document.getElementById('payload_table')

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
     <td>${element.info}</td>
     <td>${element.customProxy}</td>
     <td>${element.proxyPort}</td> 
     <td>${element.type}</td>
     <td>${element.tweak}</td>
     <td>${element.flag}</td>
     <td>
     <button onclick="update_payload('${element._id}')" type="button" class="btn btn-primary btn-sm mx-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
     update
   </button>

     <button id="delete-button" onclick="delete_payload('${element._id}')" type="button" class="btn btn-danger btn-sm mx-2" >delete</button>
   
           
   </td>
   
   </tr>
     
     `
        container.appendChild(tr)

      })

    })

}

show_payload()

//PAGINATION
fetch('http://localhost:3000/api/payload/find/pagination')
    .then(res => res.json())
    .then(data => {

      
      const pagination = document.getElementById('payload_table_pagination')

      let pagination_number = 1
      let dataLen = data.result.length
      
      if (dataLen > 10) {
        pagination_number = Math.ceil(dataLen / 10)
      }
      console.log(pagination_number)
      for (let i = 1; i<= pagination_number; i = i + 1) {
        const span = document.createElement('SPAN')
        span.innerHTML = `
        <li  onclick="show_payload('${i}')" class="page-item"><a class="page-link" href="#">${i}</a></li>
        
        `
        pagination.appendChild(span)
      
      }
      
      
      
      
      
      


    })







// CREATE PAYLOAD
function create_payload() {

  var name = document.getElementById("payloadName").value

  var info = document.getElementById("info").value
  var customProxy = document.getElementById("customProxy").value;
  // var customProxy = parseInt(customProxyValue);
  var proxyPort = document.getElementById("proxyPort").value
  var type = document.getElementById("type").value
  var tweak = document.getElementById("tweak").value
  var flag = document.getElementById("flag").value

  const newInfo = {
    name,
    flag,
    info,
    customProxy,
    proxyPort,
    type,
    tweak,


  }

  fetch('/api/payload/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newInfo)

  })


  //document.getElementById('payload_modal_dismiss').style.display = "none"

  toastr.success('Successfully created payload');
  setTimeout(() => {
    location.reload()

  }, 1000);

}




