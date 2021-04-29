import theme from '../theme.js'

const componentStyles = () => ({
  grow: {
    flexGrow: 1,
    marginBottom: '15px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  header: {
    background:
      "linear-gradient(87deg, #11A8EF, #1171ef)",
  },  
});

export default componentStyles;
