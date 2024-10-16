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
import Checkbox from "@mui/material/Checkbox";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import DeleteIcon from "@mui/icons-material/Delete";

import TodoModal from "./TodoModal";

function createData(_id, date, todo) {
  return {
    _id,
    date,
    todo: todo,
  };
}

function Row(props) {
  const { row, handleDeleteRow, handleAddTodo, setTodos } = props;
  const [open, setOpen] = React.useState(false);

  const handleCheckboxChange = async (
    todoId,
    dailyRecordId,
    currentDoneStatus
  ) => {
    try {
      const response = await axios.put(`/api/todos/${todoId}`, {
        done: !currentDoneStatus,
      });
      if (response.status === 200) {
        setTodos((prevTodos) =>
          prevTodos.map((record) =>
            record._id === dailyRecordId
              ? {
                  ...record,
                  todo: record.todo.map((todo) =>
                    todo._id === todoId
                      ? { ...todo, done: !currentDoneStatus }
                      : todo
                  ),
                }
              : record
          )
        );
      }
    } catch (error) {
      console.error("Error updating todo status:", error);
    }
  };

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
          {`${row.todo.filter((item) => item.done).length}/${row.todo.length}`}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: "5%" }}></TableCell>
                    <TableCell sx={{ width: "30%" }}>Title</TableCell>
                    <TableCell sx={{ width: "20%" }}>Due Date</TableCell>
                    <TableCell sx={{ width: "40%" }}>Note</TableCell>
                    <TableCell sx={{ width: "5%" }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.todo.map((todoRow, todoIndex) => (
                    <TableRow key={todoRow.title}>
                      <TableCell>
                        <Checkbox
                          icon={<RadioButtonUncheckedIcon />}
                          checkedIcon={<RadioButtonCheckedIcon />}
                          checked={todoRow.done}
                          onChange={() =>
                            handleCheckboxChange(
                              todoRow._id,
                              row._id,
                              todoRow.done
                            )
                          }
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {todoRow.title}
                      </TableCell>
                      <TableCell>
                        {todoRow.due
                          ? new Date(todoRow.due).toLocaleDateString("en-GB")
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {todoRow.note
                          ? todoRow.note.length > 20
                            ? `${todoRow.note.substring(0, 20)}...`
                            : todoRow.note
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="delete row"
                          size="small"
                          onClick={() => handleDeleteRow(todoRow._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={5}>
                      <TodoModal row={row} handleAddTodo={handleAddTodo} />
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

// Row.propTypes = {
//   row: PropTypes.shape({
//     date: PropTypes.instanceOf(Date).isRequired,
//     todo: PropTypes.arrayOf(
//       PropTypes.shape({
//         title: PropTypes.string.isRequired,
//         due: PropTypes.instanceOf(Date),
//         note: PropTypes.string,
//       })
//     ).isRequired,
//   }).isRequired,
// };

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
    id: "todo-progress",
    numeric: true,
    disablePadding: false,
    label: "Progress",
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

export default function TodoTable({ todos, setTodos }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [dense, setDense] = React.useState(false);

  const rows = todos.map((item) => createData(item._id, item.date, item.todo));

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleAddTodo = (newTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((record) =>
        record._id === newTodo.dailyRecordId
          ? { ...record, todo: [...record.todo, newTodo] }
          : record
      )
    );
  };

  const handleDeleteRow = async (rowId) => {
    try {
      const response = await axios.delete(`/api/todos/${rowId}`);
      if (response.status === 200) {
        console.log("Todo deleted successfully:", response.data);

        setTodos((prevTodos) =>
          prevTodos
            .map((record) => ({
              ...record,
              todo: record.todo.filter((todo) => todo._id !== rowId),
            }))
            .filter((record) => record.todo.length > 0 || record._id !== rowId)
        );
      } else {
        console.error("Failed to delete todo:", response.data);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
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
              {visibleRows.map((row) => {
                return (
                  <Row
                    key={row._id}
                    row={row}
                    handleDeleteRow={handleDeleteRow}
                    handleAddTodo={handleAddTodo}
                    setTodos={setTodos}
                  />
                );
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
