import React from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  MenuItem,
  Menu,
  IconButton,
} from "@material-ui/core";
import LocalParkingIcon from "@material-ui/icons/LocalParking";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import componentStyles from "../../assets/theme/components/navbar";
const useStyles = makeStyles(componentStyles);

export function NavBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu =
    localStorage.getItem("token") != null ? (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem>
        <AccountBoxIcon />
          <Typography varaint="body1">&nbsp;
            {localStorage.getItem("Username")}
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to="/edituser"
          >
            <Typography varaint="body1">Edit Profile</Typography>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to="/myreservations"
          >
            <Typography varaint="body1">My Reservations</Typography>
          </Link>
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            localStorage.removeItem("token");
            localStorage.removeItem("Username");
            localStorage.removeItem("Id");
            localStorage.removeItem("Role");
            handleMenuClose();           
          }
        }
        >
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to="/login"
          >
            <Typography varaint="body1">Sign out</Typography>
          </Link>
        </MenuItem>
      </Menu>
    ) : (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to="/login"
          >
            <Typography varaint="body1">Sign in</Typography>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to="/register"
          >
            <Typography variant="body1">Sign up</Typography>
          </Link>
        </MenuItem>
      </Menu>
    );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Link to="/" exact style={{ textDecoration: "none", color: "inherit" }}>
          <IconButton color="inherit">
            <HomeIcon />
          </IconButton>
          <Typography style={{ display: "inline" }}>Home</Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
        <Typography style={{ display: "inline" }}>User</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.header}>
        <Toolbar variant="dense">
          <Link  to="/"
              exact
              style={{ textDecoration: "none", color: "inherit" }}
            >
          <LocalParkingIcon color="secondary" /></Link>
          <Link  to="/"
              exact
              style={{ textDecoration: "none", color: "inherit" }}
            >
          <Typography style={{ marginLeft: "-4px" }} variant="h6">
            arkingManagmentSystem
          </Typography></Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link
              to="/"
              exact
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <IconButton color="inherit">
                <HomeIcon />
              </IconButton>
            </Link>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
