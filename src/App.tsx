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
          "linear-gradient(135deg, #fde8f0 0%, #ede0f8 50%, #fde8f0 100%)",
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
