import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const ModeChart = ({ features }) => {
  const RADIAN = Math.PI / 180;
  const COLORS = ["#0088FE", "#00C49F"];

  //featuresを回して、modeを0or1でカウントする
  const modeCount = features.reduce(
    (acc, feature) => {
      if (feature.mode === 0) {
        acc[0] += 1;
      } else {
        acc[1] += 1;
      }
      return acc;
    },
    [0, 0]
  );

  const chartData = [
    {
      name: "Major",
      value: modeCount[1],
    },
    {
      name: "Minor",
      value: modeCount[0],
    },
  ];

  const total = chartData.reduce((sum, { value }) => sum + value, 0);

  const percentData = chartData.map(({ name, value }) => ({ name, value: (value / total) * 100 }));

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
        <tspan>{chartData[index].name}</tspan>
        <tspan x={x} y={y + 20} dominantBaseline="central">
          {(percent * 100).toFixed(0)}%
        </tspan>
      </text>
    );
  };

  return (
    <div className="w-full flex items-center justify-center">
      <PieChart width={400} height={400}>
        <Pie
          data={percentData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        />
        {percentData.map((entry, index) => {
          // todo;fillがうまくいかない
          return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />;
        })}
      </PieChart>
    </div>
  );
};

export default ModeChart;
