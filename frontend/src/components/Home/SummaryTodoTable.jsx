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
import Checkbox from "@mui/material/Checkbox";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import StarIcon from "@mui/icons-material/Star";

export default function SummaryTodoTable({ todos }) {
  const rows = todos;

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
                      {row.done ? (
                        <CheckBoxIcon sx={{ color: "green" }} />
                      ) : (
                        ""
                      )}
                    </TableCell>
                    <TableCell>
                      {row.priority ? (
                        <StarIcon sx={{ color: "#ffc300" }} />
                      ) : (
                        ""
                      )}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.due
                        ? new Date(row.due).toLocaleDateString("en-GB")
                        : "-"}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.note
                        ? row.note.length > 30
                          ? `${row.note.substring(0, 30)}...`
                          : row.note
                        : "-"}
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
