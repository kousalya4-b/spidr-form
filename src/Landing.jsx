import React from "react";
import "./App.css";
import SpiderWeb from "./SpiderWeb";
const Landing = ({ onEnter }) => {
  return (

    <div className="landing-container">
         <SpiderWeb />

      <div className="center-content">
        
        <div className="spider-wrapper">
        <div className="spider-line" />
        <img src="./spidr-logo.png" alt="Logo" className="spidr-logo" />
        <img src="./spidr-title.png" alt="Title" className="spidr-title" />
        <button className="enter-btn" onClick={onEnter}>Enter</button>
      </div>
      </div>

    <div className="scroll-down" onClick={onEnter}>
  <span className="scroll-arrow">&#x25BC;</span>
  <span className="scroll-label">scroll</span>
</div>

    </div>
  );
};

export default Landing;
