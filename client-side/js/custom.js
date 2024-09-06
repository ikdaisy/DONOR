async function fetchData() {
    const res = await fetch("http://localhost:3000/getDonors")
    // console.log(res);
    const data =await res.json()
    console.log(data);
    str=``
    data.map((donor)=>{
        // console.log(donor);
        
        str+=`<div> <input type="text" name="name" disabled=true placeholder="Name" value=${donor.name} id="name-${donor._id}">
            <input type="text" name="gender" disabled=true placeholder="Gender" value=${donor.gender} id="gender-${donor._id}">

            <input type="text" name="email" disabled=true placeholder="Email" value=${donor.email} id="email-${donor._id}">
            <input type="text" name="phone" disabled=true placeholder="Phone Number" value=${donor.phone} id="phone-${donor._id}">
            <input type="text" name="bloodgroup" disabled=true placeholder="BloodGroup" value=${donor.bloodgroup} id="bloodgroup-${donor._id}">

            <button class="edit-btn" onclick="handleEdit('${donor._id}')">EDIT</button>
            <button class="save-btn"  onclick="handleSave('${donor._id}')" >SAVE</button>
            <button class="delete-btn" onclick="handleDelete('${donor._id}')">DELETE</button>
            </div>
        `
    })

    document.getElementById("main").innerHTML=str;
}

fetchData()

// ------------------------------------------------------------------------------------------
// Edit Function 

function handleEdit(id){
    //get the id of each input and make the disabled to false 
    document.getElementById(`name-${id}`).disabled=false
    document.getElementById(`gender-${id}`).disabled=false
    document.getElementById(`email-${id}`).disabled=false
    document.getElementById(`phone-${id}`).disabled=false
    document.getElementById(`bloodgroup-${id}`).disabled=false

}



// ---------------------------------------------------------------------------------------------------


//save function 

async function handleSave(id){
    // alert(id)
    let name = document.getElementById(`name-${id}`).value;
    let gender = document.getElementById(`gender-${id}`).value;
    let email = document.getElementById(`email-${id}`).value;
    let phone = document.getElementById(`phone-${id}`).value;
    let bloodgroup = document.getElementById(`bloodgroup-${id}`).value;
    
    console.log(name,gender,email,phone,bloodgroup);

    let objData={id,name,gender,email,phone,bloodgroup};
    console.log(objData);
    //convert object into json string
    const jsonData=JSON.stringify(objData)
    console.log(jsonData);
    //send the data with request PUT
    const res = await fetch("http://localhost:3000/update",{
        method:"PUT",
        "Content-Type" :"text/json",
        body:jsonData
    })
    // console.log(res);
    const message= await res.text()
    console.log(message);
    fetchData();
    

}

//Delete function 

async function handleDelete(id){
    // console.log(id);

    // send the request to the server
    //fetch default request method is GET 
    const res = await fetch("http://localhost:3000/delete",{
        method:"delete",
        headers:{"Content-Type":"text/plain"},
        body:id
        
    })

    // Get response from the server 

    //one way 
    // ---------------------------------------------------
    const data= await res.text()
    // console.log(data);
    // fetchData()
    // ------------------------------------------------------

    //another way 
    // ---------------------------------------------------------
    res.status==200?alert(data):alert(data);
    fetchData()
    // ------------------------------------------------------------
}

// ---------------------------------------------------------------------------
