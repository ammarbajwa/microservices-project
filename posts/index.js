const express = require("express");
const body_parser = require("body-parser");
const {randomBytes} = require("crypto");
const cors = require("cors");
const axios = require('axios'); 

const app = express();

app.use(cors()); 
const posts = {}; 

app.use(body_parser.json());

app.post('/events',(req,res)=>{
    console.log(req.body.type);
    res.send({});
});

app.get("/posts" ,(req,res) => {

    console.log("entered get request"); 
    res.send(posts); 

}); 

app.post("/posts", async (req,res) => {

    console.log("entered post request"); 

    const id = randomBytes(4).toString('hex'); 
    const {title} = req.body;  
    
    //posts[id] = title; 
    // we need to understand how this syntax works 
    posts[id] = {
        id,title
    };

    // each event sent will have {type:---, data:---}
    await axios.post("http://localhost:7000/events",{
        type:'PostCreated',
        data: {
            id,title
        }
    });

    res.status(201).send(posts[id]); 

})


app.listen(4000,()=>{
    console.log("Listening on port 4000");
})