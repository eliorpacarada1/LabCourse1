import { makeStyles } from '@material-ui/core/styles';

const componentStyles = makeStyles((theme) => ({
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    title: {
      marginBottom: "2rem",
      padding: "0.25rem",
      borderRadius: "5px",
      backgroundColor: "#e9ecef",
    },
    description: {    
      marginBottom: "1rem",
      marginTop: "1.5rem",
      padding: "0.2rem",
      borderRadius: "5px",
      backgroundColor: "#e9ecef",
    },
    container: {
      marginLeft: "0rem",
      [theme.breakpoints.up("md")]: {
       marginLeft: "1.25rem",
      },
    },
    dateTime: {
      width: "auto",
      [theme.breakpoints.up("md")]: {
       width: "190px",
      },
    },
  }));

  export default componentStyles;
  