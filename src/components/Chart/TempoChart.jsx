import React from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const TempoChart = ({ features }) => {
  const tempos = features.map((feature) => feature.tempo);
  const roundedTempos = tempos.map((tempo) => Math.round(tempo));

  const tempoRanges = [];
  for (let i = 50; i <= 200; i += 10) {
    tempoRanges.push(`${i}-${i + 10}`);
  }

  const tempoCounts = new Array(tempoRanges.length).fill(0);
  features.forEach((feature) => {
    const tempo = feature.tempo;
    for (let i = 0; i < tempoRanges.length; i++) {
      const [minTempo, maxTempo] = tempoRanges[i].split("-").map(Number);
      if (tempo >= minTempo && tempo <= maxTempo) {
        tempoCounts[i] += 1;
        break;
      }
    }
  });

  const tempoData = tempoRanges.reduce((acc, cur, idx) => {
    acc.push({ name: cur, count: tempoCounts[idx] });
    return acc;
  }, []);

  return (
    <BarChart
      width={500}
      height={300}
      data={tempoData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
};

export default TempoChart;
