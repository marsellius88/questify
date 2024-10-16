import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

export default function Alert({ text, severity }) {
  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert icon={<CheckIcon fontSize="inherit" />} severity={severity}>
        {text}
      </Alert>
    </Snackbar>
  );
}
