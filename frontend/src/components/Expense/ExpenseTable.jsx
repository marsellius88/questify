import * as React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { visuallyHidden } from "@mui/utils";

import DeleteIcon from "@mui/icons-material/Delete";

import ExpenseModal from "./ExpenseModal";

function createData(_id, date, expense) {
  const dailyTotal = expense.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );
  return {
    _id,
    date,
    dailyTotal,
    expense: expense,
  };
}

function Row(props) {
  const { row, handleDeleteRow, handleAddExpense } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow hover tabIndex={-1} key={row.id}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          {row.date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </TableCell>
        <TableCell align="right">
          {row.dailyTotal.toLocaleString("id-ID")}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* <Typography variant="h6" gutterBottom component="div">
                {row.name}
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: "20%" }}>Item Name</TableCell>
                    <TableCell sx={{ width: "20%" }}>Platform</TableCell>
                    <TableCell sx={{ width: "20%" }}>Payment</TableCell>
                    <TableCell sx={{ width: "15%" }} align="right">
                      Price (Rp)
                    </TableCell>
                    <TableCell sx={{ width: "10%" }} align="right">
                      Amount
                    </TableCell>
                    <TableCell sx={{ width: "15%" }} align="right">
                      Total price (Rp)
                    </TableCell>
                    <TableCell sx={{ width: "5%" }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.expense.map((expenseRow) => (
                    <TableRow key={expenseRow.name}>
                      <TableCell component="th" scope="row">
                        {expenseRow.name}
                      </TableCell>
                      <TableCell>{expenseRow.platform}</TableCell>
                      <TableCell>{expenseRow.payment}</TableCell>
                      <TableCell align="right">
                        {expenseRow.price.toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell align="right">{expenseRow.amount}</TableCell>
                      <TableCell align="right">
                        {(expenseRow.amount * expenseRow.price).toLocaleString(
                          "id-ID"
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="delete row"
                          size="small"
                          onClick={() => handleDeleteRow(expenseRow._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={7}>
                      <ExpenseModal
                        row={row}
                        handleAddExpense={handleAddExpense}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "date",
    numeric: false,
    disablePadding: true,
    label: "Date",
  },
  {
    id: "total-expense",
    numeric: true,
    disablePadding: false,
    label: "Daily Total (Rp)",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ width: "5%" }}></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default function ExpenseTable({ expenses, setExpenses }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [dense, setDense] = React.useState(false);

  const rows = expenses.map((item) =>
    createData(item._id, item.date, item.expense)
  );

  // console.log("expenses", expenses)
  // console.log("rows", rows)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleAddExpense = (newExpense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((record) =>
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

        setExpenses((prevExpenses) =>
          prevExpenses
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

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(() =>
    [...rows].sort(getComparator(order, orderBy))
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            stickyHeader
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "medium" : "small"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row) => (
                <Row
                  key={row._id}
                  row={row}
                  handleDeleteRow={handleDeleteRow}
                  handleAddExpense={handleAddExpense}
                />
              ))}
              {/* {visibleRows.map((row, index) => {
                return (
                  <Row
                    key={row._id}
                    row={row}
                    index={index}
                    handleDeleteRow={handleDeleteRow}
                  />
                );
              })} */}
              {/* {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Wide padding"
      />
    </Box>
  );
}
