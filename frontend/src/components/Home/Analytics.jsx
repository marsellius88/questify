import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";

export default function Analytics() {
  const today = new Date();
  
  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        <Paper sx={{ padding: 2 }}>Tes</Paper>
      </Grid>
      <Grid size={4}>
        <Paper sx={{ padding: 2 }}>Tes</Paper>
      </Grid>
      <Grid size={4}>
        <Paper sx={{ padding: 2 }}>Tes</Paper>
      </Grid>
    </Grid>
  );
}
