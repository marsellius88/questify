import * as React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";

import WaterSleepInput from "./WaterSleepInput";
import SelectMood from "./SelectMood";
import EditIcon from "@mui/icons-material/Edit";
import TodoProgress from "./TodoProgress";
import TodoList from "./TodoList";
import Feedback from "../Feedback";

export default function JournalModal({ row, handleAddUpdateJournalEntry }) {
  const [open, setOpen] = React.useState(false);
  const [mood, setMood] = React.useState("");
  const [waterIntake, setWaterIntake] = React.useState(0);
  const [sleepDuration, setSleepDuration] = React.useState(0);
  const [grateful, setGrateful] = React.useState("");
  const [highlights, setHighlights] = React.useState("");
  const [thoughts, setThoughts] = React.useState("");
  const [feedbackOpen, setFeedbackOpen] = React.useState(false);
  const [feedbackMessage, setFeedbackMessage] = React.useState("");
  const [feedbackSeverity, setFeedbackSeverity] = React.useState("success");

  const dailyRecordId = row._id;

  React.useEffect(() => {
    if (row && open) {
      setMood(row.journal?.mood || "");
      setWaterIntake(row.journal?.waterIntake || 0);
      setSleepDuration(row.journal?.sleepDuration || 0);
      setGrateful(row.journal?.grateful || "");
      setHighlights(row.journal?.highlights || "");
      setThoughts(row.journal?.thoughts || "");
    }
  }, [row, open]);

  const handleChangeMood = (event) => {
    setMood(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMood("");
    setWaterIntake(0);
    setSleepDuration(0);
    setGrateful("");
    setHighlights("");
    setThoughts("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      dailyRecordId,
      grateful: grateful,
      highlights: highlights,
      mood: mood,
      sleepDuration: sleepDuration,
      waterIntake: waterIntake,
      thoughts: thoughts,
    };

    try {
      let response;
      if (row.journal) {
        // Update existing journal entry
        response = await axios.put(
          `/api/journal-entries/${row.journal._id}`,
          formData
        );
        console.log("Journal entry updated successfully:", response.data);
        setFeedbackMessage("Journal updated successfully!");
        setFeedbackSeverity("success");
        setFeedbackOpen(true);
      } else {
        // Create a new journal entry
        response = await axios.post("/api/journal-entries", formData);
        console.log("Journal entry created successfully:", response.data);
        setFeedbackMessage("Journal added successfully!");
        setFeedbackSeverity("success");
        setFeedbackOpen(true);
      }

      // Update the table data
      handleAddUpdateJournalEntry(response.data);
      handleClose();
    } catch (error) {
      console.error("Error submitting journal entry:", error);
      setFeedbackMessage("Failed to add or update journal. Please try again.");
      setFeedbackSeverity("error");
      setFeedbackOpen(true);
    }
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>
          {`${row.date.toLocaleDateString("en-GB", {
            weekday: "long",
          })}, ${row.date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Box sx={{ marginTop: 1, marginBottom: 0.5, height: 48 }}>
                <TodoProgress progress={row.todoPercentage} />
                <TodoList row={row} />
              </Box>
              <TextField
                margin="dense"
                id="grateful"
                name="grateful"
                label="I'm grateful for"
                type="text"
                fullWidth
                variant="standard"
                multiline
                value={grateful}
                onChange={(e) => setGrateful(e.target.value)}
              />
              <TextField
                margin="dense"
                id="highlights"
                name="highlights"
                label="Highlights"
                type="text"
                fullWidth
                variant="standard"
                multiline
                value={highlights}
                onChange={(e) => setHighlights(e.target.value)}
              />
            </Grid>
            <Grid size={6}>
              <SelectMood
                selectedValue={mood}
                setSelectedValue={handleChangeMood}
              />
              <WaterSleepInput
                selectedValue={waterIntake}
                setSelectedValue={setWaterIntake}
                type="water"
              />
              <WaterSleepInput
                selectedValue={sleepDuration}
                setSelectedValue={setSleepDuration}
                type="sleep"
              />
            </Grid>
          </Grid>
          <TextField
            margin="dense"
            id="thoughts"
            name="thoughts"
            label="Thoughts"
            type="text"
            fullWidth
            variant="standard"
            multiline
            value={thoughts}
            onChange={(e) => setThoughts(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
      <Feedback
        open={feedbackOpen}
        message={feedbackMessage}
        severity={feedbackSeverity}
        handleClose={() => setFeedbackOpen(false)}
      />
    </React.Fragment>
  );
}
