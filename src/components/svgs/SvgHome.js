import c from "./SvgHome.module.css";
import React, { useRef, useEffect } from 'react';
import Snap from 'snapsvg-cjs';
// import sv from "../../assets/world.svg"
const SvgHome = (p) => {
    const svgRef = useRef(null);

    useEffect(() => {
      Snap.load("/assets/M4-LAYOUT-EVOLUTION-JULY-2024-Model.svg", (loadedFragment) => {
        const s = Snap(svgRef.current);
        s.append(loadedFragment);
  
        let zoomLevel = 1;
  
        const zoomIn = () => {
          zoomLevel *= 1.2;
          s.attr({ viewBox: `0 0 ${600 / zoomLevel} ${400 / zoomLevel}` });
        };
  
        const zoomOut = () => {
          zoomLevel /= 1.2;
          s.attr({ viewBox: `0 0 ${600 / zoomLevel} ${400 / zoomLevel}` });
        };
  
        document.getElementById('zoomIn').addEventListener('click', zoomIn);
        document.getElementById('zoomOut').addEventListener('click', zoomOut);
      });
    }, []);
  
    return (
      <div className={c.container}>
        <div ref={svgRef} className={c["svg-container"]}></div>
        <button id="zoomIn">Zoom In</button>
        <button id="zoomOut">Zoom Out</button>
      </div>
    );
};
export default SvgHome;
