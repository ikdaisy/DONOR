async function fetchData() {
    const res = await fetch("http://localhost:3000/getDonors")
    console.log(res);
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
            <button class="save-btn" >SAVE</button>
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