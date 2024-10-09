import React, { useState } from "react";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export default function SelectedMonthYear({
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
}) {
  const today = new Date();
  // const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  // const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleReset = () => {
    setSelectedMonth(today.getMonth());
    setSelectedYear(today.getFullYear());
  };

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = 2000; year <= currentYear; year++) {
    years.push(year);
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {/* Dropdown for Month */}
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="month-label">Month</InputLabel>
        <Select
          labelId="month-label"
          id="month-select"
          value={selectedMonth}
          label="Month"
          onChange={handleMonthChange}
        >
          {months.map((month, index) => (
            <MenuItem key={index} value={index}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Dropdown for Year */}
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="year-label">Year</InputLabel>
        <Select
          labelId="year-label"
          id="year-select"
          value={selectedYear}
          label="Year"
          onChange={handleYearChange}
        >
          {years.map((year, index) => (
            <MenuItem key={index} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Reset Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleReset}
        sx={{ marginLeft: 2 }}
      >
        Reset
      </Button>
    </Box>
  );
}
