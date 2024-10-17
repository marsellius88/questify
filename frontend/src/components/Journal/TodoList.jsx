import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TodoList({ row }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>View Todo</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Todo List
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            {row.todo.map((item, index) => (
              <Box
                key={index}
                sx={{
                  mb: 2,
                  p: 1,
                  border: "1px solid gray",
                  borderRadius: "4px",
                }}
              >
                <Typography variant="subtitle1" component="div">
                  {item.title} {item.done ? "✔️" : "❌"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Due:{" "}
                  {item.due
                    ? new Date(item.due).toLocaleDateString("en-GB")
                    : "No due date"}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                  Priority: {item.priority ? "High" : "Normal"}
                </Typography> */}
                <Typography variant="body2" color="text.secondary">
                  Note:{" "}
                  {item.note
                    ? item.note.length > 30
                      ? `${item.note.substring(0, 30)}...`
                      : item.note
                    : "-"}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
