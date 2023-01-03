import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
