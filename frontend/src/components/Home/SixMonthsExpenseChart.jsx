import * as React from "react";
import Box from "@mui/material/Box";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";

export default function SixMonthsExpenseChart() {
  return (
    <Box sx={{ height: 300, width: "100%" }}>
      <SparkLineChart
        plotType="bar"
        data={[3000000, 2500000, 3200000, 1800000, 1600000, 3100000]}
        showTooltip
        showHighlight
        xAxis={{
          scaleType: "band",
          data: [
            new Date(2024, 0, 1),
            new Date(2024, 1, 1),
            new Date(2024, 2, 1),
            new Date(2024, 3, 1),
            new Date(2024, 4, 1),
            new Date(2024, 5, 1),
          ],
          valueFormatter: (value) => value.toLocaleString("en-US", { month: "long" }),
        }}
      />
    </Box>
  );
}
