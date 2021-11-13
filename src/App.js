import logo from "./logo.svg";
import "./App.css";
import Routes from "./Routes/routes";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Navbar";
import allActions from "./Actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(allActions.loginActions.loadUser());
  }, []);
  return (
    <div>
      <Router>
        <Navbar />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
