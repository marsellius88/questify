import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Expense from "./pages/Expense";
import Todo from "./pages/Todo";
import Journal from "./pages/Journal";

const checkOrCreateDailyRecords = async () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  try {
    const response = await axios.post("/api/monthly-records", {
      year,
      month,
    });
    console.log(response.data.message);
  } catch (error) {
    console.error("Error checking or creating daily records:", error);
  }
};

function App() {
  const hasRun = useRef(false);
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
        setData([]);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("No monthly record found for the selected month and year.");
      } else {
        console.error("Error fetching monthly record ID:", error);
      }
      setMonthlyRecordId("");
      setData([]);
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
    if (!hasRun.current) {
      checkOrCreateDailyRecords();
      hasRun.current = true;
    }
  }, []);

  useEffect(() => {
    fetchMonthlyRecordId();
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    if (monthlyRecordId) {
      fetchDataByMonthlyRecordId();
    }
  }, [monthlyRecordId]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home data={data} setData={setData} />} />
        <Route
          path="/expense"
          element={
            <Expense
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              data={data}
              setData={setData}
            />
          }
        />
        <Route
          path="/todo"
          element={
            <Todo
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              data={data}
              setData={setData}
            />
          }
        />
        <Route
          path="/journal"
          element={
            <Journal
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              data={data}
              setData={setData}
            />
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
