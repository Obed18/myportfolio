import React, { useEffect, useState } from "react";
import "../styles/CursorGlow.css";

interface Position {
  x: number;
  y: number;
}

const CursorGlow: React.FC = () => {
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    // Skip on touch devices
    if ("ontouchstart" in window) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      className={`cursor-glow ${visible ? "visible" : ""}`}
      style={{
        left: pos.x - 200,
        top: pos.y - 200,
      }}
    />
  );
};

export default CursorGlow;
