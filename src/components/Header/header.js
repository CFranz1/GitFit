import {Navigate, NavLink , useNavigate } from "react-router-dom"


export let Header = (props) => {
    let {isLoggedIn, setIsLoggedIn, setUserInfo, setUserToken} = props
    let logoImage = require('./GIT_FIT2Resized.png');
    let activeStyle = {color: "#ffa72bee"};

    function Logout(e){
        e.preventdefault();
        setIsLoggedIn(false);
        setUserInfo({username:'' , password: ''});
        setUserToken('');
        Navigate('/Home');
    }


    return(
        <div id='Header-Container'>
            <div id="CompanyInfo">
                <h1 id='CompanySlogan'>GIT TOO FIT TO QUIT</h1>
                <img id='Logo' src={logoImage}></img>
            </div>
            <nav id='Tag-Links'>                
                <NavLink to='/Home' className="Header-Link" style={({isActive})=> isActive ? activeStyle : undefined}>Home</NavLink>
                <NavLink to='/Routines' className="Header-Link" style={({isActive})=> isActive ? activeStyle : undefined}>Routines</NavLink>
                {isLoggedIn? <NavLink to='/My Routines' className='Header-Link' style={({isActive})=> isActive ? activeStyle : undefined}>My Routines</NavLink> : null}
                {isLoggedIn? <NavLink to='/Home' className='Header-Link' onClick={Logout}>Logout</NavLink> : <NavLink to='/Login' className="Header-Link" style={({isActive})=> isActive ? activeStyle : undefined}>Login</NavLink> }
                {isLoggedIn? null : <NavLink to='/Register' className='Header-Link' style={({isActive})=> isActive ? activeStyle : undefined}>Register</NavLink>}
            </nav>
        </div>
    )
}