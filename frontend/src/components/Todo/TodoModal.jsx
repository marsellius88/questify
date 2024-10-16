import * as React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DateInput from "./DateInput";
import dayjs from "dayjs";

export default function TodoModal({ row, handleAddTodo }) {
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const dailyRecordId = row._id;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDate(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dueDate = selectedDate ? new Date(selectedDate).toString() : null;
    const formData = {
      dailyRecordId,
      title: event.target.title.value,
      due: dueDate,
      priority: false,
      done: false
    };
    try {
      const response = await axios.post("/api/todos", formData);
      console.log("Todo added successfully:", response.data);
      handleAddTodo(response.data);
      handleClose();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>Add Todo</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>{`${row.date.toLocaleDateString("en-GB", {
          weekday: "long",
        })}, ${row.date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            required
            variant="standard"
          />
          <TextField
            margin="dense"
            id="note"
            name="note"
            label="Note"
            type="text"
            fullWidth
            multiline
            variant="standard"
          />
          <DateInput
            selectedValue={selectedDate}
            setSelectedValue={setSelectedDate}
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
