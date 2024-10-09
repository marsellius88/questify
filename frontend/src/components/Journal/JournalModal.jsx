import * as React from "react";
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

export default function JournalModal({ row }) {
  const [open, setOpen] = React.useState(false);
  const [mood, setMood] = React.useState("");
  const [waterIntake, setWaterIntake] = React.useState(0);
  const [sleepDuration, setSleepDuration] = React.useState(0);

  // const [mood, setMood] = React.useState(row.journal.mood);
  // const [waterIntake, setWaterIntake] = React.useState(row.journal.waterIntake);
  // const [sleepDuration, setSleepDuration] = React.useState(
  //   row.journal.sleepDuration
  // );

  const handleChangeMood = (event) => {
    setMood(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setWaterIntake(0);
    setSleepDuration(0);
    setMood("");
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
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            formData.append("waterIntake", waterIntake);
            formData.append("sleepDuration", sleepDuration);
            formData.append("mood", mood);
            const formJson = Object.fromEntries(formData.entries());
            console.log(formJson);
            handleClose();
          },
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
