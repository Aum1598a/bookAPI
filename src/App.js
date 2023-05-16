import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pagse/Homepage";
import BookDetails from "./pagse/BookDetails";
import BookCreate from "./pagse/BookCreate ";
import Editbook from "./pagse/Editbook";
import EditBookid from "./pagse/EditBookid";
import Navbar from "./pagse/navber";
import Footer from "./pagse/footer";
import HomepageRandom from "./pagse/HomepageRandom";
import GroupSearch from "./pagse/GroupSearch";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/BookDetails" element={<BookDetails />} />
        <Route path="/BookCreate" element={<BookCreate />} />
        <Route path="/Editbook" element={<Editbook />} />
        <Route path="/EditBookid" element={<EditBookid />} />
        <Route path="/HomepageRandom" element={<HomepageRandom />} />
        <Route path="/GroupSearch" element={<GroupSearch />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
