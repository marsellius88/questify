import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";


function SelectMood({ selectedValue, setSelectedValue }) {
  return (
    <FormControl
      fullWidth
      variant="outlined"
      margin="normal"
      sx={{
        marginTop: 1,
        marginBottom: 0.5,
      }}
    >
      <InputLabel id="select-mood-label">Mood</InputLabel>
      <Select
        labelId="select-mood-label"
        id="select-mood"
        value={selectedValue}
        onChange={setSelectedValue}
        required
        label="Mood"
        sx={{
          height: 48,
        }}
      >
        <MenuItem value="happy">😊 Happy</MenuItem>
        <MenuItem value="neutral">😐 Neutral</MenuItem>
        <MenuItem value="sad">😢 Sad</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SelectMood;
