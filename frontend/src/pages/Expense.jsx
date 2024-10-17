import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import ExpenseTable from "../components/Expense/ExpenseTable";
import SelectedMonthYear from "../components/SelectMonthYear";

export default function Expense({
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  data,
  setData
}) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (data) {
      setExpenses(data);
    }
  }, [data]);

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
