import React, { useState, useEffect, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function FeatureChart({ features }) {
  const [chartData, setChartData] = useState([]);
  const [propertyAve, SetPropertyAve] = useState([]);

  const properties = useMemo(
    () => ["acousticness", "danceability", "energy", "instrumentalness", "liveness", "speechiness", "valence"],
    []
  );

  // 各プロパティの合計を計算する
  const propertySums = useMemo(() => {
    return properties.reduce((sums, property) => {
      const propertySum = features.reduce((acc, item) => acc + item[property], 0);
      return { ...sums, [property]: propertySum };
    }, {});
  }, [features, properties]);

  // 各プロパティの平均値を計算する
  const propertyAverages = useMemo(() => {
    return properties.reduce((averages, property) => {
      const propertyAverage = propertySums[property] / features.length;
      return { ...averages, [property]: propertyAverage };
    }, {});
  }, [features, properties, propertySums]);

  useEffect(() => {
    SetPropertyAve(propertyAverages);
    setChartData(propertyAverages);
  }, [features, propertyAverages]);

  console.log(chartData);

  return (
    <div className="w-full h-full">
      <BarChart width={500} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="rgba(75,192,192,0.6)" name="Audio Features" />
      </BarChart>
    </div>
  );
}
