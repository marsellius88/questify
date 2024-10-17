import * as React from "react";
import dayjs from "dayjs";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";

import { data } from "../../Data";

export default function SummaryJournal({ journalEntry }) {
  // const journalEntry =
  //   data.find((entry) => dayjs(entry.date).isSame(selectedDate, "day"))
  //     ?.journal || null;

  let moodIcon;
  switch (journalEntry?.mood) {
    case "happy":
      moodIcon = "😊";
      break;
    case "neutral":
      moodIcon = "😐";
      break;
    case "sad":
      moodIcon = "😢";
      break;
    default:
      moodIcon = "-";
  }

  return (
    <>
      {journalEntry ? (
        <Paper sx={{ padding: 2 }}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Typography
                variant="body1"
                component="h6"
                sx={{ fontWeight: "bold" }}
              >
                I'm grateful for:
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{ marginBottom: 2 }}
              >
                {journalEntry.grateful ? journalEntry.grateful : "-"}
              </Typography>
              <Typography
                variant="body1"
                component="h6"
                sx={{ fontWeight: "bold" }}
              >
                Highlights:
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{ marginBottom: 2 }}
              >
                {journalEntry.highlights ? journalEntry.highlights : "-"}
              </Typography>
              <Typography
                variant="body1"
                component="h6"
                sx={{ fontWeight: "bold" }}
              >
                Thoughts:
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{ marginBottom: 2 }}
              >
                {journalEntry.thoughts ? journalEntry.thoughts : "-"}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography
                variant="body1"
                component="h6"
                sx={{ fontWeight: "bold" }}
              >
                Water intake:
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{ marginBottom: 2 }}
              >
                {journalEntry.waterIntake ? journalEntry.waterIntake : "-"}{" "}
                Litre(s)
              </Typography>
              <Typography
                variant="body1"
                component="h6"
                sx={{ fontWeight: "bold" }}
              >
                Sleep duration:
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{ marginBottom: 2 }}
              >
                {journalEntry.sleepDuration ? journalEntry.sleepDuration : "-"}{" "}
                Hour(s)
              </Typography>
              <Typography
                variant="body1"
                component="h6"
                sx={{ fontWeight: "bold" }}
              >
                Mood:
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{ marginBottom: 2 }}
              >
                {moodIcon}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Typography variant="body1" align="center">
          Tidak ada data
        </Typography>
      )}
    </>
  );
}
