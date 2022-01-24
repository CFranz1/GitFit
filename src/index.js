import { useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {Header} from './components/Header/header'
import {LogInPage,Register} from './components/Login_Register/Login_RegisterPages'
import {Routines} from './components/Routines/Routines'
import {HomePage} from './components/HomePage/HomePage'
import {Activities} from './components/Activities/Activities'



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
                    {/* make homepage idk what we want */}
                    <Route path='/Home' element={<HomePage
                    
                    />}/>
                    <Route path='/Routines' element={<Routines
                    
                    />}/>
                    <Route path='/Activities' element={<Activities
                    
                    />}/>
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