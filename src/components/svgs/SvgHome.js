import React, { useRef, useEffect, useState } from 'react';
import Snap from 'snapsvg-cjs';
import c from "./SvgHome.module.css";

const SvgHome = () => {
  const svgRef = useRef(null);
  const [viewBox, setViewBox] = useState("0 0 600 400");
  const [isPanning, setIsPanning] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [viewBoxState, setViewBoxState] = useState({ x: 0, y: 0, width: 600, height: 400 });

  useEffect(() => {
    Snap.load("/assets/M4-LAYOUT-EVOLUTION-JULY-2024-Model.svg", (loadedFragment) => {
      const s = Snap(svgRef.current);
      const svgElement = loadedFragment.select('svg');

      if (svgElement) {
        s.append(svgElement);

        const updateViewBox = () => {
          setViewBox(`${viewBoxState.x} ${viewBoxState.y} ${viewBoxState.width} ${viewBoxState.height}`);
        };

        const handleWheel = (event) => {
          event.preventDefault();

          const rect = svgRef.current.getBoundingClientRect();
          const mouseX = event.clientX - rect.left;
          const mouseY = event.clientY - rect.top;

          const zoomFactor = 1.2;
          const scale = event.deltaY > 0 ? 1 / zoomFactor : zoomFactor;

          const newWidth = viewBoxState.width * scale;
          const newHeight = viewBoxState.height * scale;

          const dx = ((mouseX / rect.width) * (viewBoxState.width - newWidth));
          const dy = ((mouseY / rect.height) * (viewBoxState.height - newHeight));

          setViewBoxState(prevState => ({
            ...prevState,
            x: prevState.x + dx,
            y: prevState.y + dy,
            width: newWidth,
            height: newHeight
          }));
        };

        const handleMouseDown = (event) => {
          setIsPanning(true);
          setStartX(event.clientX);
          setStartY(event.clientY);
        };

        const handleMouseMove = (event) => {
          if (isPanning) {
            const dx = (startX - event.clientX) * (viewBoxState.width / svgRef.current.clientWidth);
            const dy = (startY - event.clientY) * (viewBoxState.height / svgRef.current.clientHeight);
            
            setStartX(event.clientX);
            setStartY(event.clientY);

            setViewBoxState(prevState => ({
              ...prevState,
              x: prevState.x + dx,
              y: prevState.y + dy
            }));
          }
        };

        const handleMouseUp = () => {
          setIsPanning(false);
        };

        svgRef.current.addEventListener('wheel', handleWheel);
        svgRef.current.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
          svgRef.current.removeEventListener('wheel', handleWheel);
          svgRef.current.removeEventListener('mousedown', handleMouseDown);
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
        };
      } else {
        console.error("SVG not loaded or appended correctly");
      }
    });
  }, [viewBoxState, isPanning, startX, startY]);

  useEffect(() => {
    setViewBox(`${viewBoxState.x} ${viewBoxState.y} ${viewBoxState.width} ${viewBoxState.height}`);
  }, [viewBoxState]);

  return (
    <div className={c.container}>
      <svg ref={svgRef} className={c.svgContainer} viewBox={viewBox}></svg>
    </div>
  );
};

export default SvgHome;
