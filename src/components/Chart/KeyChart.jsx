import React from "react";
import { Treemap, ResponsiveContainer, CustomizedContent } from "recharts";
import { keyMap } from "@/lib/const/keyMap";

const KeyChart = ({ features }) => {
  const chartData = keyMap.map((key, i) => {
    const count = features.filter((feature) => feature.key === i).length;
    return {
      name: key,
      children: [{ name: key, size: count }],
    };
  });

  return (
    //Treemapの中身
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          width={400}
          height={200}
          data={chartData}
          dataKey="size"
          aspectRatio={4 / 3}
          stroke="#fff"
          fill="#8884d8"
        />
      </ResponsiveContainer>
    </div>
  );
};

export default KeyChart;
