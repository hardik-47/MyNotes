const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');
//Route 1 Get all Notes using get.Login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }

})

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid note').isLength({ min: 3 }),
    body('description', 'Description must of atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {


        const { title, description, tag } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();

        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})


router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;
    let newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    let note = await Note.findById(req.params.id);

    if (!note) { return res.status(401).send("Not found") };

    if (note.user.toString() != req.user.id) {
        return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({ note });


})

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    // const { title, description, tag } = req.body;
    // let newNote = {};
    // if (title) { newNote.title = title };
    // if (description) { newNote.description = description }
    // if (tag) { newNote.tag = tag }

    let note = await Note.findById(req.params.id);

    if (!note) { return res.status(401).send("Not found") };

    if (note.user.toString() != req.user.id) {
        return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"Success": "note deleted"});


})



module.exports = router