import React, { PureComponent } from "react";
import { Treemap, ResponsiveContainer } from "recharts";
import { keyMap } from "@/lib/const/keyMap";

const KeyChart = ({ features }) => {
  // const COLORS = ["#8889DD", "#9597E4", "#8DC77B", "#A5D297", "#E2CF45", "#F8C12D"];
  const chartData = keyMap.map((key, i) => {
    const count = features.filter((feature) => feature?.key === i).length;
    return {
      name: key,
      children: [{ name: key, size: count }],
    };
  });

  return (
    <div className="w-full flex items-center justify-center">
      <Treemap
        width={400}
        height={200}
        data={chartData}
        dataKey="size"
        aspectRatio={4 / 3}
        stroke="#fff"
        fill="#8884d8"
      />
    </div>
  );
};

export default KeyChart;
