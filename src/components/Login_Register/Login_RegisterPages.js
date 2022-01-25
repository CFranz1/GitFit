import { token } from "morgan";
import {Link, useNavigate} from "react-router-dom"
import { logInUser, registerUser } from "../AjaxHelpers/AjaxHelpers.js"
export let LogInPage = (props) => {
    const {setUserToken , setUserInfo, setIsLoggedIn} = props;
    const navigate = useNavigate();
    async function handleSubmit(e){
        e.preventDefault();
        let user ={};
        user['username'] = document.getElementById('User-Name').value
        user['password'] = document.getElementById('Password').value
        if (!user.password || !user.username)
            return alert('Password and Username must be submitted!');
        let response = await logInUser(user);
        if (response.error){
            alert(response.error);
            return
        }
        else{
            setUserToken(response.token);
            setUserInfo(response.user);
            alert(response.message);
            setIsLoggedIn(true);
            
            // localStorage.setItem("user", JSON.stringify(response.user));
            // localStorage.setItem("token", JSON.stringify(response.token));
            navigate('/Home');
            return
        }
    }
    return (
        <div id='Login-Page'>
            <form id='Login-Form'>
                <h1>Login</h1>
                <input type='text' id='User-Name' placeholder="Username"></input>
                <input type='password' placeholder="Password" id='Password'></input>
                <button onClick={handleSubmit} type='submit' >Sign in</button>
                <Link to="/Register">Don't have an account?</Link>
            </form>
            
        </div>
    )
}

export let Register = (props) => {
    const {setUserToken , setUserInfo, setIsLoggedIn} = props;
    const navigate = useNavigate();
    async function handleSubmit(e){
        e.preventDefault();
        let user={};
        let username = document.getElementById('User-Name').value;
        let password = document.getElementById('Password').value;
        let passwordConfirm = document.getElementById('PasswordConfirm').value;
        if (!password || !username)
            return alert('Password and Username must be submitted!')
        if (password != passwordConfirm)
            return alert('Password must match Password Confirmation!')        
        user['username']=username;
        user['password']=password;
        let response = await registerUser(user);
        if (response.error){
            return alert(response.error)
        }
        else{
            alert(`Stock up on protein powder beacuse your account has been created sucessfully created! Welcome to GIT FIT ${username}!`)
            setUserToken(response.success);
            setUserInfo(user);
            setIsLoggedIn(true);
            navigate('/Home');
        }
    }
    return (
        <div id='Login-Container'>
            <form id='Login-Form'>
                <h1>Register a New Account</h1>
                <input type='text' id='User-Name' placeholder="Username"></input>
                <input type='password' placeholder="Password" id='Password'></input>
                <input type='password' placeholder="Password Confirmation" id='PasswordConfirm'></input>
                <button onClick={handleSubmit} type='submit' >Submit</button>
                <Link to="/Login">Already have an account?</Link>
            </form>
        </div>
    )
}