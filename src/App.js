
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/noteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
function App() {
  return (
    <div className="App">
      <NoteState>
      <BrowserRouter>
      <Navbar/>
      <Alert message="Welcome here" />
      <div className="container">
      <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/About" element={<About/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      </Routes>
      </div>
      </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
