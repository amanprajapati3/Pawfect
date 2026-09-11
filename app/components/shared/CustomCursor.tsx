"use client";

import { useEffect, useState } from "react";
import { FaPaw } from "react-icons/fa";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-99999 hidden md:block"
      style={{
        transform: `translate3d(${position.x - 14}px, ${position.y - 14}px, 0)`,
      }}
    >
      <div className="flex h-7 w-7 items-center justify-center   ">
        <FaPaw className="h-4 w-4 text-[#5B21B6]" />
      </div>
    </div>
  );
}