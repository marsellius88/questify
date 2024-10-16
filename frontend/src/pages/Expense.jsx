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
  const [expenses, setExpenses] = useState([]);

  const fetchMonthlyRecordId = async () => {
    try {
      const response = await axios.get(
        `/api/monthly-records/${selectedMonth}/${selectedYear}`
      );
      if (response.data && response.data._id) {
        setMonthlyRecordId(response.data._id);
      } else {
        console.log("Monthly record ID not found in response.");
        setMonthlyRecordId("");
        setExpenses([]);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("No monthly record found for the selected month and year.");
      } else {
        console.error("Error fetching monthly record ID:", error);
      }
      setMonthlyRecordId("");
      setExpenses([]);
    }
  };

  const fetchExpensesByMonthlyRecordId = async () => {
    try {
      const response = await axios.get(
        `/api/daily-records/monthly-record/${monthlyRecordId}`
      );
      if (response.data) {
        const dailyRecords = response.data;
        const expenseDataPromises = dailyRecords.map(async (record) => {
          const expensePromises = record.expenseIds.map(async (expenseId) => {
            const expenseResponse = await axios.get(
              `/api/expenses/${expenseId}`
            );
            return expenseResponse.data;
          });
          const expensesForDate = await Promise.all(expensePromises);
          return {
            _id: record._id,
            date: new Date(record.date),
            expense: expensesForDate,
          };
        });
        const resolvedExpenses = await Promise.all(expenseDataPromises);
        setExpenses(resolvedExpenses);
      } else {
        console.error("No daily records found.");
        setExpenses([]);
      }
    } catch (error) {
      console.error("Error fetching daily records:", error);
      setExpenses([]);
    }
  };

  useEffect(() => {
    fetchMonthlyRecordId();
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    if (monthlyRecordId) {
      fetchExpensesByMonthlyRecordId();
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
        <ExpenseTable expenses={expenses} setExpenses={setExpenses} />
      </Box>
    </Box>
  );
}
