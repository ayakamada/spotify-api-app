import React from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { parsePitchClass } from "@/lib/utils/index";

const KeyChart = ({ features }) => {
  const chartData = features.map((feature) => ({
    key: feature.key,
    pitch: parsePitchClass(feature.key),
  }));

  // console.log(chartData);

  return (
    <div className="w-full h-full">
      <ScatterChart width={600} height={400}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="key" />
        <YAxis dataKey="pitch" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="Audio Features" data={chartData} fill="#8884d8" />
      </ScatterChart>
    </div>
  );
};

export default KeyChart;
