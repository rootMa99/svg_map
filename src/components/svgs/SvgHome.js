import c from "./SvgHome.module.css";
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import sv from "../../assets/M4-LAYOUT-EVOLUTION-JULY-2024-Model.svg"
const SvgHome = (p) => {
    const svgRef = useRef(null);

  useEffect(() => {
    d3.xml({sv}).then((data) => {
      const svgNode = data.documentElement;
      const svg = d3.select(svgRef.current).node().appendChild(svgNode);

      const zoom = d3.zoom()
        .scaleExtent([0.5, 5])
        .on('zoom', (event) => {
          d3.select(svg).selectAll('g').attr('transform', event.transform);
        });

      d3.select(svg).call(zoom);
    });
  }, []);

  return <div ref={svgRef} className={c.container}></div>;
};
export default SvgHome;
