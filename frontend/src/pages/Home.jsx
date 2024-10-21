import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";

import Calendar from "../components/Home/Calendar";
import ResetTodayButton from "../components/ResetTodayButton";
import SummaryAccordions from "../components/Home/SummaryAccordions";
import Analytics from "../components/Home/Analytics";

export default function Home({ data, setData }) {
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  const [dailyRecord, setDailyRecord] = useState(null);

  useEffect(() => {
    const selectedDateString = selectedDate.format("YYYY-MM-DD");
    const matchingRecord = data.find(
      (record) => dayjs(record.date).format("YYYY-MM-DD") === selectedDateString
    );
    setDailyRecord(matchingRecord || null);
  }, [selectedDate, data]);

  return (
    <Box>
      <Typography variant="h1" component="h1" sx={{ marginY: 1 }}>
        Summary
      </Typography>
      <Box display="flex">
        <Box sx={{ marginRight: 2 }}>
          <Calendar
            selectedValue={selectedDate}
            setSelectedValue={setSelectedDate}
          />
          <ResetTodayButton setSelectedValue={setSelectedDate} />
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "80vh",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#bdc1c6",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#888",
            },
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{ marginTop: 2, marginBottom: 2 }}
          >
            {selectedDate.format("dddd, D MMMM YYYY")}
          </Typography>
          <Box>
            {dailyRecord ? (
              <SummaryAccordions
                dailyRecord={dailyRecord}
                setData={setData}
              />
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <CircularProgress />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Divider sx={{ marginY: 2 }} />
      <Box>
        <Typography variant="h1" component="h1" sx={{ marginY: 1 }}>
          Analytics
        </Typography>
        <Analytics />
      </Box>
    </Box>
  );
}
