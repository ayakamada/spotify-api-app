import React from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const TempoChart = ({ features }) => {
  const tempos = features.map((feature) => feature?.tempo);
  const roundedTempos = tempos.map((tempo) => Math.round(tempo));

  const tempoRanges = [];
  for (let i = 50; i <= 200; i += 10) {
    tempoRanges.push(`${i}-${i + 10}`);
  }

  const tempoCounts = new Array(tempoRanges.length).fill(0);
  features.forEach((feature) => {
    const tempo = feature?.tempo;
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
    <div className="w-full text-center mx-auto">
      <h2>BPM</h2>
      <BarChart
        width={320}
        height={400}
        data={tempoData}
        margin={{
          top: 5,
          bottom: 5,
        }}
        className="mx-auto"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default TempoChart;
