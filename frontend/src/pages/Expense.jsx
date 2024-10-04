import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import ExpenseTable from "../components/Expense/ExpenseTable";
import SelectedMonthYear from "../components/SelectMonthYear";

export default function Expense() {
  return (
    <Box>
      <Typography variant="h1" component="h1" sx={{ marginY: 1 }}>
        Expense
      </Typography>
      <Typography variant="body1" component="p" sx={{ marginBottom: 2.5 }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque,
        voluptatem aperiam odio cum cumque, quaerat reiciendis impedit eos neque
        officiis sapiente ratione, doloribus sunt. Pariatur, commodi laudantium
        beatae deleniti nihil quam aut doloribus cumque mollitia in vero
        expedita perspiciatis excepturi.
      </Typography>
      <Divider />
      <Box sx={{ marginTop: 2.5 }}>
        <SelectedMonthYear />
        <ExpenseTable />
      </Box>
    </Box>
  );
}
