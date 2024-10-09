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
        sx={{
          height: 48,
        }}
      >
        <MenuItem value="cash">Cash</MenuItem>
        <MenuItem value="bca">BCA</MenuItem>
        <MenuItem value="gopay">Gopay</MenuItem>
        <MenuItem value="shopeepay">ShopeePay</MenuItem>
        <MenuItem value="ovo">OVO</MenuItem>
        <MenuItem value="dana">Dana</MenuItem>
        <MenuItem value="lainnya">Lainnya</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SelectPayment;
