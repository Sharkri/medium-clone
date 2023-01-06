import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./components/Home";

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
