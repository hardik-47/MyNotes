import React, { useContext } from 'react'
import noteContext from '../context/noteContext';

function Noteitem(props) {
    const {note,updateNote} = props;
    const context = useContext(noteContext);
    const {deleteNote}= context;

    const handledel=()=>{
        deleteNote(note._id);
    }
    const handleup=()=>{
      updateNote(note);
    }
  return (
    
    <div className='col-md-3'>
        <div className="card my-3" >
     <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <i className="fa-solid fa-trash mx-2" onClick={handledel}></i>
    <i className="fa-regular fa-pen-to-square mx-2" onClick={handleup} data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
  </div>
</div>

    </div>
  )
}

export default Noteitem
