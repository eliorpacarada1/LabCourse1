import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@material-ui/core";
import { NavBar } from "../../components/Navbars";
import axios from 'axios'



const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 700
  },
  mainComponent: {
    width: "90%",
    marginLeft: "5%",
    marginBottom: "3rem"
  },
  title: {
    marginTop: "3rem",
    marginBottom: "1.5rem"
  },
});



export const MyReservations = () => {
  const [data, setData] = useState([]);
  const classes = useStyles();


  useEffect(() => {
    axios.post("https://localhost:5001/Reservations/Slots", {

      code: localStorage.getItem("Id")

    }, { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } }).then(res => {
      setData(res.data)
      console.log(res.data)
    })
  }, [])


  return (
    <div>
      <NavBar />
      <Typography
        className={classes.title}
        component="h1"
        variant="h4"
        align="center"
      >
        My Reservations
          </Typography>
      <TableContainer className={classes.mainComponent} component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">Order id</StyledTableCell>
              <StyledTableCell align="right">Car plates</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Start time</StyledTableCell>
              <StyledTableCell align="right">End time</StyledTableCell>
              <StyledTableCell align="right">Order date</StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((e) => (
              <StyledTableRow key={e.orderId}>
                <StyledTableCell align="right">{e.orderId}</StyledTableCell>
                <StyledTableCell component="th" align="right">
                  {e.carPlates}
                </StyledTableCell>
                <StyledTableCell align="right">{e.price}</StyledTableCell>
                <StyledTableCell align="right">{e.startTime}</StyledTableCell>
                <StyledTableCell align="right">{e.endTime}</StyledTableCell>
                <StyledTableCell align="right">{e.orderDate}</StyledTableCell>

              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
