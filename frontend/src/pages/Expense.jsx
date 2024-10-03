import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpenseTable from "../components/Expense/ExpenseTable";

export default function Expense() {
  return (
    <Box>
      <Typography variant="h1" component="h1" sx={{ marginY: 1 }}>
        Expense
      </Typography>
      <Typography variant="body1" component="p">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque,
        voluptatem aperiam odio cum cumque, quaerat reiciendis impedit eos neque
        officiis sapiente ratione, doloribus sunt. Pariatur, commodi laudantium
        beatae deleniti nihil quam aut doloribus cumque mollitia in vero
        expedita perspiciatis excepturi.
      </Typography>
      <Box sx={{ marginTop: 5 }}>
        <ExpenseTable />
      </Box>
    </Box>
  );
}
