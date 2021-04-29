import React, { useState } from 'react';
import { Grid,CssBaseline, Paper, Typography, TextField, Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom'
import componentStyles from '../../../assets/theme/components/checkout.js'
import axios from 'axios';
import moment from 'moment';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from '@material-ui/core/styles';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Checkout = (props) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");

  const classes = componentStyles();
  const classes1 = useStyles();

  const [datenTime, setDatenTime] = useState({ StartTime: moment().format("HH:MM")});

  const handleChange = (e) => {
    setDatenTime((prevData) => ({
      ...prevData,
      [e?.target?.id]: e.target.value,
    }))
  }  
  
  const handleReserve = (event) => {
    event.preventDefault();

    axios({
      method: "post",
      url: "https://localhost:5001/bookParking",
      data: {
        ParkingId: props.history.location.state.id,
        Price: props.history.location.state.price,
        UserId: localStorage.getItem("Id"),
        StartTime: datenTime.StartTime,
        EndTime: datenTime.EndTime,
        OrderDate: String(datenTime.Orderdate),
        CarPlates: String(datenTime.carplates)
      },
       headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } 
    }).then((res) => {
      //alert(res.data)
      setAlertMessage(res.data)
      setAlertColor("success"); 
      setAlertOpen(true); 

      window.location = "/"
    }).catch(err => {
      //console.log(err.response.data)
       (err.response.data.title ?
         setAlertMessage(err.response.data.title) :
         setAlertMessage(err.response.data)
       )      
       setAlertColor("error"); 
       setAlertOpen(true); 
    });
  } 
  
  const closeAlert = () => {
    setAlertOpen(false);
    setAlertMessage("");
  };

  return localStorage.getItem("token") !== null ? (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography
            className={classes.title}
            component="h1"
            variant="h4"
            align="center"
          >
            Parking Reservation
          </Typography>
          <form>
            <Grid className={classes.container} container spacing={3} >
              <Grid item xs={6}>
                <TextField
                  value={props.history.location.state.id}
                  label="Parking Id"
                  disabled
                ></TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={props.history.location.state.city}
                  label="City"
                  disabled
                ></TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={props.history.location.state.section}
                  label="Section"
                  disabled
                ></TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={props.history.location.state.price}
                  label="Price per hour in euros"
                  disabled
                ></TextField>
              </Grid>
              <Grid item xs="auto">
              <Typography
              className={classes.description}
              >
                Please fill all the fields below before reserving a parking spot!
              </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="StartTime"
                  label="Start Time"
                  type="time"
                  defaultValue={moment().format("HH:MM")}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="EndTime"
                  label="End Time"
                  type="time"
                  inputProps={{
                    min: datenTime.StartTime
                  }}
                  defaultValue={(moment().add(1, "hour")).format("HH:MM")}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="Orderdate"
                  type="date"
                  label="Select the date"
                  inputProps={{
                    min: moment().format("YYYY-MM-DD"),
                    max: "2022-01-01",
                  }}
                  defaultValue={moment().format("YYYY-MM-DD")}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="carplates"
                  label="Car Plates"
                  placeholder="0x-xxx-XX"
                  onChange={handleChange}
                ></TextField>
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  color="Primary"
                  variant="contained"
                  onClick={handleReserve}
                  onSubmit
                >
                  Reserve
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © Parking Management System"} {new Date().getFullYear()}
          {"."}
        </Typography>
      </main>
      <div className={classes1.root}>
        <Snackbar open={alertOpen} onClose={closeAlert}>
          <Alert onClose={closeAlert} severity={alertColor}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  );
}

export default Checkout;

