"use client";

import { useState, useEffect } from "react";

interface AlertProps {
  message: string;
}

const Alert: React.FC<AlertProps> = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`alert ${visible ? "visible" : ""}`}>
      <p>{message}</p>
      <style jsx>{`
        .alert {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #333; /* Vermelho */
          color: white;
          padding: 15px;
          border-radius: 5px;
          visibility: hidden;
          opacity: 0;
          transition: visibility 0s, opacity 0.5s linear;
        }

        .alert.visible {
          visibility: visible;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Alert;
