import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import FormPage from "./FormPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/spidr-form" element={<Landing />} />
        <Route path="/spidr-form/form" element={<FormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
