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

function createData(id, date, dailyTotal) {
  return {
    id,
    date,
    dailyTotal,
    dateItem: [
      {
        name: "Nasi Dada",
        platform: "Olive Fried Chicken",
        payment: "BCA",
        price: 15000,
        amount: 2,
      },
      {
        name: "Roti Tawar Sari Roti 15 Slice",
        platform: "Laras Minimarket",
        payment: "BCA",
        price: 18000,
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row, index } = props;
  const [open, setOpen] = React.useState(false);

  const labelId = `enhanced-table-checkbox-${index}`;

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
        <TableCell component="th" id={labelId} scope="row" padding="none">
          {row.date}
        </TableCell>
        <TableCell align="right">{row.dailyTotal.toLocaleString('id-ID')}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {row.name}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Item Name</TableCell>
                    <TableCell>Platform</TableCell>
                    <TableCell>Payment</TableCell>
                    <TableCell align="right">Price (Rp)</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price (Rp)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.dateItem.map((dateItemRow) => (
                    <TableRow key={dateItemRow.name}>
                      <TableCell component="th" scope="row">
                        {dateItemRow.name}
                      </TableCell>
                      <TableCell>{dateItemRow.platform}</TableCell>
                      <TableCell>{dateItemRow.payment}</TableCell>
                      <TableCell align="right">{dateItemRow.price.toLocaleString('id-ID')}</TableCell>
                      <TableCell align="right">{dateItemRow.amount}</TableCell>
                      <TableCell align="right">
                        {(dateItemRow.amount * dateItemRow.price).toLocaleString('id-ID')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    date: PropTypes.string.isRequired,
    dailyTotal: PropTypes.number.isRequired,
    dateItem: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        platform: PropTypes.string.isRequired,
        payment: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

const rows = [
  createData(1, "01-10-2024", 10000),
  createData(2, "02-10-2024", 20000),
  createData(3, "03-10-2024", 50000),
  createData(4, "04-10-2024", 30000),
  createData(5, "05-10-2024", 100000),
];

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
        <TableCell />
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

export default function ExpenseTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [dense, setDense] = React.useState(false);

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
