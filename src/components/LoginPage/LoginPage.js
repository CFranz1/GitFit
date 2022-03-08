import { useNavigate } from "react-router-dom";
import { logInUser } from "../AjaxHelpers/AjaxHelpers.js";
import classes from "./LoginPage.module.css";
import TextField from "../../ui/TextField/TextField.js"
import Button from "../../ui/button/Button";

export let LogInPage = (props) => {
  const { setUserToken, setUserInfo, setIsLoggedIn } = props;
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    let user = {};
    user["username"] = document.getElementById("Username").value;
    user["password"] = document.getElementById("Password").value;
    if (!user.password || !user.username)
      return alert("Password and Username must be submitted!");
    let response = await logInUser(user);
    if (response.error) {
      alert(response.error);
      return;
    } else {
      setUserToken(response.token);
      setUserInfo(response.user);
      alert(response.message);
      setIsLoggedIn(true);

      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", JSON.stringify(response.token));
      navigate(`/Home`);
      return;
    }
  }
  function handleRegister(e){
    e.preventDefault();
    navigate(`/Register`);
    return
  }
  return (
    <div className={classes.LoginPage}>
      <form className={classes.LoginForm}>
        <h1>Login</h1>
        <TextField type='text' id='Username' placeholder='Username'></TextField>
        <TextField type='password' placeholder='Password' id="Password"></TextField>
        <Button onClickHandler={handleSubmit} >Sign in</Button>
        <Button onClickHandler={handleRegister}>Don't Have an account?</Button>
      </form>
    </div>
  );
};