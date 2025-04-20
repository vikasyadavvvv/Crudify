import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Create from "./components/Create";
import Read from "./components/Read";
import Update from "./components/Update";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="flex justify-center mt-8">
          {/* Center the Create component with a medium width */}
          <div className="w-full max-w-3xl">
            <Routes>
              <Route exact path="/" element={<Create />} />
              <Route exact path="/read" element={<Read></Read>}></Route>
              <Route exact path='/edit/:id' element={<Update></Update>}></Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
