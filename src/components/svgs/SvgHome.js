import React, { useRef, useEffect, useState } from 'react';
import Snap from 'snapsvg-cjs';
import c from "./SvgHome.module.css";

const SvgHome = () => {
  const svgRef = useRef(null);
  const [viewBox, setViewBox] = useState("0 0 600 400");

  useEffect(() => {
    Snap.load("/assets/M4-LAYOUT-EVOLUTION-JULY-2024-Model.svg", (loadedFragment) => {
      const s = Snap(svgRef.current);
      const svgElement = loadedFragment.select('svg');

      if (svgElement) {
        s.append(svgElement);

        let currentViewBox = { x: 0, y: 0, width: 600, height: 400 };

        const updateViewBox = () => {
          setViewBox(`${currentViewBox.x} ${currentViewBox.y} ${currentViewBox.width} ${currentViewBox.height}`);
        };

        const handleWheel = (event) => {
          event.preventDefault();

          const rect = svgRef.current.getBoundingClientRect();
          const mouseX = event.clientX - rect.left;
          const mouseY = event.clientY - rect.top;

          const zoomFactor = 1.2;
          const scale = event.deltaY > 0 ? 1 / zoomFactor : zoomFactor;

          const newWidth = currentViewBox.width * scale;
          const newHeight = currentViewBox.height * scale;

          const dx = ((mouseX / rect.width) * (currentViewBox.width - newWidth));
          const dy = ((mouseY / rect.height) * (currentViewBox.height - newHeight));

          currentViewBox = {
            x: currentViewBox.x + dx,
            y: currentViewBox.y + dy,
            width: newWidth,
            height: newHeight
          };

          updateViewBox();
        };

        svgRef.current.addEventListener('wheel', handleWheel);

        return () => {
          svgRef.current.removeEventListener('wheel', handleWheel);
        };
      } else {
        console.error("SVG not loaded or appended correctly");
      }
    });
  }, []);

  return (
    <div className={c.container}>
      <svg ref={svgRef} className={c.svgContainer} viewBox={viewBox}></svg>
    </div>
  );
};

export default SvgHome;
