import React, { useContext, useEffect,useState} from 'react'
import noteContext from '../context/noteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
function Notes() {

  const context = useContext(noteContext);
  const { notes, getNote,editNote } = context;
  const [note, setNote] = useState({ id:"",etitle: "", edescription: "", etag: "" })
  const navigate = useNavigate();
  useEffect(() => {

    if(localStorage.getItem('token')){
      getNote();
    }
    else{
      navigate("/login");
    }
   
    // eslint-disable-next-line
  }, [])

  
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
}

const handleSubmit = async (e) => {
    e.preventDefault();
    editNote(note.id,note.etitle,note.edescription,note.etag);

}

  const updateNote = (currentnote) => {
      setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag});
  }
  return (
    <>
      <AddNote />

      {/* <button ref={ref} type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button> */}

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" onChange={onChange} aria-describedby="emailHelp" minLength={5} required/>

                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" value={note.edescription} id="edescription" name="edescription" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" value={note.etag} id="etag" name="etag" onChange={onChange}  />
                </div>
            </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2>Your Notes</h2>
        {
          notes.map((note) => {
            return <Noteitem key={note._id} note={note} updateNote={updateNote} />;
          })
        }
      </div>
    </>
  )
}

export default Notes
