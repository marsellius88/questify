import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import SelectedMonthYear from "../components/SelectMonthYear";
import JournalTable from "../components/Journal/JournalTable";

export default function Journal() {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [monthlyRecordId, setMonthlyRecordId] = useState("");
  const [data, setData] = useState([]);

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
        setData([])
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("No monthly record found for the selected month and year.");
      } else {
        console.error("Error fetching monthly record ID:", error);
      }
      setMonthlyRecordId("");
      setData([])
    }
  };

  const fetchDataByMonthlyRecordId = async () => {
    try {
      const response = await axios.get(
        `/api/daily-records/monthly-record/${monthlyRecordId}`
      );
      if (response.data) {
        const dailyRecords = response.data;

        const recordDataPromises = dailyRecords.map(async (record) => {
          // Fetch todos for each record
          const todoPromises = record.todoIds.map(async (todoId) => {
            const todoResponse = await axios.get(`/api/todos/${todoId}`);
            return todoResponse.data;
          });
          const todosForDate = await Promise.all(todoPromises);

          // Fetch expenses for each record
          const expensePromises = record.expenseIds.map(async (expenseId) => {
            const expenseResponse = await axios.get(
              `/api/expenses/${expenseId}`
            );
            return expenseResponse.data;
          });
          const expensesForDate = await Promise.all(expensePromises);

          // Fetch journal entry for each record (if journalId exists)
          const journalForDate = record.journalId
            ? await axios
                .get(`/api/journal-entries/${record.journalId}`)
                .then((res) => res.data)
            : null;

          return {
            _id: record._id,
            date: new Date(record.date),
            expense: expensesForDate,
            todo: todosForDate,
            journal: journalForDate,
          };
        });

        const resolvedRecords = await Promise.all(recordDataPromises);
        setData(resolvedRecords);
      } else {
        console.error("No daily records found.");
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching daily records:", error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchMonthlyRecordId();
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    if (monthlyRecordId) {
      fetchDataByMonthlyRecordId();
    }
  }, [monthlyRecordId]);

  return (
    <Box>
      <Typography variant="h1" component="h1" sx={{ marginY: 1 }}>
        Journal
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
        <JournalTable
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          data={data}
        />
      </Box>
    </Box>
  );
}
