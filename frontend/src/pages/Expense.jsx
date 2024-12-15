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

  return (
    <Box>
      <Typography variant="h1" component="h1" sx={{ marginY: 1 }}>
        Expense
      </Typography>
      <Typography variant="body1" component="p" sx={{ marginBottom: 2.5 }}>
        Tes
      </Typography>
      <Divider />
      <Box sx={{ marginTop: 2.5 }}>
        <SelectedMonthYear
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
        <ExpenseTable data={data} setData={setData} />
      </Box>
    </Box>
  );
}
