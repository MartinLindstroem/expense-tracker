import React from "react";
import { PieChart } from "@mui/x-charts";

const DonutChart = ({ data }: { data: { label: string; value: number }[] }) => {
  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { fade: "global", highlight: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      height={400}
      width={400}
    />
  );
};

export default DonutChart;
