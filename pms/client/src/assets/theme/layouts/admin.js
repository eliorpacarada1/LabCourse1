import theme from '../theme.js';

const componentStyles = () => ({
  mainContent: {
    [theme.breakpoints.up("md")]: {
      marginLeft: "240px",
    },
  },
  containerRoot: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "39px",
      paddingRight: "39px",
    },
  },
});

export default componentStyles;
