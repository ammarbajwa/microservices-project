const express = require('express');
const bodyParser = require("body-parser");
const {randomBytes} = require("crypto");
const cors = require("cors");
const axios = require("axios"); 

const app = express();
app.use(cors()); 
app.use(bodyParser.json());


const commentsByPostID = {}; 


app.get("/posts/:id/comments",(req,res) => {
    console.log(commentsByPostID);   
    res.status(201).send(commentsByPostID[req.params.id] || []);

});

app.post("/posts/:id/comments", async (req,res) => {
   
    // understand what is the difference in using {content} and a normal variable comment 

    const commentID =  randomBytes(4).toString('hex');
    const {content} = req.body; 
    const comments = commentsByPostID[req.params.id] || [];

    console.log(commentsByPostID);    

    comments.push({id : commentID, content});
    
    commentsByPostID[req.params.id] = comments; 

    await axios.post('http://localhost:7000/events',{
        type: 'CommentCreated',
        data: {
            id:commentID,
            content,
            postID: [req.params.id]
        }
    });

    res.status(201).send(comments); 

});

app.post('/events',(req,res)=>{
    console.log(req.body.type);
    res.send({});
});

app.listen(5000, ()=>{
    console.log("listening on port 5000 - comments service server");
})
