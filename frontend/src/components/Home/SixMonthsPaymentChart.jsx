import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Box from "@mui/material/Box";

const desktopOS = [
  {
    label: "Windows",
    value: 72.72,
  },
  {
    label: "OS X",
    value: 16.38,
  },
  {
    label: "Linux",
    value: 3.83,
  },
  {
    label: "Chrome OS",
    value: 2.42,
  },
  {
    label: "Other",
    value: 4.65,
  },
];

export default function SixMonthsPaymentChart() {
  return (
    <Box sx={{ height: 300, width: "100%" }}>
      <PieChart
        series={[
          {
            data: desktopOS,
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
      />
    </Box>
  );
}
