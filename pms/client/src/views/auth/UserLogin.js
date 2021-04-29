import { useState, useEffect } from "react";
import { Grid, TextField, Button, Container, CssBaseline, Typography, Avatar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from "@material-ui/core";
import componentStyles from "../../assets/theme/components/auth-forms";
import { Link } from "react-router-dom";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { NavBar } from "../../components/Navbars";
import { GoogleLogin } from "react-google-login";
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

export const UserLogin = (props) => {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [resetText, setResetText] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setResetText("");
  };

  const closeAlert = () => {
    setAlertOpen(false);
    setAlertMessage("");
  };

  const classes = componentStyles();
  const classes1 = useStyles();

  const [register, setRegister] = useState({});

  const handleChange = (e) => {
    setRegister((prevData) => ({
      ...prevData,
      [e?.target?.id]: e.target.value,
    }));
  };

  const [login, setLogin] = useState(false);

  useEffect(() => {
    return <Redirect to="/Home" />;
  }, [login]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios({
      method: "post",
      url: "/account/login",
      data: {
        Email: register.Email,
        Password: register.Password,
      },
    })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("Username", res.data.userName);
        localStorage.setItem("Id", res.data.id);
        localStorage.setItem("Role", res.data.role)
        setLogin(true);
      })
      .catch((err) => {

        (err.response.data.message ?
          setAlertMessage(err.response.data.message) :
          (err.response.data.errors.Email ?
            setAlertMessage(err.response.data.errors.Email) : setAlertMessage(err.response.data.errors.Password)))
        setAlertOpen(true);
      });
  };

  const handleResetRequest = (event) => {
    event.preventDefault();

    axios({
      method: "post",
      url: "/resetpassword/request",
      data: {
        Email: register.resetPasswordEmail,
      },
    }).then((res) => {
      setResetText(res.data);
    });
  };

  const send = (data) => {
    axios
      .post("/Account/Google", '"' + data + '"', {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        setLogin(true);
      })
      .catch((err) => console.log(err));
  };

  return localStorage.getItem("token") ? (
    props.location.state === undefined ? (
      localStorage.getItem("Role") === "Administrator" ?
        <Redirect to="/admin" /> : <Redirect to="/" />
    ) : (
      <Redirect to="/checkout" />
    )
  ) : (
    <div>
      <NavBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.main}>
          <Avatar className={classes.avatar}>
            <PersonPinIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <Grid container spacing={2} justify="center">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="Email"
                  type="text"
                  variant="outlined"
                  placeholder="Email..."
                  label="Email"
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
                  placeholder="Password..."
                  label="Password"
                  onChange={handleChange}
                />
                <Grid item xs={12}>
                  <div>
                    <Typography
                      color="primary"
                      onClick={handleClickOpen}
                      style={{ cursor: "pointer" }}
                    >
                      Forgot Password?
                    </Typography>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="form-dialog-title"
                    >
                      <DialogTitle id="form-dialog-title">
                        Reset Password
                      </DialogTitle>
                      {resetText === "" ? (
                        <div>
                          <DialogContent>
                            <DialogContentText>
                              To reset the password, please enter your email
                              address here, we will send a link to do it.
                            </DialogContentText>
                            <TextField
                              autoFocus
                              margin="dense"
                              id="resetPasswordEmail"
                              label="Email Address"
                              type="email"
                              fullWidth
                              onChange={handleChange}
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose} color="primary">
                              Cancel
                            </Button>
                            <Button
                              onClick={handleResetRequest}
                              color="primary"
                            >
                              Submit
                            </Button>
                          </DialogActions>
                        </div>
                      ) : (
                        <DialogContent>
                          <DialogContentText>{resetText}</DialogContentText>
                        </DialogContent>
                      )}
                    </Dialog>
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  className={classes.submitStyle + " " + classes.buttons}
                  startIcon={<LockOpenIcon color="secondary" />}
                >
                  Sign In
                </Button>
              </Grid>
              <Grid item xs="auto">
                <GoogleLogin
                  clientId="1090750243082-10veqe55mdq8bv5v59npd8fsrup6c3hd.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={(e) => send(e.tokenId)}
                  onFailure={(e) => console.log(e)}
                />
              </Grid>
            </Grid>
            <Grid container justify="flex-end">
              <Grid item>
                <Link
                  to="/register"
                  variant="body1"
                  className={classes.linkStyle}
                >
                  Don't have an account? Sign up!
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <div className={classes1.root}>
        <Snackbar open={alertOpen} onClose={closeAlert}>
          <Alert onClose={closeAlert} severity="error">
            {alertMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};
