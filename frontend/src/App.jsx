import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import Main from "./components/Main";
import FileForm from "./components/FileForm";
import SurveyForm from "./components/SurveyForm.jsx";
import ControllerForm from "./components/ControllerForm.jsx";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/file" element={<FileForm />} />
        <Route path="/survey" element={<SurveyForm />} />
        <Route path="/controller" element={<ControllerForm />} />
      </Routes>
    </div>
  );
}

export default App;
