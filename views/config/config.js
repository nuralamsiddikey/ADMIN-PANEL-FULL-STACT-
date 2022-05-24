const config_submit =()=>{
   const releaseNote = document.getElementById('release_note').value
   const releaseVersion = document.getElementById('release_version').value
    if(releaseNote && releaseVersion){
        const info ={
            releaseNote,
            releaseVersion
        }
        
        fetch(`/api/config/create`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(info)
           
      
        })
        .then(res=>{
           if(res.status==200){
            //   swal("Created successfully!", {
            //     icon: "success",
            //   });
            //   setTimeout(() => {
            //     location.reload()
            //   }, 1000);
            get()
           }
           else{
            // swal("Updated successfully!", {
            //     icon: "success",
            //     timer: 700
            //   });
            //   setTimeout(() => {
            //     location.reload()
            //   }, 1000);
            get()
           }
          
        })
       
      
    }
    else{
        swal("fillup all fields")
    }
}


const get =()=>{
   
    fetch('/api/config/find')
    .then(res=>res.json())
    .then(data=>{
        document.getElementById('encoded_show_modal').innerHTML=`${data}`
    })
   
    
}



//DISPLAY RELEAE VERSION AND RELEASE NOTE
fetch('/api/config/find/rel/ver')
.then(res=>res.json())
.then(data=>{
   
    const container = document.getElementById('card_body')


   if(data.result == null){
       
    container.innerHTML = `
    
    <form >
                 <label for="release_note">Release Note</label>
                 <input type="text"
                 class="form-control w-25"
                 placeholder="Release note"
                 id="release_note"
              
                 required
                 >

                 <label class="mt-2" for="release_version">Release Version</label>
                 <input type="text"
                 class="form-control w-25"
                 placeholder="Release Version"
                 id="release_version"  
              
                 required
                 >
             </form>
             <div class="row">
             <div class="col-md-4">
                <button onclick="config_submit()" class="btn btn-primary mt-3 w-50" type="submit" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Submit</button>

             </div>
             <div class="col-md-4">

                
             </div>
         </div>
    
    `
   }



else{

    container.innerHTML = `
    
    <form >
                 <label for="release_note">Release Note</label>
                 <input type="text"
                 class="form-control w-25"
                 placeholder="Release note"
                 id="release_note"
                 value = ${data.result.releaseNote}
                 required
                 >

                 <label class="mt-2" for="release_version">Release Version</label>
                 <input type="text"
                 class="form-control w-25"
                 placeholder="Release Version"
                 id="release_version"  
                 value=${data.result.releaseVersion}
                 required
                 >
             </form>
             <div class="row">
             <div class="col-md-4">
                <button onclick="config_submit()" class="btn btn-primary mt-3 w-50" type="submit" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Submit</button>

             </div>
             <div class="col-md-4">

                
             </div>
         </div>
    
    `
}
})


function copy() {
    var text = document.getElementById("encoded_show_modal").innerHTML
 
    navigator.clipboard
    .writeText(text)
    .then(() => {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
           // "preventDuplicates": true,
          //  "onclick": null,
           
            positionClass : "position"
        };

        toastr.success('Copied text to clipboard', 'Success');
        // setTimeout(() => {
        //     location.reload()
        // }, 800);
    })
    .catch((err) => {
      console.error(`Error copying text to clipboard: ${err}`);
    });
  }