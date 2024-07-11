import React, { useRef, useEffect, useState } from 'react';
import Snap from 'snapsvg-cjs';
import c from "./SvgHome.module.css";

const SvgHome = (p) => {
  const svgRef = useRef(null);
  const [viewBox, setViewBox] = useState("0 0 600 400");

  useEffect(() => {
    Snap.load("/assets/M4-LAYOUT-EVOLUTION-JULY-2024-Model.svg", (loadedFragment) => {
      const s = Snap(svgRef.current);
      s.append(loadedFragment);

      let zoomLevel = 1;

      const zoomIn = () => {
        zoomLevel *= 1.2;
        updateViewBox(zoomLevel);
      };

      const zoomOut = () => {
        zoomLevel /= 1.2;
        updateViewBox(zoomLevel);
      };

      const updateViewBox = (zoom) => {
        const width = 600 / zoom;
        const height = 400 / zoom;
        setViewBox(`0 0 ${width} ${height}`);
      };

      document.getElementById('zoomIn').addEventListener('click', zoomIn);
      document.getElementById('zoomOut').addEventListener('click', zoomOut);
    });
  }, []);

  return (
    <div className={c.container}>
      <svg ref={svgRef} className={c.svgContainer} viewBox={viewBox}></svg>
      <button id="zoomIn">Zoom In</button>
      <button id="zoomOut">Zoom Out</button>
    </div>
  );
};

export default SvgHome;
