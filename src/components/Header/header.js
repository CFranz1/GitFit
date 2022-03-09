import { Navigate, NavLink } from "react-router-dom";
import classes from "./Header.module.css";


export let Header = (props) => {
  let { isLoggedIn, setIsLoggedIn, setUserInfo, setUserToken } = props;
  let logoImage = require("./GIT_FIT2Resized.png");
  let activeStyle = { color: "#ffa72bee" };

  function Logout(e) {
    e.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserInfo({ username: "", password: "" });
    setUserToken("");
    Navigate("/Home");
  }

  return (
    <div className={classes.HeaderContainer}>
      <div className={classes.CompanyInfo}>
        <h1 className={classes.CompanySlogan}>GIT TOO FIT TO QUIT</h1>
        <img className={classes.Logo} src={logoImage}></img>
      </div>
      <nav id="Tag-Links">
        <NavLink
          to="/Home"
          className={classes.HeaderLink}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Home
        </NavLink>
        <NavLink
          to="/Routines"
          className={classes.HeaderLink}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Routines
        </NavLink>
        {isLoggedIn ? (
          <NavLink
            to="/MyRoutines"
            className={classes.HeaderLink}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            My Routines
          </NavLink>
        ) : null}
        <NavLink
          to="/Activities"
          className={classes.HeaderLink}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Activities
        </NavLink>
        {isLoggedIn ? (
          <NavLink to="/Home" className={classes.HeaderLink} onClick={Logout}>
            Logout
          </NavLink>
        ) : (
          <NavLink
            to="/Login"
            className={classes.HeaderLink}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Login
          </NavLink>
        )}
        {isLoggedIn ? null : (
          <NavLink
            to="/Register"
            className={classes.HeaderLink}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Register
          </NavLink>
        )}
      </nav>
    </div>
  );
};
