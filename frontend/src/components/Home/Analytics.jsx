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
      <Grid size={{ xs: 12, lg: 6, xl: 4 }}>
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
            This chart displays the total expense trend for the last six months.
          </Typography>
          <SixMonthsExpenseChart />
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, lg: 6, xl: 4 }}>
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
            This chart displays the average expense for each payment method over
            the last six months.
          </Typography>
          <SixMonthsPaymentChart />
        </Paper>
      </Grid>
    </Grid>
  );
}
