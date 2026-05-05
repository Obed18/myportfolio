import React, { useEffect, useState } from "react";
import "../styles/SplashScreen.css";

interface SplashScreenProps {
  started: boolean;
  setStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ started, setStarted }) => {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Fade out before showing main app
      setVisible(false);
      setTimeout(() => {
        setStarted(true);
      }, 800); // Match CSS fade-out duration
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [setStarted]);

  return (
    <div className={`splash-screen ${visible ? "fade-in" : "fade-out"}`}>
      <div className="splash-content">
        <img
          src="/animations/coding.gif"
          alt="Loading animation"
          className="animation-video"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
