import { useEffect, useState } from "react";
import { readAll } from "../services/notes.sevice";
import { Link } from "react-router-dom";
import { Card, Button, Table } from "react-bootstrap"; // Import Bootstrap components

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    readAll()
      .then((response) => {
        console.log(`Received the response from API ${response.data}`);
        setNotes(response.data);
      })
      .catch((error) => {
        console.log(`Error occurred ${error}`);
      });
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "90vh", overflowY: "auto"}}>
      <Card style={{ background: "#E0AC5B", padding: "20px", width: "80%", maxHeight: "80vh", overflowY: "auto"}}>
        <div className="d-flex justify-content-between mb-4">
          <Link to="/newnote" className="btn btn-success" style={{backgroundColor:'#C5620F'}}>
            New <span style={{ color: "#00000" }}>Note</span>
          </Link>
          <Link to="/view" className="btn btn-secondary" style={{backgroundColor:'#7C4800'}}>
            View All Notes
          </Link>
        </div>
        <Table bordered style={{ marginTop: "20px" }}>
          <thead style={{ background: "#2E2E2E", color: "white" }}>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note.id}>
                <td>{note.title}</td>
                <td><div dangerouslySetInnerHTML={{ __html: note.body }}></div></td>
                <td>
                  <Link to={`/view/${note.id}`} className="btn btn-dark">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default Notes;
