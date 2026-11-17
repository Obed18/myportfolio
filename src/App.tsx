import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SplashScreen from "./pages/SplashScreen";
import ImpactPage from "./pages/ImpactPage";
import ScrollToTop from "./components/ScrollToTop";
import "./styles/global.css";

const App: React.FC = () => {
  const [started, setStarted] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            started ? (
              <Navigate to="/home" replace />
            ) : (
              <SplashScreen started={started} setStarted={setStarted} />
            )
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/impact/:slug" element={<ImpactPage />} />
      </Routes>
    </Router>
  );
};

export default App;
