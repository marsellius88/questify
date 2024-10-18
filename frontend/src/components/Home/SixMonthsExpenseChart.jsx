import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import axios from "axios";

const settings = {
  valueFormatter: (value) =>
    value != null ? `Rp ${value.toLocaleString("id-ID")}` : "Rp 0",
};

export default function SixMonthsExpenseChart() {
  const [expenseData, setExpenseData] = useState({
    totals: [],
    months: [],
  });

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/expenses/monthly/total");
      setExpenseData({
        totals: response.data.totals,
        months: response.data.months,
      });
    } catch (error) {
      console.error("Error fetching expense data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ height: 300, width: "100%" }}>
      <SparkLineChart
        plotType="bar"
        data={expenseData.totals}
        showTooltip
        showHighlight
        xAxis={{
          scaleType: "band",
          data: expenseData.months.map((month) => new Date(month)),
          valueFormatter: (value) =>
            value.toLocaleString("en-US", { month: "long", year: "numeric" }),
        }}
        {...settings}
      />
    </Box>
  );
}
