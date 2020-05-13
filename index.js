const express = require('express');
const app = express().use(express.json());
const mongoose = require('mongoose');
const notesRouter = require('./route/NotesRoute.js');

const PORT = process.env.PORT || 4800;
const DB_URL = process.env.DB_URL || 'mongodb://localhost/notes';

app.use(express.static('public'));

mongoose.connect(DB_URL, {useNewUrlParser:true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to DB...'));

// mongoose
//      .connect( DB_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
//      .then(() => console.log( 'Database Connected' ))
//      .catch(err => console.log( err ));

app.use('/api/notes', notesRouter);

// const notes = [
//     {id:1, title:"Note 1", body:"This is first note."},
//     {id:2, title:"Note 2", body:"This is second note created."}
// ];

// app.get('/api/notes', function(req, res) {
//     res.send(notes);
// });

// app.get('/api/notes/:id', function(req, res) {
//     const note = notes.find((l) => {
//         return l.id === parseInt(req.params.id);
//     })
    
//     if(!note) {
//         res.status(404).send("Note ID does not exist");
//     }
//     res.send(note);
// });

// let allowAdd = false;

// app.post('/api/notes', function(req, res) {
//     inputValidation(req, res);
//     //if(!req.body.lesson || req.body.lesson.length < 5) {
//     //   res.status(400).send('Lesson should be more than 5 characters in length');
//     //}

//     const note = {
//         id: notes.length + 1,
//         title: req.body.title,
//         body: req.body.body
//     }
    
//     if(allowAdd) notes.push(note);

//     res.send(note);
// });

// const inputValidation = (req, res) => {
//     allowAdd = true;
//     if(!req.body.title || req.body.title.length < 5) {
//         allowAdd = false;
//         res.status(400).send('Note title should be more than 5 characters in length');
//     } 
// }


app.listen(PORT, function() {
    console.log(`listening to port ${PORT}`);
});