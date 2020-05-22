const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");

const app = express();

app.use(bodyParser.json()); 

app.post('/events', (req,res) => {
    const event = req.body; 
    axios.post('http://localhost:4000/events',event);  // post service listening on 4000
    axios.post('http://localhost:5000/events',event);  // comments service listening on 5000
    //axios.post('http://localhost:6000/events',event);  // combined query maker service is listening on 6000
    
    res.send({status:"OK"}); 
});

app.listen(7000,()=>{
    console.log("event-bus service listening on port 7000"); 
});