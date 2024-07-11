import c from "./SvgHome.module.css";
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const SvgHome = (p) => {
    const svgRef = useRef(null);

    useEffect(() => {
      const svg = d3.select(svgRef.current)
        .attr('width', 600)
        .attr('height', 400)
        .style('border', '1px solid black');
  
      const zoom = d3.zoom()
        .scaleExtent([0.5, 5])
        .on('zoom', (event) => {
          svg.selectAll('g').attr('transform', event.transform);
        });
  
      svg.call(zoom);
  
      const g = svg.append('g');
      
      g.append('rect')
        .attr('width', 100)
        .attr('height', 100)
        .attr('x', 50)
        .attr('y', 50)
        .attr('class', 'zoom-rect');
  
    }, []);
  
    return <svg ref={svgRef}></svg>;
};
export default SvgHome;
