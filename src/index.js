import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import{Header} from './components/Header/header'


function App(){

    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const[userInfo, setUserInfo] = useState({username: "" , password: ""});
    const[userToken, setUserToken] = useState('');

    
    return(
        <div className='app'>
            <Router>
                <Header
                
                />
            </Router>
        </div>
    )
   
}
const app = document.getElementById('app')
ReactDOM.render(<App />, app)