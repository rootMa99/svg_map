// import React, { useRef, useEffect, useState, useCallback } from "react";
// import Snap from "snapsvg-cjs";

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

// import React, { useState } from 'react';
// import { ReactSVGPanZoom } from 'react-svg-pan-zoom';
// import { ReactComponent as MySvg } from '../../assets/404er.svg'; // Adjust the path to your SVG file
// import c from './SvgHome.module.css';

// const SvgHome = () => {
//   const [tool, setTool] = useState('auto');
//   const [value, setValue] = useState(null);
//   const [viewer, setViewer] = useState(null);

//   return (
//     <div className={c.container}>
//       <ReactSVGPanZoom
//         width={"100vw"}
//         height={"90vh"}
//         background="white"
//         ref={Viewer => setViewer(Viewer)}
//         tool={tool}
//         onChangeTool={tool => setTool(tool)}
//         value={value}
//         onChangeValue={value => setValue(value)}
//         toolbarPosition="right"
//         miniaturePosition="right"
//         detectAutoPan={false}
//       >
//         <svg width="100%" height="100%">
//           <MySvg />
//         </svg>
//       </ReactSVGPanZoom>
//     </div>
//   );
// };

// export default SvgHome;

// #############################################################################
// import React, { useState, useEffect } from "react";
// import { ReactSVGPanZoom, TOOL_NONE } from "react-svg-pan-zoom";
// import c from "./SvgHome.module.css";

// const SvgHome = () => {
//   const [tool, setTool] = useState(TOOL_NONE);
//   const [value, setValue] = useState(null);
//   const [svgContent, setSvgContent] = useState(null);
//   const [viewer, setViewer] = useState(null);

//   useEffect(() => {
//     const loadSvg = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.PUBLIC_URL}/assets/M4-LAYOUT-EVOLUTION-JULY-2024-Model.svg`
//         );
//         const text = await response.text();
//         const parser = new DOMParser();
//         const svgDoc = parser.parseFromString(text, "image/svg+xml");
//         const svgElement = svgDoc.documentElement;

//         const viewBox = svgElement.getAttribute("viewBox");
//         let viewBoxDimensions;
//         if (viewBox) {
//           viewBoxDimensions = viewBox.split(" ").map(Number);
//         } else {
//           const width = parseFloat(svgElement.getAttribute("width"));
//           const height = parseFloat(svgElement.getAttribute("height"));
//           viewBoxDimensions = [0, 0, width, height];
//         }

//         const [minX, minY, svgWidth, svgHeight] = viewBoxDimensions;
//         const viewportWidth = window.innerWidth;
//         const viewportHeight = window.innerHeight;
//         const scaleX = viewportWidth / svgWidth;
//         const scaleY = viewportHeight / svgHeight;
//         const initialScale = Math.min(scaleX, scaleY);
//         setValue({
//           version: 2,
//           mode: "idle",
//           focus: false,
//           SVGMinX: minX,
//           SVGMinY: minY,
//           SVGWidth: svgWidth,
//           SVGHeight: svgHeight,
//           viewerWidth: viewportWidth,
//           viewerHeight: viewportHeight,
//           scaleFactorMin: 0.1,
//           scaleFactorMax: 10,
//           scale: initialScale,
//           translationX: (viewportWidth - svgWidth * initialScale) / 2,
//           translationY: (viewportHeight - svgHeight * initialScale) / 2,
//         });

//         setSvgContent(text);
//       } catch (error) {
//         console.error("Error loading SVG:", error);
//       }
//     };
//     loadSvg();
//   }, []);

