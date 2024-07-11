import c from "./SvgHome.module.css";
import React, { useRef, useEffect } from 'react';
import Snap from 'snapsvg-cjs';
// import sv from "../../assets/world.svg"
const SvgHome = (p) => {
    const svgRef = useRef(null);

    useEffect(() => {
      const s = Snap(svgRef.current);
      s.attr({ viewBox: "0 0 600 400", width: "100%", height: "100%" });
  
      const rect = s.rect(50, 50, 100, 100).attr({ fill: 'lightblue', stroke: 'black', strokeWidth: 2 });
  
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
    }, []);
  
    return (
      <div>
        <svg ref={svgRef}></svg>
        <button id="zoomIn">Zoom In</button>
        <button id="zoomOut">Zoom Out</button>
      </div>
    );
};
export default SvgHome;
