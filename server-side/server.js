const http = require ("http")
const fs = require ("fs")
const url = require ("url")
const PORT=3000
// import querystring module
const queryString = require("querystring")
//import the mongodb module 
const {MongoClient,ObjectId}= require("mongodb")
// connect the mongodb
const client=  new MongoClient("mongodb://127.0.0.1:27017/")

const app= http.createServer(async(req,res)=>{
    //create database
    const db = client.db("Donor")
    //create collection
    const collection =db.collection("donors")
    //convert the url into object
    const path = url.parse(req.url)
     console.log(path);
     
     
    if(path.pathname=="/"){
        res.writeHead(200,{"Content-Type":"text/html"})
        res.end(fs.readFileSync("../client-side/index.html"))
    }
    else if(path.pathname=="/client-side/js/custom.js"){
        res.writeHead(200,{"Content-Type":"text/js"})
        res.end(fs.readFileSync("../client-side/js/custom.js"))
    }
    else if(path.pathname=="/css/addDonor.css"){
        res.writeHead(200,{"Content-Type":"text/css"})
        res.end(fs.readFileSync("../client-side/css/addDonor.css"))
    }
    else if(path.pathname=="/css/index.css"){
        res.writeHead(200,{"Content-Type":"text/css"})
        res.end(fs.readFileSync("../client-side/css/index.css"))
    }
    else if(path.pathname=="/add"){
        res.writeHead(200,{"Content-Type":"text/html"})
        res.end(fs.readFileSync("../client-side/pages/AddDonor.html"))
    }
    console.log(req.method);

    if(path.pathname=="/submit" && req.method=="POST" ){
        let body=""
        req.on("data",(chunk)=>{
            
            console.log(chunk);
            body+=chunk.toString()
            console.log(body);
            
            
        });
        req.on("end",async()=>{
            if(body!=null){
                //convert the queryForm data into object 
                const formData= queryString.parse(body)
                console.log(formData);
                // below statement returns a promise so we use .then()
                collection.insertOne(formData).then(()=>{
                    console.log("success");
                    
                })
                .catch((error)=>{
                    console.log(error);
                    
                });

                
            }
        })
        // redirect the page into homepage after submitting
        res.writeHead(200,{"Content-Type":"text/html"})
        res.end(fs.readFileSync("../client-side/index.html"))
    }

    //get data from database and send to the frontend
    if(path.pathname=="/getDonors" && req.method=="GET"){
        const data= await collection.find().toArray();
        console.log(data);
        const jsonData=JSON.stringify(data)
        console.log(jsonData);
        res.writeHead(200,{"Content-Type":"text/json"})
        res.end(jsonData)
    }

    //Save
    if(path.pathname=="/update" && req.method=="PUT"){
        console.log("Update route reached");
        let body=""
        req.on("data",(chunks)=>{
            console.log(chunks);
            body+=chunks.toString()
            console.log(body);
        });
        req.on("end",async()=>{
            let udata = JSON.parse(body)
            console.log(udata);
            const _id=new ObjectId(udata.id)
            console.log(_id);
            const updateData={name:udata.name,email:udata.email,phone:udata.phone,bloodgroup:udata.bloodgroup,gender:udata.gender};
            await collection.updateOne({_id},{$set:updateData})
            .then(()=>{
                res.writeHead(200,{"Content-Type":"text/plain"})
                res.end("Updated Successfully")
                
                
            }).catch(()=>{
                res.writeHead(404,{"Content-Type":"text/plain"})
                res.end("Failed to update")
            })   
        })
        
    }




    //delete 
    if(path.pathname=="/delete" && req.method=="DELETE"){
        console.log("You reached the delete route");
        body=""
        req.on("data",(chunks)=>{
            console.log(chunks);
            body+=chunks.toString();
            console.log(body);
        })

        req.on("end",async()=>{
            let _id = new ObjectId(body);
            collection.deleteOne({_id}).then(()=>{
                res.writeHead(200,{"Content-Type":"text/plain"})
                res.end("Successfully deleted")

            }).catch(()=>{
                res.writeHead(400,{"Content-Type":"text/plain"})
                res.end("Failed to delete")

            });


        });
        
    }

    
 
    
     
})

client.connect().then(()=>{
    console.log("Database Connected");
    app.listen(PORT,()=>{
        console.log(`http://localhost:${PORT}`);
        
    })
    
}).catch((error)=>{
    console.log(error);
    
})
