import React from "react";
import {
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Tooltip,
  Label
} from "recharts";

const GaugeChart = () => {
  const RADIAN = Math.PI / 180;

  const width = 500;
  const height = 300;
  const chartValue =100;
  const slices = [
    {
      value: 50,
      color: "#6fe100",
      marginRight:10
    },
    {
      value: 50,
      color: "#b0eb00"
    },
    {
      value: 50,
      color: "#f3d000"
    },
    {
      value: 50,
      color: "#eb9709"
    },
    {
      value: 50,
      color: "#d83039"
    }
  ];

  const sumValues = slices.map((cur) => cur.value).reduce((a, b) => a + b);

  const arrowData = [
    { value: chartValue },
    { value: 0 },
    {cx:0},
    { value: sumValues - chartValue },

  ];

  const pieProps = {
    startAngle: 180,
    endAngle: 0,
    cx: width / 2,
    cy: width / 2,
    isAnimationActive: false
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x> cx ? "start" : "end"}
        dominantBaseline="auto"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const Arrow = ({ cx, cy, midAngle, outerRadius }) => {
    //eslint-disable-line react/no-multi-comp
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const mx = cx + (outerRadius + width * 0.03) * cos;
    const my = cy + (outerRadius + width * 0.03) * sin;
    return (
      <g>
        <path
          d={`M${cx},${cy}L${mx},${my}`}
          strokeWidth="4"
          stroke="black"
          fill="none"
          // strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r={100 * 0.1} fill="orange" stroke="none"/>
      </g>
    );
  };

  return (
    <div className="gaugecenter" style={{ width, height: 400 }}>
      <ResponsiveContainer className="borderGauge">
        <PieChart width={width} height={height} >
          <Pie
            stroke="none"
            data={slices}
            innerRadius={(width / 2) * 0.5}
            outerRadius={(width / 2) * 0.8}
            {...pieProps}
            // label
            label={renderCustomizedLabel}
          >
            {slices.map((each, i) => (
              <Cell key={`cell-${i}`} fill={slices[i].color} stroke="none" />
            ))}
          </Pie>
          <Tooltip />
          <Pie
            stroke="none"
            fill="none"
            activeIndex={1}
            activeShape={Arrow}
            data={arrowData}
            innerRadius={(width / 2) * 0.5}
            outerRadius={(width / 2) * 0.6}
            paddingAngle={5}
            {...pieProps}
          >
            <Label
              value={chartValue}
              position="centerBottom" 
              offset={-20}
              className="gauge-label"
              fontSize="50px"
              fontWeight="bold"
              labelLine={0}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GaugeChart;
