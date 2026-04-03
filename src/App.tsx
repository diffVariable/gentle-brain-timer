import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TimerPage from "./pages/TimerPage";
import Home from "./pages/Home";

export default function App() {
  return (
    <div
      style={{
        height: "100vh",
        background:
          "linear-gradient(135deg, #c8a8e9 0%, #d4a8d8 50%, #e8b0cc 100%)",
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timer" element={<TimerPage />} />
      </Routes>
    </div>
  );
}
