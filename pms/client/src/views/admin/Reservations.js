import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Pagination from "@material-ui/lab/Pagination";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
import { sortBy } from 'lodash'


import componentStyles from "../../assets/theme/views/admin/tables.js"
import { orders } from './data/Records'


const useStyles = makeStyles(componentStyles)

export const Reservations = () => {
  const classes = useStyles();




  const filterRecords = e => {
    setOrderz(orders.filter(o => o.name.toLowerCase().includes(e.target.value)));

  }


  const [orderz, setOrderz] = useState(orders);

  useEffect(() => {
    setOrderz(orders)
  }, [])



  const limit = 7;
  const [page, setPage] = useState(0);
  const [start, setStart] = useState(page);
  const [records, setRecords] = useState(limit);

  ///////// Page count ///////////
  let count = 0;
  if (orderz.length % limit === 0) count = orderz.length / limit;
  else count = parseInt(orderz.length / limit) + 1;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    setStart(limit * (newPage - 1));
    setRecords(limit * (newPage - 1) + limit);
  };
  /////// ////////////////////////

  //////////////////// SORT ///////////////////////

  const SORTS = {
    NONE: (list) => list,
    PRICE: (list) => sortBy(list, "price"),
    DATE: (list) => sortBy(list, "date").reverse(),
    CUSTOMER: (list) => sortBy(list, "customer"),
  };

  const [sort, setSort] = useState({
    sortKey: "NONE",
    isReverse: false,
  });

  const handleSort = (sortKey) => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;
    setSort({ sortKey, isReverse });
  };
  const sortFunction = SORTS[sort.sortKey];

  const sortedList = sort.isReverse
    ? sortFunction(orderz).reverse()
    : sortFunction(orderz);

  ///////////////////////////////////

  /// handle date change ///////
  const handleChangeDate = (e) => {
    var dt = e.target.value;
    if (dt === "") setOrderz(orders);

    console.log(dt)
    let nr = orders.filter((e) => new Date(e.orderDate).getTime() === new Date(dt).getTime());
    if (nr.length !== 0) {
      setOrderz(nr);
    }
  };

  const handleStatus = (e) => {
    var dt = e.target.value;
    if (dt === "10")
      setOrderz(orders.filter((e) => new Date(e.orderDate) < new Date()));
    else if (dt === "20")
      setOrderz(orders.filter((e) => new Date(e.orderDate) > new Date()));
  };
  //////////////////////////////

  ////// handle dialog //////////////
  // const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleCloseDialog = () => {
  //   setOpen(false);
  // };
  ///////////

  return (
    <>
      <Container
        maxWidth={false}
        component={Box}
        classes={{ root: classes.containerRoot }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          classes={{ root: classes.cardRoot + " " + classes.cardRootDark }}
          component={Card}
          height="5rem"
          borderRadius="5px"
        >
          <br />
          <Box
            display="flex"
            alignItems="center"
            width="70%"
            marginRight="1rem"
            classes={{
              root: classes.searchBox,
            }}
          >
            <Button className={classes.searchIcon}>
              <SearchIcon className={classes.searchIcon} />
            </Button>
            <InputBase
              placeholder="Search"
              classes={{
                input: classes.input,
              }}
              fontSize="3rem"
              onChange={filterRecords}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            width="30%"
          >
            <div>
              <InputLabel id="label">Status</InputLabel>
              <Select defaultValue="10" onChange={handleStatus}>
                <MenuItem value="10">Completed</MenuItem>
                <MenuItem value="20">Scheduled</MenuItem>
              </Select>
            </div>
            <form className={classes.container}>
              <TextField
                id="date"
                label="Choose Date"
                type="date"
                onChange={handleChangeDate}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </Box>
        </Box>
        <Box
          component={Card}
          classes={{ root: classes.cardRoot + " " + classes.cardRootDark }}
        >
          <TableContainer>
            <Box
              component={Table}
              alignItems="center"
              marginBottom="0!important"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Car plates
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Username
                  </TableCell>

                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Parking name

                  </TableCell>

                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Section
                  </TableCell>

                  <TableCell
                    style={{ cursor: "pointer" }}
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                    onClick={() => handleSort("PRICE")}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                    onClick={() => handleSort("CUSTOMER")}
                    style={{ cursor: "pointer" }}
                  >
                    Order id
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                    onClick={() => handleSort("DATE")}
                    style={{ cursor: "pointer" }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    Start time
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    End time
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              {sortedList.slice(start, records).map((e, key) => {
                return (
                  <TableBody key={key}>
                    <TableRow>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootBodyHead,
                        }}
                        component="th"
                        variant="head"
                        scope="row"
                      >
                        <Box alignItems="center" display="flex">
                          <Box display="flex" alignItems="flex-start">
                            <Box fontSize=".875rem" component="span">
                              {e.carPlates}
                            </Box>
                          </Box>
                        </Box>
                      </TableCell>


                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootBodyHead,
                        }}
                        component="th"
                        variant="head"
                        scope="row"
                      >
                        <Box alignItems="center" display="flex">
                          <Box display="flex" alignItems="flex-start">
                            <Box fontSize=".875rem" component="span">
                              {e.userName}
                            </Box>
                          </Box>
                        </Box>
                      </TableCell>


                      <TableCell classes={{ root: classes.tableCellRoot }}>
                        {e.name}

                      </TableCell>


                      <TableCell classes={{ root: classes.tableCellRoot }}>
                        {e.section}
                      </TableCell>

                      <TableCell align='right' classes={{ root: classes.tableCellRoot }}>
                        {Math.round(e.price * 100) / 100}€

                      </TableCell>



                      <TableCell classes={{ root: classes.tableCellRoot }}>
                        {new Date() < new Date(e.orderDate) ? (
                          <Box paddingTop=".35rem" paddingBottom=".35rem">
                            <Box
                              marginRight="10px"
                              component="i"
                              width=".375rem"
                              height=".375rem"
                              borderRadius="50%"
                              display="inline-block"
                              className={
                                classes.verticalAlignMiddle +
                                " " +
                                classes.bgGradientInfo
                              }
                            ></Box>
                            Scheduled
                          </Box>
                        ) : (
                          <Box paddingTop=".35rem" paddingBottom=".35rem">
                            <Box
                              marginRight="10px"
                              component="i"
                              width=".375rem"
                              height=".375rem"
                              borderRadius="50%"
                              display="inline-block"
                              className={
                                classes.verticalAlignMiddle +
                                " " +
                                classes.bgSuccess
                              }
                            ></Box>
                            Completed
                          </Box>
                        )}
                      </TableCell>

                      <TableCell classes={{ root: classes.tableCellRoot }}>
                        {e.orderId}

                      </TableCell>

                      <TableCell classes={{ root: classes.tableCellRoot }}>
                        {e.orderDate}

                      </TableCell>

                      <TableCell classes={{ root: classes.tableCellRoot }}>
                        {e.startTime}
                      </TableCell>

                      <TableCell classes={{ root: classes.tableCellRoot }}>
                        {e.endTime}

                      </TableCell>



                    </TableRow>
                  </TableBody>
                );
              })}
            </Box>
          </TableContainer>
          <Box
            classes={{ root: classes.cardActionsRoot }}
            component={CardActions}
            justifyContent="space-between"
          >
            {/* <Button
              style={{ color: "white", border: "1px solid white" }}
              onClick={handleClickOpen}
            >
              {" "}
              Add{" "}
            </Button>
            <Dialog
              open={open}
              onClose={handleCloseDialog}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Add reservation</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Book"
                  type="text"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Price"
                  type="text"
                  fullWidth
                />
                <InputLabel value="Date">Date </InputLabel>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  type="date"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Start time"
                  type="time"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Duration"
                  type="number"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="User"
                  type="text"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleCloseDialog} color="primary">
                  Add
                </Button>
              </DialogActions>
            </Dialog> */}
            <Pagination
              count={count}
              color="primary"
              variant="outlined"
              onChange={handlePageChange}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};