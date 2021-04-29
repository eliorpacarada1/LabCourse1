import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Footer } from "../../components/Footers";
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Container, } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export const Home = () => {
  const classes = useStyles();
  
  return (
    <div>
      <Container component="main" maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item lg={6}>
            <h1>Parking Management System</h1>
            <h2>Park your vehicle quick</h2>
            <Typography>
              Rent your place for parking and make your city traffic free.{" "}
              <br></br>
              The best parking app to save your time and help to earn money.
              <br></br>
              Enter easily with your mobile parking pass
            </Typography>
          </Grid>
          <Grid item lg={6}>
            <img src='images/logo.jpg' style={{ maxWidth: "100%" }} alt="logo" />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item lg={6}>
            <img src='images/logo2.jpg' style={{ maxWidth: "100%" }} alt="logo2" />
          </Grid>
          <Grid item lg={6}>
            <h1>Reserve & Save Time</h1>
            <h2>Book your Parking online with our System</h2>
            <Typography>
              Book a space in just a few easy clicks and don't waste your time!
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item lg={6}>
            <h1>Discover Amazing Spaces</h1>
            <h2>Find parking anywhere, for now or for later</h2>
            <Typography>
              Compare prices & pick the place that’s best for you!
            </Typography>
          </Grid>
          <Grid item lg={6}>
            <img src="images/logo3.jpg" style={{ maxWidth: "100%" }} alt="logo3" />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item lg={4}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Parking"
                  height="140"
                  image='images/logo5.jpg'
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    No-Surprise Pricing
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Compare prices, see your total cost up-front, and save up to
                    50%.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item lg={4}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Parking"
                  height="150"
                  image='images/logo4.jpg'
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Lightning-Fast Parking
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Park your car in seconds and go do your thing fast with one
                    click.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item lg={4}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Parking"
                  height="150"
                  image='images/logo6.jpg'
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Hassle-Free Booking
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Reserve a space with a few taps and skip the parking hunt.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};
