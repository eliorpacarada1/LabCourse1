import React from "react";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Box, Card, CardContent, CardHeader, Container, Grid, Typography} from "@material-ui/core";
// @material-ui/icons components
import componentStyles from "../../assets/theme/views/admin/dashboard.js";
import { chartOptions, parseOptions, chartExample1, chartExample2 } from "../../variables/charts.js";
import theme from '../../assets/theme/theme.js';
import {Header} from "../../components/Headers";
import NavbarDropdown from '../../components/Dropdowns/NavbarDropdown.js';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(componentStyles);

export const Dashboard = () => {
  const classes = useStyles();
  //const [activeNav, setActiveNav] = React.useState(1);
  const chartExample1Data = "data2";

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  /*const toggleNavs = (index) => {
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };*/
  return (localStorage.getItem("token") !== null && localStorage.getItem("Role") == "Administrator") ? (
    <>
    <div style={{position:"absolute", right: 16, top: 8, zIndex: 1, height: "100px"}}>
    <NavbarDropdown/> 
    </div>
      <Header />
      {/* Page content */}
      <Container position = "relative"
        maxWidth={false}
        component={Box}
        marginTop="-6rem"
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
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
}

