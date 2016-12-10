import React from 'react';
import * as d3 from "d3";

const PieChart = ({data, size}) => {
  let outerRadius = size/2;
  let innerRadius = 0;

  let colors = d3.scaleOrdinal()
    .range(["#1E90FF", "#B22222"]);

  let pie = d3
    .pie()
    .sort(null)
    .value(d => d.value)

  let arc = d3
    .arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius);

  let labelArc = d3
    .arc()
    .outerRadius(outerRadius - 40)
    .innerRadius(outerRadius - 40);

  let chart = pie(data).map((d,i) => (
    <g key={i}>
      <path fill={colors(i)} d={arc(d)} stroke ="#fff" />
      <text transform={`translate(${labelArc.centroid(d)})`}
        dy=".50em" style={{font: '10px sans-serif',
        textAnchor: 'middle'}}>
        {d.data.label}
      </text>
    </g>
  ));

  return (
    <g>
      {chart}
    </g>
  )
}


export default PieChart;
