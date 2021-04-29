import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core'
import axios from 'axios'
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from "@material-ui/core/Snackbar";



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

export const AddressForm = () => {

    const classes1 = useStyles();

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertColor, setAlertColor] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(register)

        axios({
            method: "post",
            url: "/api/post",
            data: {
                userId: localStorage.getItem("Id"),
                name: register.name,
                city: register.city,
                latitude: register.latitude,
                longitude: register.longitude,
                section: register.section,
                price: register.price,
                free_spots: register.slots
            },
        }).then((res) => {
            setAlertMessage("Success")
            setAlertColor("success");
            setAlertOpen(true);
        }
        ).catch(err => {
            //alert(err.response.data.message)
            (err.response.data.message ?
                setAlertMessage(err.response.data.message) :
                setAlertMessage("One or more validation errors")
            )

            setAlertColor("error");
            setAlertOpen(true);
        })
    };
    const [register, setRegister] = useState({});

    const closeAlert = () => {
        setAlertOpen(false);
        setAlertMessage("");
    };


    const handleChange = (e) => {
        setRegister((prevData) => ({
            ...prevData,
            [e?.target?.id]: e.target.value,
        }))
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Add location
      </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="name"
                        name="firstName"
                        label="Company"
                        fullWidth
                        autoComplete="given-name"
                        onChange={handleChange}

                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="City"
                        label="City"
                        fullWidth
                        autoComplete="given-name"
                        onChange={handleChange}

                    />
                </Grid>

                <Grid item xs={12} >
                    <TextField
                        required
                        id="section"
                        name="City"
                        label="Section"
                        fullWidth
                        autoComplete="given-name"
                        onChange={handleChange}

                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="latitude"
                        name="address1"
                        label="Latitude"
                        fullWidth
                        autoComplete="shipping address-line1"
                        onChange={handleChange}

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="longitude"
                        name="address2"
                        label="Longitude"
                        fullWidth
                        autoComplete="shipping address-line2"
                        onChange={handleChange}

                    />
                </Grid>


                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="slots"
                        name="country"
                        label="Number of slots"
                        fullWidth
                        autoComplete="shipping country"
                        onChange={handleChange}

                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="price"
                        name="country"
                        label="Price per hour"
                        fullWidth
                        autoComplete="shipping country"
                        onChange={handleChange}

                    />
                </Grid>

                <Button variant="contained" color='primary' onClick={handleSubmit}> Add </Button>
                <div className={classes1.root}>
                    <Snackbar open={alertOpen} onClose={closeAlert}>
                        <Alert onClose={closeAlert} severity={alertColor}>
                            {alertMessage}
                        </Alert>
                    </Snackbar>
                </div>
            </Grid>
        </React.Fragment>
    );
}