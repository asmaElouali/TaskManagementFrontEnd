import { useEffect, useState } from "react";
import { deleteOne, readOne, readOneNom } from "../services/notes.sevice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap"; // Import Bootstrap components

const NoteViewComponent = () => {
  //const { idUser } = useParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');

  const getNoteById = async () => {
    try {
      const response = await readOne(id);
      const existing = response.data;
      setTitle(existing.title);
      setBody(existing.body);
      setCategory(existing.category);
      setUpdatedAt(existing.updatedAt);
    } catch (error) {
      console.error('Error occurred while retrieving the data from API');
    }
  }

  const deleteNote = async () => {
    try {
      await deleteOne(id);
      navigate("/mynotes");
    } catch {
      console.error("Error occurred while deleting the Note");
    }
  }

  useEffect(() => {
    getNoteById(id);
  }, [id]);

  return (
    <div className="container mt-5">
      <Card style={{ backgroundColor: '#E0AC5B' }}>
        <Card.Body>
          <Card.Title className="display-4 fw-bold">Note title: {title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
           <small>Posted On {new Date(updatedAt).toDateString()}</small>
          </Card.Subtitle>
          <Card.Text className="lead">Category: {category}</Card.Text>
          <Card.Text className="text-justify">
          Description :<div dangerouslySetInnerHTML={{ __html: body }}></div>
          </Card.Text>
          <Button variant="danger" onClick={deleteNote}>
            Delete
          </Button>
          <Link to={`/editnote/${id}`} className="btn btn-primary mx-2">
            Edit
          </Link>
          <Link to="/mynotes" className="btn btn-secondary" style={{backgroundColor:'#7C4800'}}>
            Back to Notes
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default NoteViewComponent;
