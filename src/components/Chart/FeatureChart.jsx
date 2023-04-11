import React, { useState, useEffect, useMemo } from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

export default function FeatureChart({ features }) {
  const [chartData, setChartData] = useState([]);
  const [propertyAve, SetPropertyAve] = useState([]);

  const properties = useMemo(
    () => [
      { key: "acousticness", label: "アコースティック" },
      { key: "danceability", label: "踊れる" },
      { key: "energy", label: "エネルギッシュ" },
      { key: "instrumentalness", label: "インスト感" },
      { key: "liveness", label: "ライブ感" },
      { key: "speechiness", label: "言葉っぽさ" },
      { key: "valence", label: "明るさ" },
    ],
    []
  );

  // 各プロパティの合計を計算する
  const propertySums = useMemo(() => {
    return properties.reduce((sums, property) => {
      const propertySum = features.reduce((acc, item) => acc + (item?.[property.key] || 0), 0);

      return { ...sums, [property.key]: propertySum };
    }, {});
  }, [features, properties]);

  // 各プロパティの平均値を計算する
  const propertyAverages = useMemo(() => {
    return properties.reduce((averages, property) => {
      const propertyAverage = propertySums[property.key] / features.length;
      return { ...averages, [property.key]: propertyAverage };
    }, {});
  }, [features, properties, propertySums]);

  useEffect(() => {
    SetPropertyAve(propertyAverages);
    setChartData(properties.map((property) => ({ label: property.label, value: propertyAverages[property.key] })));
  }, [features, properties, propertyAverages]);

  return (
    <div className="w-full">
      <RadarChart cx={300} cy={200} outerRadius={150} width={600} height={400} data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="label" />
        <PolarRadiusAxis />
        <Radar name="Audio Features" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    </div>
  );
}
