import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomepageStroberry from "./HomepageStroberry";
import HomepageTomato from "./HomepageTomato";
import Profile from "./Profile";
import Contact from "./Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomepageTomato />} />
        <Route path="/stroberry" element={<HomepageStroberry />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
