import c from "./SvgHome.module.css";
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
// import sv from "../../assets/world.svg"
const SvgHome = (p) => {
    const svgContainerRef = useRef(null);

    useEffect(() => {
      d3.xml("../../assets/aptiv-logo.svg").then(data => {
        const importedNode = document.importNode(data.documentElement, true);
        const svg = d3.select(svgContainerRef.current).node().appendChild(importedNode);
  
        const zoom = d3.zoom()
          .scaleExtent([0.5, 5])
          .on('zoom', (event) => {
            d3.select(svg).select('g').attr('transform', event.transform);
          });
  
        d3.select(svg).call(zoom);
  
        // Ensure the SVG file has a <g> element to apply the zoom transform
        if (!d3.select(svg).select('g').node()) {
          const g = d3.select(svg).append('g');
          g.selectAll('*').nodes().forEach(node => g.node().appendChild(node));
        }
      });
    }, []);
  
    return <div ref={svgContainerRef} className="svg-container"></div>;
};
export default SvgHome;
