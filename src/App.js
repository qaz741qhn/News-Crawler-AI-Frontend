import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import NewsSection from "./NewsSection";

const apiURL = "https://multi-api.herokuapp.com"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/news" element={<NewsSection apiURL={apiURL} />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
