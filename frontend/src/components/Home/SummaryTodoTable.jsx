import * as React from "react";
import axios from "axios";
import dayjs from "dayjs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

import TodoModal from "../Todo/TodoModal";

export default function SummaryTodoTable({ dailyRecord, setData }) {
  const rows = dailyRecord?.todo;

  const handleDoneCheckboxChange = async (
    todoId,
    dailyRecordId,
    currentDoneStatus
  ) => {
    try {
      const response = await axios.put(`/api/todos/${todoId}`, {
        done: !currentDoneStatus,
      });
      if (response.status === 200) {
        setData((prevData) =>
          prevData.map((record) =>
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

  const handlePriorityCheckboxChange = async (
    todoId,
    dailyRecordId,
    currentPriorityStatus
  ) => {
    try {
      const response = await axios.put(`/api/todos/${todoId}`, {
        priority: !currentPriorityStatus,
      });
      if (response.status === 200) {
        setData((prevData) =>
          prevData.map((record) =>
            record._id === dailyRecordId
              ? {
                  ...record,
                  todo: record.todo.map((todo) =>
                    todo._id === todoId
                      ? { ...todo, priority: !currentPriorityStatus }
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

  const handleAddTodo = (newTodo) => {
    setData((prevData) =>
      prevData.map((item) =>
        item._id === newTodo.dailyRecordId
          ? { ...item, todo: [...item.todo, newTodo] }
          : item
      )
    );
  };

  return (
    <>
      {rows?.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "5%" }}></TableCell>
                <TableCell sx={{ width: "5%" }}></TableCell>
                <TableCell sx={{ width: "25%" }}>Title</TableCell>
                <TableCell sx={{ width: "25%" }}>Due Date</TableCell>
                <TableCell sx={{ width: "40%" }}>Note</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .sort((a, b) => (b.priority === true) - (a.priority === true))
                .map((row) => (
                  <TableRow
                    key={row.title}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Checkbox
                        icon={
                          <CheckBoxOutlineBlankIcon sx={{ color: "grey" }} />
                        }
                        checkedIcon={<CheckBoxIcon sx={{ color: "green" }} />}
                        checked={row.done}
                        onChange={() =>
                          handleDoneCheckboxChange(
                            row._id,
                            dailyRecord._id,
                            row.done
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        icon={<StarBorderIcon />}
                        checkedIcon={<StarIcon sx={{ color: "#ffc300" }} />}
                        checked={row.priority}
                        onChange={() =>
                          handlePriorityCheckboxChange(
                            row._id,
                            dailyRecord._id,
                            row.priority
                          )
                        }
                      />
                    </TableCell>
                    {/* <TableCell>
                      {row.done ? <CheckBoxIcon sx={{ color: "green" }} /> : ""}
                    </TableCell>
                    <TableCell>
                      {row.priority ? (
                        <StarIcon sx={{ color: "#ffc300" }} />
                      ) : (
                        ""
                      )}
                    </TableCell> */}
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        textDecoration: row.done ? "line-through" : "none",
                        color: row.done ? "gray" : "inherit",
                      }}
                    >
                      {row.title}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        textDecoration: row.done ? "line-through" : "none",
                        color: row.done ? "gray" : "inherit",
                      }}
                    >
                      {row.due
                        ? new Date(row.due).toLocaleDateString("en-GB")
                        : "-"}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        textDecoration: row.done ? "line-through" : "none",
                        color: row.done ? "gray" : "inherit",
                      }}
                    >
                      {row.note
                        ? row.note.length > 30
                          ? `${row.note.substring(0, 30)}...`
                          : row.note
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              <TableRow>
                <TableCell colSpan={5}>
                  <TodoModal row={dailyRecord} handleAddTodo={handleAddTodo} />
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
                <TableCell colSpan={5}>
                  <TodoModal row={dailyRecord} handleAddTodo={handleAddTodo} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
