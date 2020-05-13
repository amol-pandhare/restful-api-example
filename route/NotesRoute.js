const express = require('express');
const router = express.Router();
const Note = require('../models/note');

console.log('Router says hello!!!');

router.get('/', async (req, res) => {
    // res.send('Notes List');
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});

router.get('/:id', getNote, async (req, res) => {
    res.json(res.note);
});

// middleware function for finding data for specific ID
async function getNote(req, res, next) {
    let note;
    try {
        note = await Note.findById(req.params.id);
        if(note == null) return res.status(404).json({message: "Can't find note."});
    } catch(error) {
        return res.status(500).json({message: "Selected ID was not found."});
    }

    res.note = note;
    next();
}

router.post('/', async (req, res) => {
    const note = new Note({
        noteTitle: req.body.title,
        noteContent: req.body.content
    });

    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
});

router.delete('/:id', getNote, async(req, res) => {
    try {
        await res.note.remove();
        res.json({message:`Note deleted - ${res.note.noteTitle}`});
    } catch(err) {
        res.status(500).json({message: 'Note not found.'});
    }
});

router.put('/:id', getNote, async(req, res) => {});

router.patch('/:id', getNote, async(req, res) => {
    if(req.body.title) res.note.noteTitle = req.body.title;
    if(req.body.content) res.note.noteContent = req.body.content;
    try{
        const uNote = await res.note.save();
        res.json(uNote);
    } catch(err) {
        res.status(400).json({message: 'Note not updated.'})
    }
});

module.exports = router;