// import React, { useRef, useEffect, useState, useCallback } from "react";
// import Snap from "snapsvg-cjs";
 import c from "./SvgHome.module.css";

// const SvgHome = () => {
//   const svgRef = useRef(null);
//   const [viewBox, setViewBox] = useState("0 0 600 400");
//   const [isPanning, setIsPanning] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [startY, setStartY] = useState(0);
//   const [viewBoxState, setViewBoxState] = useState({
//     x: 0,
//     y: 0,
//     width: 600,
//     height: 400,
//   });

//   const handleWheel = useCallback(
//     (event) => {
//       event.preventDefault();

//       const rect = svgRef.current.getBoundingClientRect();
//       const mouseX = event.clientX - rect.left;
//       const mouseY = event.clientY - rect.top;

//       const zoomFactor = 1.2;
//       const scale = event.deltaY > 0 ? 1 / zoomFactor : zoomFactor;

//       const newWidth = viewBoxState.width * scale;
//       const newHeight = viewBoxState.height * scale;

//       const dx = (mouseX / rect.width) * (viewBoxState.width - newWidth);
//       const dy = (mouseY / rect.height) * (viewBoxState.height - newHeight);

//       setViewBoxState((prevState) => ({
//         ...prevState,
//         x: prevState.x + dx,
//         y: prevState.y + dy,
//         width: newWidth,
//         height: newHeight,
//       }));
//     },
//     [viewBoxState]
//   );

//   const handleMouseDown = useCallback((event) => {
//     setIsPanning(true);
//     setStartX(event.clientX);
//     setStartY(event.clientY);
//   }, []);

//   const handleMouseMove = useCallback(
//     (event) => {
//       if (isPanning) {
//         const dx =
//           (startX - event.clientX) *
//           (viewBoxState.width / svgRef.current.clientWidth);
//         const dy =
//           (startY - event.clientY) *
//           (viewBoxState.height / svgRef.current.clientHeight);

//         setStartX(event.clientX);
//         setStartY(event.clientY);

//         setViewBoxState((prevState) => ({
//           ...prevState,
//           x: prevState.x + dx,
//           y: prevState.y + dy,
//         }));
//       }
//     },
//     [isPanning, startX, startY, viewBoxState.width, viewBoxState.height]
//   );

//   const handleMouseUp = useCallback(() => {
//     setIsPanning(false);
//   }, []);

//   useEffect(() => {
//     const loadSvg = async () => {
//       const response = await fetch(
//         "/assets/M4-LAYOUT-EVOLUTION-JULY-2024-Model.svg"
//       );
//       const svgText = await response.text();
//       const parser = new DOMParser();
//       const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
//       const svgElement = svgDoc.documentElement;

//       if (svgElement) {
//         const s = Snap(svgRef.current);
//         s.append(svgElement);

//         const svgNode = svgRef.current.querySelector("svg");
//         if (svgNode) {
//           const bbox = svgNode.getBBox();
//           setViewBoxState({
//             x: bbox.x,
//             y: bbox.y,
//             width: bbox.width,
//             height: bbox.height,
//           });
//         }
//       } else {
//         console.error("SVG not loaded or appended correctly");
//       }
//     };

//     loadSvg();

//     const svgElement = svgRef.current;
//     svgElement.addEventListener("wheel", handleWheel);
//     svgElement.addEventListener("mousedown", handleMouseDown);
//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("mouseup", handleMouseUp);

//     return () => {
//       svgElement.removeEventListener("wheel", handleWheel);
//       svgElement.removeEventListener("mousedown", handleMouseDown);
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [handleWheel, handleMouseDown, handleMouseMove, handleMouseUp]);

//   useEffect(() => {
//     setViewBox(
//       `${viewBoxState.x} ${viewBoxState.y} ${viewBoxState.width} ${viewBoxState.height}`
//     );
//   }, [viewBoxState]);

//   return (
//     <div className={c.container}>
//       <svg ref={svgRef} className={c.svgContainer} viewBox={viewBox}></svg>
//     </div>
//   );
// };





// ###########################################################################
// import React, { useRef, useEffect, useState, useCallback } from 'react';
// import Snap from 'snapsvg-cjs';
// import c from "./SvgHome.module.css";
// import SvgWorker from 'worker-loader!./svgWorker.js'; // Adjust the path as necessary

