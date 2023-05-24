import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import NewsSection from "./NewsSection";
import Learn from "./Learn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/learn" element={<Learn />} />
        <Route path="/news" element={<NewsSection />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
