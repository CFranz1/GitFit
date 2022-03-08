import { useNavigate } from "react-router-dom";
import { registerUser } from "../AjaxHelpers/AjaxHelpers.js";
import Button from "../../ui/button/Button.js";
import TextField from "../../ui/TextField/TextField.js"
import classes from "./RegisterPage.module.css"

export let Register = (props) => {
    const { setUserToken, setUserInfo, setIsLoggedIn } = props;
    const navigate = useNavigate();
    async function handleSubmit(e) {
      e.preventDefault();
      let user = {};
      let username = document.getElementById("Username").value;
      let password = document.getElementById("Password").value;
      let passwordConfirm = document.getElementById("PasswordConfirm").value;
      if (!password || !username)
        return alert("Password and Username must be submitted!");
      if (password != passwordConfirm)
        return alert("Password must match Password Confirmation!");
      user["username"] = username;
      user["password"] = password;
      let response = await registerUser(user);
      if (response.error) {
        return alert(response.error);
      } else {
        alert(
          `Stock up on protein powder beacuse your account has been created sucessfully created! Welcome to GIT FIT ${username}!`
        );
        setUserToken(response.success);
        setUserInfo(user);
        setIsLoggedIn(true);
        navigate("/Home");
      }
    }
    function handleLogin(e){
      e.preventDefault();
      navigate("/Login");
    }
    return (
      <div className={classes.RegisterPage}>
        <form className={classes.RegisterForm}>
          <h1>Register a New Account</h1>
          <TextField type='text' id='Username' placeholder='Username'></TextField>
          <TextField type='password' placeholder='Password' id="Password"></TextField>
          <TextField type='password' placeholder="Password Confirmation" id="PasswordConfirm"></TextField>
          <Button onClickHandler={handleSubmit}>Submit</Button>
          <Button onClickHandler={handleLogin}>Already have an account?</Button>
        </form>
      </div>
    );
  };