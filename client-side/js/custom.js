async function fetchData() {
    const res = await fetch("http://localhost:3000/getDonors")
    console.log(res);
    const data =await res.json()
    console.log(data);
    str=``
    data.map((donor)=>{
        // console.log(donor);
        
        str+=`<div> <input type="text" name="name" placeholder="Name" value=${donor.name} id="name">
            <input type="text" name="gender" placeholder="Gender" value=${donor.gender} id="gender">

            <input type="text" name="email" placeholder="Email" value=${donor.email} id="email">
            <input type="text" name="phone" placeholder="Phone Number" value=${donor.phone} id="phone">
            <input type="text" name="bloodgroup" placeholder="BloodGroup" value=${donor.bloodgroup} id="bloodgroup">

            <button class="edit-btn">EDIT</button>
            <button class="delete-btn">DELETE</button>
            </div>
        `
    })

    document.getElementById("main").innerHTML=str;
}

fetchData()