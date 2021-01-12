//Defining variables 
const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const db = require("./db/db.json");
const PORT = process.env.PORT || 3000;


//middleware
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(express.static("public"));


//HTML routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})



//API routes
app.get("/api/notes", function(req, res) 
{
    res.sendFile(path.join(__dirname, "/db/db.json"));
})

app.post("/api/notes", function(req, res) 
 {  
    
    const notesList = JSON.parse(fs.readFileSync("./db/db.json"));
    const postedNote = req.body;
    postedNote.id = 0
    function randomId() {
        
        id = Math.floor(Math.random() * Math.floor(1000))
        notesList.forEach(index => {
            if(index.id === id) {
                randomId()
            } else {
               postedNote.id = id 
            }
        })
    }
    randomId()
    notesList.push(postedNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(notesList))
    res.json(notesList);
    
})

app.delete("/api/notes/:id", function(req, res) 
{
    const notesList = JSON.parse(fs.readFileSync("./db/db.json"));
    let updatedNotes = []
    for (var i = 0; i < notesList.length; i++ ) 
    {
        if(notesList[i].id != req.params.id) 
        {
            updatedNotes.push(notesList[i])
        }
    }
    fs.writeFileSync("./db/db.json", JSON.stringify(updatedNotes));
    res.json(updatedNotes);
})

//Server listen
app.listen(PORT, function() 
{
    console.log(`App listening on PORT: ${PORT}`);
})
    







    
