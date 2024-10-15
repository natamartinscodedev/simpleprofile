"use client";

import Home from "./Home";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Home />
    </>
  );
};

export default Index;
