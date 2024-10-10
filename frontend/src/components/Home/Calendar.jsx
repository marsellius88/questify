import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export default function Calendar({ selectedValue, setSelectedValue }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        sx={{ padding: 0 }}
        components={["DateCalendar", "DateCalendar", "DateCalendar"]}
      >
        <DemoItem>
          <DateCalendar
            value={selectedValue}
            onChange={(newValue) => setSelectedValue(newValue)}
            views={["year", "month", "day"]}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
