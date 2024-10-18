import { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Box from "@mui/material/Box";
import axios from "axios";

const valueFormatter = (item) =>
  item.value != null ? `Rp ${item.value.toLocaleString("id-ID")}` : "Rp 0";

export default function SixMonthsPaymentChart() {
  const [paymentMethods, setPaymentMethods] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/expenses/payment/distribution");
      setPaymentMethods(response.data);
    } catch (error) {
      console.error("Error fetching payment distribution data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ height: 300, width: "100%" }}>
      <PieChart
        series={[
          {
            data: paymentMethods,
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            valueFormatter,
          },
        ]}
      />
    </Box>
  );
}
