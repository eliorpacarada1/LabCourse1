import React, { useState, useEffect } from 'react';
import { NavBar } from '../../components/Navbars'
import { Grid, TextField, Button, Container, CssBaseline, Typography, Avatar } from "@material-ui/core";
import axios from "axios";
import FaceIcon from '@material-ui/icons/Face';
import componentStyles from "../../assets/theme/components/auth-forms";
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



export const EditUser = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const classes1 = useStyles();

  const classes = componentStyles();
  const [passwordColor, setPasswordColor] = useState("");
  const number = "+383"
  const [userData, setUserData] = useState({})

  ////// get user data < backend


  useEffect(()=>{
    axios.post("/Profile/EditProfile", "\"" + localStorage.getItem("Id") + "\"", { headers: { "Content-Type": "application/json" } })
    .then(res=>{
      setUserData(res.data)
      console.log(res.data)
    })
  },[])
  

  ///////////////////////////////////


  const [edit, setEdit] = useState({});

  const handleChange = (e) => {
    setEdit((prevData) => ({
      ...prevData,
      [e?.target?.id]: e.target.value,
    }))
  }

  useEffect(() => {
    (edit.ConfirmPassword ?
      ((edit.Password === edit.ConfirmPassword) ?
        setPasswordColor("primary") :
        setPasswordColor("secondary")) :
      setPasswordColor("secondary")
    )
  }, [edit.Password, edit.ConfirmPassword])


  const handleSubmit = (event) => {
    event.preventDefault()

    axios({
      method: "put",
      url: "/user/edit",
      data: {
        Id: localStorage.getItem("Id"),
        Username: edit.Username,
        Email: edit.Email,
        Birthdate: edit.Birthdate,
        Password: edit.Password,
        FirstName: edit.Firstname,
        LastName: edit.Lastname,
        PhoneNumber: edit.PhoneNumber,
      },
    }).then((res) => {
      setAlertMessage(res.data)
      setAlertColor("success"); 
      setAlertOpen(true);   
      //console.log(res.data);
    }).catch(err => {
      (err.response.data.message ?
        setAlertMessage(err.response.data.message) :
        setAlertMessage("You must change any of your data before confirm editing. ")
      )
       
      setAlertColor("error"); 
      setAlertOpen(true);   
    })
  };

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
            <FaceIcon color='primary' />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit User
          </Typography>
          <Typography component = "h6" variant = "h6" >
              Fill only the fields you want to change. 
              </Typography>
          <form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="Firstname"
                  type="text"
                  variant="outlined"
                  placeholder="Firstname..."
                  label={userData.firstName}
                  onChange = {handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="Lastname"
                  type="text"
                  variant="outlined"
                  placeholder="Lastname..."
                  label={userData.lastName}
                  onChange = {handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="Username"
                  type="text"
                  variant="outlined"
                  placeholder="Username..."
                  label={userData.userName}
                  onChange = {handleChange}
                />
              </Grid>
              <Grid item xs={3}>
                <Typography
                  className={classes.lblBirthdate}
                  color="textSecondary"
                  align="center"
                  onChange = {handleChange}
                >
                  Birthdate
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  id="Birthdate"
                  type="date"
                  variant="outlined"
                  onChange = {handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="Email"
                  type="email"
                  variant="outlined"
                  placeholder="test@test.com"
                  label={userData.email}
                  onChange = {handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="Password"
                  type="password"
                  variant="outlined"
                  label="Password..."
                  onChange = {handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="ConfirmPassword"
                  type="password"
                  variant="outlined"
                  label="Confirm Password..."
                  color={passwordColor}
                  onChange = {handleChange}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  style={{ width: "100%" }}
                  placeholder = "+383 4x xxx xxx"
                  defaultValue = {number}
                  label = "Phone Number"
                  onChange = {handleChange}

                />
              </Grid>
              <Typography variant="subtitle2" style={{ margin: "1px 0px 10px 10px" }}></Typography>
            </Grid>
            <Button onClick = {handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit + " " + classes.buttons}>
              Confirm Editing
            </Button>
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
  )
}