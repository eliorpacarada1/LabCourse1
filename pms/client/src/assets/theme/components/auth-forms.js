import { makeStyles } from '@material-ui/core';

const componentStyles = makeStyles((theme) => ({
    main: {      
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative'
    },
    grid1:{
      width: '50%'
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1)
    },
    lblBirthdate: {
      paddingTop: '20%'
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    submitStyle: {
      margin: theme.spacing(1, 0 ,2)

    },
    linkStyle: {
      position: 'relative',
      top : '10px'
    },
    buttons: {
      backgroundColor: '#1171EF',
      '&:hover': {
        backgroundColor: '#118DEF'
      }
    }
  }))

  export default componentStyles;
