import * as React from "react";
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
import TodoProgress from "./TodoProgress";
import EditIcon from "@mui/icons-material/Edit";
import JournalModal from "./JournalModal";

import { data } from "../../Data";

function createData(id, date, expense, todo, journal) {
  const dailyTotal = expense.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );
  // Menghitung persentase progress todo
  const completedTodos = todo.filter((item) => item.done).length;
  const totalTodos = todo.length;
  const todoPercentage =
    totalTodos > 0 ? (completedTodos * 100) / totalTodos : 0;
  // Menentukan icon mood
  let moodIcon;
  switch (journal.mood) {
    case "happy":
      moodIcon = "😊";
      break;
    case "neutral":
      moodIcon = "😐";
      break;
    case "sad":
      moodIcon = "😢";
      break;
    default:
      moodIcon = "-";
  }
  return {
    id,
    date,
    dailyTotal,
    todoPercentage,
    todo: todo,
    mood: moodIcon,
    journal: journal,
  };
}

function Row(props) {
  const { row, index } = props;

  const labelId = `enhanced-table-checkbox-${index}`;

  return (
    <React.Fragment>
      <TableRow hover tabIndex={-1} key={row.id}>
        <TableCell component="th" id={labelId} scope="row">
          {row.date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </TableCell>
        <TableCell align="right">
          {row.dailyTotal.toLocaleString("id-ID")}
        </TableCell>
        <TableCell>
          <TodoProgress progress={row.todoPercentage} />
        </TableCell>
        <TableCell>{row.mood}</TableCell>
        <TableCell align="right">
          <JournalModal row={row} />
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
    disablePadding: false,
    label: "Date",
  },
  {
    id: "total-expense",
    numeric: true,
    disablePadding: false,
    label: "Daily Total (Rp)",
  },
  {
    id: "todo-progress",
    numeric: false,
    disablePadding: true,
    label: "Todo",
  },
  {
    id: "mood",
    numeric: false,
    disablePadding: true,
    label: "Mood",
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
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default function JournalTable({ selectedMonth, selectedYear }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [dense, setDense] = React.useState(false);

  const rows = data
    .filter((item) => {
      const month = item.date.getMonth();
      const year = item.date.getFullYear();
      return month === selectedMonth && year === selectedYear;
    })
    .map((item, index) =>
      createData(index + 1, item.date, item.expense, item.todo, item.journal)
    );

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
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
              {visibleRows.map((row, index) => {
                return <Row key={row.date} row={row} index={index} />;
              })}
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
