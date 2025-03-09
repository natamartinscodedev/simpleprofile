"use clinet";
import { Moon, Sun } from "lucide-react";
import React, { useState } from "react";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toogleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      aria-label="Toggle Dark Mode"
      className="toggle-button"
      onClick={toogleTheme}
    >
      {isDarkMode ? <Moon color="white" /> : <Sun color="#f2f2f2" />}
    </button>
  );
};

export default Index;
