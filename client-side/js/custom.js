async function fetchData() {
    const res = await fetch("http://localhost:3000/getDonors")
    console.log(res);
    const data =await res.json()
    console.log(data);
    str=``
    data.map((donor)=>{
        // console.log(donor);
        
        str+=`<div> <input type="text" name="name" disabled=true placeholder="Name" value=${donor.name} id="name">
            <input type="text" name="gender" disabled=true placeholder="Gender" value=${donor.gender} id="gender">

            <input type="text" name="email" disabled=true placeholder="Email" value=${donor.email} id="email">
            <input type="text" name="phone" disabled=true placeholder="Phone Number" value=${donor.phone} id="phone">
            <input type="text" name="bloodgroup" disabled=true placeholder="BloodGroup" value=${donor.bloodgroup} id="bloodgroup">

            <button class="edit-btn">EDIT</button>
            <button class="delete-btn">DELETE</button>
            </div>
        `
    })

    document.getElementById("main").innerHTML=str;
}

fetchData()