import * as React from "react";
import Box from "@mui/material/Box";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";

export default function OneMonthExpenseChart() {
  return (
    <Box sx={{ height: 300, width: "100%" }}>
      <SparkLineChart
        plotType="bar"
        data={[1, 4, 2, 5, 7, 2, 4, 6]}
        showTooltip
        showHighlight
        xAxis={{
          scaleType: "band",
          data: [
            new Date(2016, 0, 1),
            new Date(2017, 0, 1),
            new Date(2018, 0, 1),
            new Date(2019, 0, 1),
            new Date(2020, 0, 1),
            new Date(2021, 0, 1),
            new Date(2022, 0, 1),
            new Date(2023, 0, 1),
          ],
          valueFormatter: (value) => value.getFullYear(),
        }}
      />
    </Box>
  );
}
