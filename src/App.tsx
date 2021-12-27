import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { MainRoute } from "@app/components";

function App() {
  return (
    <Router>
      <MainRoute />
    </Router>
  );
}

export default App;
