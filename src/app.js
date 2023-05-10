const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 


app.get("/musicians", async(req,res)=> {
    try{const musician = await Musician.findAll()
    
    res.json(musician)
}
    catch(error){
        next(error)
    }
    
})

app.post('/musicians', (req, res) => {
    // Get the musician data from the request body
    const { name, instrument } = req.body;
    res.status(201).json({ message: 'Musician created successfully' });
  });
  
  // Update route for replacing an existing musician based on ID
  app.put('/musicians/:id', (req, res) => {
    const musicianId = req.params.id;
    const { name, instrument } = req.body;
    res.json({ message: `Musician with ID ${musicianId} updated successfully` });
  });
  
  // Delete route for removing a musician based on ID
  app.delete('/musicians/:id', (req, res) => {
    // Get the ID from the route parameters
    const musicianId = req.params.id;
    res.json({ message: `Musician with ID ${musicianId} deleted successfully` });
  });



module.exports = app;