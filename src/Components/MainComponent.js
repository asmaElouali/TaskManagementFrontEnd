import { useEffect, useState } from "react";
import { deleteOne, readAll } from "../services/notes.sevice";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap"; // Import Bootstrap components

const MainComponent = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  const getAllNotes = async () => {
    try {
      const response = await readAll();
      const allNotes = response.data;
      setNotes(allNotes);
    } catch (error) {
      console.error('Error occurred while retrieving all notes from API', error);
    }
  }

  const deleteNote = async (id) => {
    try {
      await deleteOne(id);
      // After deleting, refresh the list of notes
      getAllNotes();
    } catch (error) {
      console.error("Error occurred while deleting the Note", error);
    }
  }

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <div className="container mt-5">
      {notes.map((note) => (
        <Card key={note.id} style={{ backgroundColor: '#E0AC5B', marginBottom: '10px' }}>
          <Card.Body>
            <Card.Title className="display-4 fw-bold">Note title: {note.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <small>Posted On {new Date(note.updatedAt).toDateString()}</small>
            </Card.Subtitle>
            <Card.Text className="lead">Category: {note.category}</Card.Text>
            <Card.Text className="text-justify">
              Description :<div dangerouslySetInnerHTML={{ __html: note.body }}></div>
            </Card.Text>
            <Button variant="danger" onClick={() => deleteNote(note.id)}>
              Delete
            </Button>
            <Link to={`/editnote/${note.id}`} className="btn btn-primary mx-2">
              Edit
            </Link>
            <Link to={`/view/${note.id}`} className="btn btn-secondary">
              View
            </Link>
          </Card.Body>
        </Card>
      ))}
      <div className="mt-3 mb-3">
      <Link to="/newnote" className="btn btn-success" style={{backgroundColor:'#7C4800'}}>
        New <span style={{ color: "#00000" }}>Note</span>
      </Link>
      </div>
    </div>
  );
}

export default MainComponent;
