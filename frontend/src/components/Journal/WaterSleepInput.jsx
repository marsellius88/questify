import { useState } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from '@mui/material/Tooltip';

import WaterDropIcon from "@mui/icons-material/WaterDrop";
import BedtimeIcon from "@mui/icons-material/Bedtime";

export default function WaterSleepInput({
  selectedValue,
  setSelectedValue,
  type,
}) {
  const [hoverValue, setHoverValue] = useState(0);

  let values = [];
  {
    type === "water" ? (values = [1, 2, 3, 4, 5]) : (values = [2, 4, 6, 8, 10]);
  }

  const handleClick = (value) => {
    setSelectedValue(value);
  };

  const handleMouseEnter = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{ marginTop: 1.5, marginBottom: 0 }}
    >
      {values.map((value) => (
        <IconButton
          key={value}
          onClick={() => handleClick(value)}
          onMouseEnter={() => handleMouseEnter(value)}
          onMouseLeave={handleMouseLeave}
          sx={{
            color: value <= (hoverValue || selectedValue) ? "#1976d2" : "gray",
            padding: 0,
            marginY: 0.8125,
            marginX: 0.3,
          }}
        >
          <Tooltip title={value}>
            {type === "water" ? (
              <WaterDropIcon fontSize="large" />
            ) : (
              <BedtimeIcon fontSize="large" />
            )}
          </Tooltip>
        </IconButton>
      ))}
      <Typography sx={{ marginLeft: 2 }}>
        {selectedValue} {type === "water" ? "L" : "h"}
      </Typography>
    </Box>
  );
}
