import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header.js";
import { LogInPage } from "./components/LoginPage/LoginPage.js";
import { MyRoutinesPage } from "./components/MyRoutinesPage/MyRoutinesPage";
import { HomePage } from "./components/HomePage/HomePage";
import { Register } from "./components/RegisterPage/RegisterPage";
import { RoutinesPage } from "./components/RoutinesPage/RoutinesPage";
import { ActivitiesPage } from "./components/ActivitiesPage/ActivitiesPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ id: "", username: "" });
  const [userToken, setUserToken] = useState("");

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
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserInfo={setUserInfo} setUserToken={setUserToken} />
        <Routes>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Routines" element={<RoutinesPage userInfo={userInfo} isLoggedIn={isLoggedIn} userToken={userToken} />} />
          <Route path="/MyRoutines" element={<MyRoutinesPage userInfo={userInfo} isLoggedIn={isLoggedIn} userToken={userToken} />} />
          <Route path="/Activities" element={<ActivitiesPage isLoggedIn={isLoggedIn} userToken={userToken} />} />
          <Route path="/Login" element={<LogInPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserInfo={setUserInfo} setUserToken={setUserToken} />} />
          <Route path="/Register" element={<Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserInfo={setUserInfo} setUserToken={setUserToken} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
const app = document.getElementById("app");
ReactDOM.render(<App />, app);