// const SvgHome = () => {
//   const svgRef = useRef(null);
//   const [viewBox, setViewBox] = useState("0 0 600 400");
//   const [isPanning, setIsPanning] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [startY, setStartY] = useState(0);
//   const [viewBoxState, setViewBoxState] = useState({
//     x: 0,
//     y: 0,
//     width: 600,
//     height: 400,
//   });

//   const handleWheel = useCallback((event) => {
//     event.preventDefault();

//     const rect = svgRef.current.getBoundingClientRect();
//     const mouseX = event.clientX - rect.left;
//     const mouseY = event.clientY - rect.top;

//     const zoomFactor = 1.2;
//     const scale = event.deltaY > 0 ? 1 / zoomFactor : zoomFactor;

//     const newWidth = viewBoxState.width * scale;
//     const newHeight = viewBoxState.height * scale;

//     const dx = (mouseX / rect.width) * (viewBoxState.width - newWidth);
//     const dy = (mouseY / rect.height) * (viewBoxState.height - newHeight);

//     setViewBoxState((prevState) => ({
//       ...prevState,
//       x: prevState.x + dx,
//       y: prevState.y + dy,
//       width: newWidth,
//       height: newHeight,
//     }));
//   }, [viewBoxState]);

//   const handleMouseDown = useCallback((event) => {
//     setIsPanning(true);
//     setStartX(event.clientX);
//     setStartY(event.clientY);
//   }, []);

//   const handleMouseMove = useCallback((event) => {
//     if (isPanning) {
//       const dx = (startX - event.clientX) * (viewBoxState.width / svgRef.current.clientWidth);
//       const dy = (startY - event.clientY) * (viewBoxState.height / svgRef.current.clientHeight);

//       setStartX(event.clientX);
//       setStartY(event.clientY);

//       setViewBoxState((prevState) => ({
//         ...prevState,
//         x: prevState.x + dx,
//         y: prevState.y + dy,
//       }));
//     }
//   }, [isPanning, startX, startY, viewBoxState.width, viewBoxState.height]);

//   const handleMouseUp = useCallback(() => {
//     setIsPanning(false);
//   }, []);

//   useEffect(() => {
//     const loadSvg = async () => {
//       const response = await fetch("/assets/M4-LAYOUT-EVOLUTION-JULY-2024-Model.svg");
//       const svgData = await response.text();

//       const worker = new SvgWorker();

//       worker.onmessage = (event) => {
//         const s = Snap(svgRef.current);
//         s.append(event.data);
//         worker.terminate();
//       };

//       worker.postMessage({ svgData });
//     };

//     loadSvg();

//     const svgElement = svgRef.current;
//     svgElement.addEventListener("wheel", handleWheel);
//     svgElement.addEventListener("mousedown", handleMouseDown);
//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("mouseup", handleMouseUp);

//     return () => {
//       svgElement.removeEventListener("wheel", handleWheel);
//       svgElement.removeEventListener("mousedown", handleMouseDown);
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [handleWheel, handleMouseDown, handleMouseMove, handleMouseUp]);

//   useEffect(() => {
//     setViewBox(`${viewBoxState.x} ${viewBoxState.y} ${viewBoxState.width} ${viewBoxState.height}`);
//   }, [viewBoxState]);

//   return (
//     <div className={c.container}>
//       <svg ref={svgRef} className={c.svgContainer} viewBox={viewBox}></svg>
//     </div>
//   );
// };

// export default SvgHome;





// ZoomableGraph.js
import React, { useRef, useState } from 'react';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';
import { ReactComponent as Graph } from '../../assets/M4-LAYOUT-EVOLUTION-JULY-2024-Model.svg'; // Adjust the path to your SVG file

const ZoomableGraph = () => {
  const Viewer = useRef(null);
  const [tool, setTool] = useState('auto');

  return (
    <div style={{ width: '500px', height: '500px', border: '1px solid #ccc' }}>
      <ReactSVGPanZoom
        width={500} height={500}
        ref={Viewer}
        tool={tool}
        onChangeTool={setTool}
        detectAutoPan={false}
        onClick={() => Viewer.current.fitToViewer()}
      >
        <svg width={1000} height={1000}>
          <Graph />
        </svg>
      </ReactSVGPanZoom>
    </div>
  );
};

export default ZoomableGraph;
