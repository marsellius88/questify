import * as React from "react";
import dayjs from "dayjs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function SummaryExpenseTable({ expenses }) {
  const rows = expenses;

  return (
    <>
      {rows?.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "25%" }}>Item Name</TableCell>
                <TableCell sx={{ width: "25%" }}>Platform</TableCell>
                <TableCell sx={{ width: "10%" }}>Payment</TableCell>
                <TableCell sx={{ width: "15%" }} align="right">
                  Price
                </TableCell>
                <TableCell sx={{ width: "10%" }} align="right">
                  Amount
                </TableCell>
                <TableCell sx={{ width: "20%" }} align="right">
                  Total Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.platform}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.payment}
                  </TableCell>
                  <TableCell align="right">
                    Rp {row.price.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">
                    Rp {(row.amount * row.price).toLocaleString("id-ID")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" align="center">
          Tidak ada data
        </Typography>
      )}
    </>
  );
}
