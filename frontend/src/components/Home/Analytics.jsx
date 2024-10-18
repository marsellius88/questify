import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import SixMonthsExpenseChart from "./SixMonthsExpenseChart";
import SixMonthsPaymentChart from "./SixMonthsPaymentChart";
import OneMonthExpenseChart from "./OneMonthExpenseChart";

export default function Analytics() {
  const today = new Date();

  return (
    <Grid container spacing={2}>
      {/* <Grid size={12}>
        <Typography
          variant="h2"
          component="h2"
          sx={{ marginTop: 5, marginBottom: 0.5 }}
        >
          Expense
        </Typography>
        <Typography variant="body1" component="p" sx={{ marginBottom: 2 }}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque,
          voluptatem aperiam odio cum cumque, quaerat reiciendis impedit eos
          neque officiis sapiente ratione, doloribus sunt. Pariatur, commodi
          laudantium beatae deleniti nihil quam aut doloribus cumque mollitia in
          vero expedita perspiciatis excepturi.
        </Typography>
      </Grid> */}
      <Grid size={6}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography
            variant="h2"
            component="h2"
            color="#333"
            sx={{ marginBottom: 1 }}
          >
            Total Expense
          </Typography>
          <Typography
            variant="body1"
            component="p"
            color="#888"
            sx={{ marginBottom: 1 }}
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque,
            voluptatem aperiam odio cum cumque.
          </Typography>
          <SixMonthsExpenseChart />
        </Paper>
      </Grid>
      <Grid size={6}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography
            variant="h2"
            component="h2"
            color="#333"
            sx={{ marginBottom: 1 }}
          >
            Payment Methods
          </Typography>
          <Typography
            variant="body1"
            component="p"
            color="#888"
            sx={{ marginBottom: 1 }}
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque,
            voluptatem aperiam odio cum cumque.
          </Typography>
          <SixMonthsPaymentChart />
        </Paper>
      </Grid>
    </Grid>
  );
}
