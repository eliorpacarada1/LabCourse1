import React, { useEffect, useState } from "react";
import { Grid, TextField, Button, Container, CssBaseline, Typography, Avatar } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import componentStyles from "../../assets/theme/components/auth-forms";
import { Link } from "react-router-dom";
import axios from "axios";
import { NavBar } from '../../components/Navbars'
import { GoogleLogin } from 'react-google-login'
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

export const UserRegistration = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");

  const classes = componentStyles();
  const classes1 = useStyles();

  const [register, setRegister] = useState({});
  const [passwordColor, setPasswordColor] = useState("");
  const number = "+383"

  const handleChange = (e) => {
    setRegister((prevData) => ({
      ...prevData,
      [e?.target?.id]: e.target.value,
    }))
  }

  console.log(register.Birthdate)
  useEffect(() => {
    (register.ConfirmPassword ?
      ((register.Password === register.ConfirmPassword) ?
        setPasswordColor("primary") :
        setPasswordColor("secondary")) :
      setPasswordColor("secondary")
    )
  }, [register.Password, register.ConfirmPassword])


  const handleSubmit = (event) => {
    event.preventDefault()

    axios({
      method: "post",
      url: "/account/register",
      data: {
        Username: register.Username,
        Email: register.Email,
        Birthdate: register.Birthdate,
        Password: register.Password,
        FirstName: register.Firstname,
        LastName: register.Lastname,
        PhoneNumber: register.PhoneNumber
      },
    }).then((res) => {
      //alert(res.data.message);
      setAlertMessage(res.data.message)
      setAlertColor("success"); 
      setAlertOpen(true);      
    }
    ).catch(err => {
      //alert(err.response.data.message)
      (err.response.data.message ?
        setAlertMessage(err.response.data.message) :
        setAlertMessage("All the fields that contain * are required. They must be filled.")
      )
      
      setAlertColor("error"); 
      setAlertOpen(true);   
    })
  };

  const send = (data) => {
    axios.post("/account/Google", "\"" + data + "\"", { headers: { "Content-Type": "application/json" } }).then(response => {
      console.log(response.data.token)
      localStorage.setItem("token", response.data.token)
    }).catch(err => console.log(err))
  }

  const closeAlert = () => {
    setAlertOpen(false);
    setAlertMessage("");
  };

  return (
    <div>
      <NavBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.main}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form}>
            <Grid container spacing={2} justify="center">
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  id="Firstname"
                  type="text"
                  variant="outlined"
                  placeholder="Firstname..."
                  label="Firstname"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  id="Lastname"
                  type="text"
                  variant="outlined"
                  placeholder="Lastname..."
                  label="Lastname"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="Username"
                  type="text"
                  variant="outlined"
                  placeholder="Username..."
                  label="Username"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={3}>
                <Typography
                  className={classes.lblBirthdate}
                  color="textSecondary"
                  align="center"
                >
                  Birthdate
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  required
                  id="Birthdate"
                  type="date"
                  inputProps={{ min: "1920-01-01", max: "2010-01-01" }}
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="Email"
                  type="email"
                  variant="outlined"
                  placeholder="test@test.com"
                  label="Email address"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="Password"
                  type="password"
                  variant="outlined"
                  label="Password..."
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="ConfirmPassword"
                  type="password"
                  variant="outlined"
                  color={passwordColor}
                  label="Confirm Password..."
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="PhoneNumber"
                  label = "Phone Number"
                  placeholder = "+383 4x xxx xxx"
                  defaultValue = {number}
                  variant="outlined"
                  fullWidth
                  onChange = {handleChange}
                />
              </Grid>
              <Grid item xs="auto">
                <GoogleLogin
                  clientId="1090750243082-10veqe55mdq8bv5v59npd8fsrup6c3hd.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={e => send(e.tokenId)}
                // onFailure={responseGoogle}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className={classes.submit + " " + classes.buttons}
              startIcon={<LockOpenIcon color="secondary" />}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login" variant="body1">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <div className={classes1.root}>
        <Snackbar open={alertOpen} onClose={closeAlert}>
          <Alert onClose={closeAlert} severity={alertColor}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};
