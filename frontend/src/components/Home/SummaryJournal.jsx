import * as React from "react";
import dayjs from "dayjs";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";

import { data } from "../../Data";
import JournalModal from "../Journal/JournalModal";

export default function SummaryJournal({ dailyRecord, setData }) {
  function createData(_id, date, expense, todo, journal) {
    const dailyTotal = expense.reduce(
      (total, item) => total + item.price * item.amount,
      0
    );
    const completedTodos = todo.filter((item) => item.done).length;
    const totalTodos = todo.length;
    const todoPercentage =
      totalTodos > 0 ? (completedTodos * 100) / totalTodos : 0;
    let moodIcon;
    switch (journal?.mood) {
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
    return {
      _id,
      date,
      dailyTotal,
      todoPercentage,
      todo: todo,
      mood: moodIcon,
      journal: journal,
    };
  }

  let journalEntry;
  if (dailyRecord) {
    journalEntry = createData(
      dailyRecord._id,
      dailyRecord.date,
      dailyRecord.expense,
      dailyRecord.todo,
      dailyRecord.journal
    );
  }

  const handleAddUpdateJournalEntry = (journalEntry) => {
    setData((prevData) =>
      prevData.map((item) =>
        item._id === journalEntry.dailyRecordId
          ? { ...item, journal: journalEntry }
          : item
      )
    );
  };

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
                {journalEntry.journal?.grateful
                  ? journalEntry.journal.grateful
                  : "-"}
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
                {journalEntry.journal?.highlights
                  ? journalEntry.journal.highlights
                  : "-"}
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
                {journalEntry.journal?.thoughts
                  ? journalEntry.journal.thoughts
                  : "-"}
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
                {journalEntry.journal ? journalEntry.journal.waterIntake : "-"}{" "}
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
                {journalEntry.journal
                  ? journalEntry.journal.sleepDuration
                  : "-"}{" "}
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
                {journalEntry.mood}
              </Typography>
            </Grid>
            <Grid size={12}>
              <JournalModal
                row={journalEntry}
                handleAddUpdateJournalEntry={handleAddUpdateJournalEntry}
              />
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Paper sx={{ padding: 2 }}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <JournalModal
                row={dailyRecord}
                handleAddUpdateJournalEntry={handleAddUpdateJournalEntry}
              />
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
}
