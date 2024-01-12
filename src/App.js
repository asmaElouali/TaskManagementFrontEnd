import './App.css';
import AddNoteComponeent from './Components/AddNoteComponent';
import NoteViewComponent from './Components/NoteViewComponent';
import Notes from './Components/Notes'
import MainComponent from './Components/MainComponent'
import Home from './Home';
import Login from './Components/Login';
import Appheader from './Appheader';
import Register from './Components/Registre';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';



function App() {
  return (
    <div>
      <BrowserRouter>
       <Appheader></Appheader>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path="/mynotes" element={<Notes />}></Route>
          <Route path="/newnote" element={<AddNoteComponeent />}></Route>
          <Route path="/view/:id" element={<NoteViewComponent />}></Route>
          <Route path="/editNote/:id" element={<AddNoteComponeent />}></Route>
          <Route path="/Notes" element={<Notes />}></Route>
          <Route path="/view" element={<MainComponent />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
