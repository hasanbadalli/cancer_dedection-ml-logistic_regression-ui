import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Calculation from "./pages/Calculation";
import Research from "./pages/Research";
import Docs from "./pages/Docs";

import "./styles/global.css";
import "./styles/app.css";

export default function App() {
  return (
    <div className="layout">
      <Sidebar />

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculate" element={<Calculation />} />
          <Route path="/research" element={<Research />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </main>
    </div>
  );
}
