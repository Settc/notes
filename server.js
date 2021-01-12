//Defining variables 
const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const data = require("./db/db")


//middleware
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(express.static("public"));

//HTML routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

//API routes
app.get("/api/notes", function(req, res) 
{
    res.json(data)
})

app.post("/api/notes", function(req, res)
{
    
})







    


//Server listen
app.listen(PORT, function() 
{
    console.log(`App listening on PORT: ${PORT}`);
})