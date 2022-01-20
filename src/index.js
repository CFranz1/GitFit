import React, { useState } from 'react'
import ReactDOM from 'react-dom'






function App(){

    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const[userInfo, setUserInfo] = useState({username: "" , password: ""});
    const[userToken, setUserToken] = useState('');

    
    return(
        <div>its ya app doing its thang</div>

    )
   
}
const app = document.getElementById('app')
ReactDOM.render(<App />, app)