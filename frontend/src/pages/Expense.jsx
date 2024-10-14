import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import ExpenseTable from "../components/Expense/ExpenseTable";
import SelectedMonthYear from "../components/SelectMonthYear";

export default function Expense() {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [monthlyRecordId, setMonthlyRecordId] = useState("");
  const [monthlyData, setMonthlyData] = useState([]);

  const fetchMonthlyRecordId = async () => {
    try {
      const response = await axios.get(
        `/api/monthly-records/${selectedMonth}/${selectedYear}`
      );
      if (response.data && response.data._id) {
        setMonthlyRecordId(response.data._id);
      } else {
        console.error("Monthly record ID not found in response.");
        setMonthlyRecordId("");
      }
    } catch (error) {
      console.error("Error fetching monthly record ID:", error);
      setMonthlyRecordId("");
    }
  };

  const fetchDailyRecordsByMonthlyRecordId = async () => {
    try {
      const response = await axios.get(`/api/daily-records/monthly-record/${monthlyRecordId}`);
      if (response.data) {
        setMonthlyData(response.data);
      } else {
        console.error("No daily records found.");
        setMonthlyData([]);
      }
    } catch (error) {
      console.error("Error fetching daily records:", error);
      setMonthlyData([]);
    }
  };

  useEffect(() => {
    fetchMonthlyRecordId();
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    console.log(monthlyRecordId)
    if (monthlyRecordId) {
      fetchDailyRecordsByMonthlyRecordId();
    }
  }, [monthlyRecordId]);

  return (
    <Box>
      <Typography variant="h1" component="h1" sx={{ marginY: 1 }}>
        Expense
      </Typography>
      <Typography variant="body1" component="p" sx={{ marginBottom: 2.5 }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque,
        voluptatem aperiam odio cum cumque, quaerat reiciendis impedit eos neque
        officiis sapiente ratione, doloribus sunt. Pariatur, commodi laudantium
        beatae deleniti nihil quam aut doloribus cumque mollitia in vero
        expedita perspiciatis excepturi.
      </Typography>
      <Divider />
      <Box sx={{ marginTop: 2.5 }}>
        <SelectedMonthYear
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
        <ExpenseTable
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          monthlyData={monthlyData}
        />
      </Box>
    </Box>
  );
}
