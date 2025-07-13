import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import SpiderWeb from "./SpiderWeb";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <SpiderWeb />
      <div className="center-content">
        <div className="thread-line" />
        <img src="./spidr-logo.png" alt="Spider" className="spidr-logo" />
        <img src="./spidr-title.png" alt="Spidr Title" className="spidr-title" />
        <button className="enter-btn" onClick={() => navigate("/spidr-form/form")}>
          Enter
        </button>
      </div>
    </div>
  );
};

export default Landing;