//   return (
//     <div className={c.container}>
//       {svgContent ? (
//         <ReactSVGPanZoom
//           width="100vw"
//           height="90vh"
//           background="white"
//           ref={(Viewer) => setViewer(Viewer)}
//           tool={tool}
//           onChangeTool={(tool) => setTool(tool)}
//           value={value}
//           onChangeValue={(value) => setValue(value)}
//           toolbarPosition="right"
//           miniaturePosition="right"
//           detectAutoPan={false}
//         >
//           <svg width="100%" height="100%">
//             <g dangerouslySetInnerHTML={{ __html: svgContent }} />
//           </svg>
//         </ReactSVGPanZoom>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default SvgHome;
//""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
import React, { useEffect, useCallback, useReducer, memo } from "react";
import { ReactSVGPanZoom, TOOL_NONE } from "react-svg-pan-zoom";
import c from "./SvgHome.module.css";

// Initial state
const initialState = {
  tool: TOOL_NONE,
  value: null,
  svgContent: null,
  isLoading: true,
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TOOL":
      return { ...state, tool: action.payload };
    case "SET_VALUE":
      return { ...state, value: action.payload };
    case "SET_SVG_CONTENT":
      return { ...state, svgContent: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const SvgHome = memo(() => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tool, value, svgContent, isLoading } = state;

  const parseSvg = useCallback((svgString) => {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
    const svgElement = svgDoc.documentElement;

    const viewBox = svgElement.getAttribute("viewBox");
    const [minX, minY, svgWidth, svgHeight] = viewBox
      ? viewBox.split(" ").map(Number)
      : [
          0,
          0,
          parseFloat(svgElement.getAttribute("width")),
          parseFloat(svgElement.getAttribute("height")),
        ];

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight * 0.9; // Adjust for the ReactSVGPanZoom height
    const scaleX = viewportWidth / svgWidth;
    const scaleY = viewportHeight / svgHeight;
    const initialScale = Math.min(scaleX, scaleY) * 0.95; // 95% to leave a small margin

    dispatch({
      type: "SET_SVG_CONTENT",
      payload: svgElement.innerHTML,
    });

    dispatch({
      type: "SET_VALUE",
      payload: {
        version: 2,
        mode: "idle",
        focus: false,
        SVGMinX: minX,
        SVGMinY: minY,
        SVGWidth: svgWidth,
        SVGHeight: svgHeight,
        viewerWidth: viewportWidth,
        viewerHeight: viewportHeight,
        scaleFactorMin: initialScale / 2,
        scaleFactorMax: initialScale * 10,
        scale: initialScale,
        translationX: (viewportWidth - svgWidth * initialScale) / 2,
        translationY: (viewportHeight - svgHeight * initialScale) / 2,
      },
    });

    dispatch({ type: "SET_LOADING", payload: false });
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${process.env.PUBLIC_URL}/assets/output.svg`, { signal: controller.signal })
      .then((response) => response.text())
      .then(parseSvg)
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.error("Error loading SVG:", error);
          dispatch({ type: "SET_LOADING", payload: false });
        }
      });

    return () => controller.abort();
  }, [parseSvg]);

  const handleToolChange = useCallback((newTool) => {
    dispatch({ type: "SET_TOOL", payload: newTool });
  }, []);

  const handleValueChange = useCallback((newValue) => {
    dispatch({ type: "SET_VALUE", payload: newValue });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={c.container}>
      <ReactSVGPanZoom
        width={window.innerWidth}
        height={window.innerHeight * 0.9}
        background="white"
        tool={tool}
        onChangeTool={handleToolChange}
        value={value}
        onChangeValue={handleValueChange}
        toolbarPosition="right"
        miniaturePosition="right"
        detectAutoPan={false}
        scaleFactorMin={value.scaleFactorMin}
        scaleFactorMax={value.scaleFactorMax}
      >
        <svg
          width={value.SVGWidth}
          height={value.SVGHeight}
          viewBox={`${value.SVGMinX} ${value.SVGMinY} ${value.SVGWidth} ${value.SVGHeight}`}
        >
          <g dangerouslySetInnerHTML={{ __html: svgContent }} />
        </svg>
      </ReactSVGPanZoom>
    </div>
  );
});

export default SvgHome;

