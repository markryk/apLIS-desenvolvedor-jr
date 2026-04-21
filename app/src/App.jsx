import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Medicos from "./pages/Medicos";
import Pacientes from "./pages/Pacientes";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "20px", width: "100%" }}>
          <Routes>
            <Route path="/medicos" element={<Medicos />} />
            <Route path="/pacientes" element={<Pacientes />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}