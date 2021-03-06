
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
app.use(bodyParser.urlencoded({limit: '20mb', extended: true}))
app.use(bodyParser.json({limit: '20mb', extended: true}));


app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});
app.post("/upload",(request,response)=>
       {
        fs.writeFile('sets/data.json', JSON.stringify(request.body), err => {
    if (err) {
        console.log('Error writing file', err);
        response.send("0");
    } else {
        console.log('Successfully wrote file');
         response.send("1");
    }
        
        })})
app.get("/callit",(req,res)=>{
  res.sendFile(__dirname+"/sets/data.json");
})

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
