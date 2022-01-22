import { useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {Header} from './components/Header/header'
import {LogInPage,Register} from './components/Login_Register/Login_RegisterPages'



function App(){

    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const[userInfo, setUserInfo] = useState({username: "" , password: ""});
    const[userToken, setUserToken] = useState('');

    
    return(
        <div className='app'>
            <BrowserRouter>
                <Header
                isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
                setUserInfo={setUserInfo} setUserToken={setUserToken}
                />
                <Routes>
                    <Route path='/Login' element={<LogInPage
                     isLoggedIn={isLoggedIn} 
                     setIsLoggedIn={setIsLoggedIn}
                     setUserInfo={setUserInfo}
                     setUserToken={setUserToken}
                    />}/>
                    <Route path='/Register' element={<Register
                     isLoggedIn={isLoggedIn} 
                     setIsLoggedIn={setIsLoggedIn}
                     setUserInfo={setUserInfo}
                     setUserToken={setUserToken}
                    />}/>

                </Routes>
            </BrowserRouter>
        </div>
    )
   
}
const app = document.getElementById('app')
ReactDOM.render(<App />, app)