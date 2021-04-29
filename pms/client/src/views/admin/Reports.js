import React from 'react';
import Chart from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { Container, Card, CardHeader, Grid, Box, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import componentStyles from "../../assets/theme/views/admin/dashboard.js";
import { chartOptions, parseOptions, chartExample1, chartExample2 } from "../../variables/charts.js";
import theme from '../../assets/theme/theme.js';
import {MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


const useStyles = makeStyles(componentStyles);

export const Reports = () => {
  const classes = useStyles();
 // const [activeNav, setActiveNav] = React.useState(1);
  const chartExample1Data = "data1";

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  /*const toggleNavs = (index) => {
    setActiveNav(index);
    setChartExample1Data("data" + index);
  }; */

  return (
    <>
      <Container
        maxWidth={false}
        component={Box}
        marginTop="2rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container spacing={6}>
          <Grid
            item
            lg={8}
            component={Box}
            marginBottom="3rem!important"
            classes={{ root: classes.gridItemRoot }}
          >
            <Card
              classes={{
                root: classes.cardRoot + " " + classes.cardRootBgGradient,
              }}
            >
              <CardHeader
                subheader={
                  <Grid
                    container
                    component={Box}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item xs="auto">
                      <Box
                        component={Typography}
                        variant="h6"
                        letterSpacing=".0625rem"
                        marginBottom=".25rem!important"
                        className={classes.textUppercase}
                      >
                        <Box component="span" color={theme.palette.gray[400]}>
                          Overview
                        </Box>
                      </Box>
                      <Box
                        component={Typography}
                        variant="h4"
                        marginBottom="0!important"
                      >
                        <Box component="span" color={theme.palette.white.main}>
                          Orders value
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs="auto">
                      <Box                           
                        alignSelf="flex-start"
                        alignContent="flex-end"                    
                      > <MuiPickersUtilsProvider utils={DateFnsUtils}  >
                        <KeyboardDatePicker
                          disableToolbar
                          style={{backgroundColor: "white", maxWidth: "160px", marginRight: "0.75rem", borderRadius: "5px"}}                       
                          inputVariant="filled"
                          format="dd/MM/yyyy"
                          margin="dense"
                          id="date-picker-start"
                          label="Starting date"
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          
                        />
                        <KeyboardDatePicker
                          disableToolbar
                          style={{backgroundColor: "white", maxWidth: "160px", borderRadius: "5px"}}                          
                          inputVariant="filled"
                          format="dd/MM/yyyy"
                          margin="dense"
                          id="date-picker-end"
                          label="Ending date"
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                        </MuiPickersUtilsProvider>
                      </Box>
                    </Grid>
                  </Grid>
                }
                classes={{ root: classes.cardHeaderRoot }}
              ></CardHeader>
              <CardContent>
                <Box position="relative" height="350px">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={4}>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                subheader="Orders by square"
                subheaderTypographyProps={{
                  component: Box,
                  variant: "h4",
                  marginTop: "1rem!important",
                  marginBottom: "1.25rem!important",
                  color: "initial",
                }}
              ></CardHeader>
              <CardContent>
                <Box position="relative" height="350px">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}