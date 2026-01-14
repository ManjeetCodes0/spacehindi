import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Facts from "./pages/Facts";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/facts" element={<Facts />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
