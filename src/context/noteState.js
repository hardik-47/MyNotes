import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    const getNote = async () => {
        const response = await fetch(`http://localhost:5000/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
            },
        })
        const json = await response.json();
        console.log(json);
        setNotes(json);
    }
    const addNote = async (title, description, tag) => {

        const response = await fetch(`http://localhost:5000/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
               "Authorization": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        })

        
        const note = await response.json();
        setNotes(notes.concat(note));


        
    }
    const deleteNote = async (id) => {

        const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
               "Authorization": localStorage.getItem('token')
            },
        })
        const json = response.json();
        console.log(json);

        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote);

    }

    const editNote = async (id, title, description, tag) => {

        const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
               "Authorization": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        })

        console.log(response);
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }

        }
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNote }}>
            {props.children}
        </NoteContext.Provider>
    )


}

export default NoteState;