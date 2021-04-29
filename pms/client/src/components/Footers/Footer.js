import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export function Footer() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,    
      width: '100%',
      position: 'relative',
      bottom: 0,
      marginTop: '15px'
        
    },
    bgcolor: {
      background: "linear-gradient(93deg, #172b4d, #1358B4)",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
    <AppBar position="static" className={classes.bgcolor} >
      <Toolbar variant="dense">        
        <Typography variant="h6" className={classes.title}>         
        </Typography>
        <Typography variant="caption">
            Parking Managment System ©2021. All Rights Reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  </div>
  );
}