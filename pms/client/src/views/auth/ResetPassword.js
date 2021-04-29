import React, { useState } from "react";
import { Grid, TextField, Button, Container, CssBaseline } from "@material-ui/core";
import componentStyles from "../../assets/theme/components/auth-forms";
import axios from 'axios'
import { NavBar } from '../../components/Navbars'


export const ResetPassword = props => {
  const classes = componentStyles();

  const [register, setRegister] = useState({})

  const handleChange = e => {
    setRegister(prevData => ({
      ...prevData,
      [e?.target?.id]: e.target.value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    axios({
      method: "post",
      url: "/ResetPassword" + window.location.href.slice(window.location.href.indexOf("?email")),
      data: {
        Password: register.Password,
        ConfirmPassword: register.ConfirmPassword,
      },
    }).then((res) => {
      console.log(res.data);
    });
  };

  return (
      <div>
        <NavBar />
        <Container component="main" maxWidth="xs" >
          <CssBaseline />                      
              <Grid container spacing={2}>
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
                  label="Confirm Password..."
                  onChange={handleChange}
                />
              </Grid>              
              <Grid item xs={12}> 
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="default"
                    onClick={handleSubmit}
                    className={classes.submitStyle}                   
                  >
                    Reset Password
              </Button>
                </Grid> 
              </Grid>            
        </Container>
      </div>
    )
};
