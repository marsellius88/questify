import * as React from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";

import ExpenseModal from "../Expense/ExpenseModal";

export default function SummaryExpenseTable({ dailyRecord, setData }) {
  const rows = dailyRecord?.expense;

  const handleAddExpense = (newExpense) => {
    setData((prevData) =>
      prevData.map((record) =>
        record._id === newExpense.dailyRecordId
          ? { ...record, expense: [...record.expense, newExpense] }
          : record
      )
    );
  };

  const handleDeleteRow = async (rowId) => {
    try {
      const response = await axios.delete(`/api/expenses/${rowId}`);
      if (response.status === 200) {
        console.log("Expense deleted successfully:", response.data);

        setData((prevData) =>
          prevData
            .map((record) => ({
              ...record,
              expense: record.expense.filter(
                (expense) => expense._id !== rowId
              ),
            }))
            .filter(
              (record) => record.expense.length > 0 || record._id !== rowId
            )
        );
      } else {
        console.error("Failed to delete expense:", response.data);
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

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
                <TableCell sx={{ width: "15%" }} align="right">
                  Total Price
                </TableCell>
                <TableCell sx={{ width: "5%" }}></TableCell>
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
                  <TableCell>
                    <IconButton
                      aria-label="delete row"
                      size="small"
                      onClick={() => handleDeleteRow(row._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={6}>
                  <ExpenseModal
                    row={dailyRecord}
                    handleAddExpense={handleAddExpense}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell colSpan={6}>
                  <ExpenseModal
                    row={dailyRecord}
                    handleAddExpense={handleAddExpense}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
