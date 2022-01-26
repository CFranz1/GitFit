import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/header";
import {
  LogInPage,
  Register,
} from "./components/Login_Register/Login_RegisterPages";
import { Routines, MyRoutines } from "./components/Routines/Routines";
import { HomePage } from "./components/HomePage/HomePage";
import { Activities } from "./components/Activities/Activities";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ id: "", username: "" });
  const [userToken, setUserToken] = useState("");

  //tries to pull token and user info set token and user info
  useEffect(() => {
    let retrivedUser = localStorage.getItem("user");
    if (retrivedUser) {
      const userObj1 = JSON.parse(retrivedUser);
      setUserInfo(userObj1);
    }
    let retrivedToken = localStorage.getItem("token");
    if (retrivedToken) {
      const userObj2 = JSON.parse(retrivedToken);
      setUserToken(userObj2);
    }
    console.log("retrived user in useEffect");
    console.log(retrivedUser);
    if (retrivedUser && retrivedToken) setIsLoggedIn(true);
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setUserInfo={setUserInfo}
          setUserToken={setUserToken}
        />
        <Routes>
          {/* make homepage idk what we want */}
          <Route path="/Home" element={<HomePage />} />
          <Route
            path="/Routines"
            element={
              <Routines
                userInfo={userInfo}
                isLoggedIn={isLoggedIn}
                userToken={userToken}
              />
            }
          />
          <Route
            path="/MyRoutines"
            element={
              <MyRoutines
                userInfo={userInfo}
                isLoggedIn={isLoggedIn}
                userToken={userToken}
              />
            }
          />
          <Route
            path="/Activities"
            element={
              <Activities isLoggedIn={isLoggedIn} userToken={userToken} />
            }
          />
          <Route
            path="/Login"
            element={
              <LogInPage
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setUserInfo={setUserInfo}
                setUserToken={setUserToken}
              />
            }
          />
          <Route
            path="/Register"
            element={
              <Register
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setUserInfo={setUserInfo}
                setUserToken={setUserToken}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
const app = document.getElementById("app");
ReactDOM.render(<App />, app);
