import React, { useRef, useEffect } from "react";
import Landing from "./Landing";
import FormPage from "./FormPage";
import "./App.css";

function App() {
  const landingRef = useRef(null);
  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToLanding = () => {
    landingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleWheel = (e) => {
      const formTop = formRef.current?.getBoundingClientRect().top;

     
      if (e.deltaY < 0 && formTop <= 50) {
        scrollToLanding();
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div>
      <div ref={landingRef}>
        <Landing onEnter={scrollToForm} />
      </div>
      <div ref={formRef}>
        <FormPage />
      </div>
    </div>
  );
}

export default App;
