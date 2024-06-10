import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import { Breeds } from "./pages/breeds";
import { BreedInfo } from "./pages/breadinfo";
import { HashRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Breeds />} />
        <Route path="/:breedinfo" element={<BreedInfo />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
