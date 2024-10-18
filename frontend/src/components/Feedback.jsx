import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Feedback({
  open,
  message,
  severity,
  handleClose,
  duration = 3000,
}) {
  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={duration}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
