import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function SelectPayment({ selectedValue, setSelectedValue }) {
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
      <InputLabel id="select-payment-label">Payment</InputLabel>
      <Select
        labelId="select-payment-label"
        id="select-payment"
        value={selectedValue}
        onChange={setSelectedValue}
        label="Payment"
        required
        sx={{
          height: 48,
        }}
      >
        <MenuItem value="Cash">Cash</MenuItem>
        <MenuItem value="BCA">BCA</MenuItem>
        <MenuItem value="Gopay">Gopay</MenuItem>
        <MenuItem value="ShopeePay">ShopeePay</MenuItem>
        <MenuItem value="OVO">OVO</MenuItem>
        <MenuItem value="Dana">Dana</MenuItem>
        <MenuItem value="Lainnya">Lainnya</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SelectPayment;
