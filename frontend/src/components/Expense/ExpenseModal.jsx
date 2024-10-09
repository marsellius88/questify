import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";

import SelectPayment from "./SelectPayment";

export default function ExpenseModal({ row }) {
  const [open, setOpen] = React.useState(false);
  const [payment, setPayment] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [amount, setAmount] = React.useState(1);

  const handlePaymentChange = (event) => {
    setPayment(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPayment("");
    setPrice(0);
    setAmount(1);
  };

  const handlePriceChange = (event) => {
    setPrice(Number(event.target.value));
  };

  const handleAmountChange = (event) => {
    setAmount(Number(event.target.value));
  };

  const totalPrice = price * amount;

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>Add Expense</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            formData.append("payment", payment);
            // formData.append("sleepDuration", sleepDuration);
            // formData.append("mood", mood);
            const formJson = Object.fromEntries(formData.entries());
            console.log(formJson);
            handleClose();
          },
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
            id="name"
            name="name"
            label="Item Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="platform"
            name="platform"
            label="Platform"
            type="text"
            fullWidth
            variant="standard"
          />
          <SelectPayment
            selectedValue={payment}
            setSelectedValue={handlePaymentChange}
          />
          <TextField
            margin="dense"
            id="price"
            name="price"
            label="Price"
            type="number"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">Rp</InputAdornment>
                ),
              },
            }}
            variant="standard"
            value={price}
            onChange={handlePriceChange}
          />
          <TextField
            margin="dense"
            id="amount"
            name="amount"
            label="Amount"
            type="number"
            fullWidth
            variant="standard"
            value={amount}
            onChange={handleAmountChange}
          />
          <DialogContentText sx={{ marginTop: 2, fontWeight: "bold" }}>
            Total Price: Rp {totalPrice.toLocaleString("id-ID")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
