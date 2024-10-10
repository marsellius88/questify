import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function ResetTodayButton({ setSelectedValue }) {
  const handleReset = () => {
    setSelectedValue(dayjs(new Date()));
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleReset}
        fullWidth
      >
        Today
      </Button>
    </Box>
  );
}
