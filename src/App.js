import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import StarShips from "./components/StarShips";

function App() {
  return (
    <Router>
      <div className="content">
        <Header />
        <StarShips />
      </div>
    </Router>
  );
}

export default App;
