import { Link } from "react-router-dom";
//import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

import LoginImg from "../../../assets/pixel.png";
import "./Login.scss";
import { TextField } from "@material-ui/core";
import { useState } from "react";

const Login = () => {
  let history = useHistory();

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");

  const firstNameHandler = (e) => {
    setfirstName(e.target.value);
    //localStorage.setItem("firstName", e.target.value);
  };

  const lastNameHandler = (e) => {
    setlastName(e.target.value);
    //localStorage.setItem("lastName", e.target.value);
  };

  const loginOnClickHandler = () => {
    if (firstName.length > 0 && lastName.length > 0) {
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      history.push("/todo");
    } else {
      alert("Please fill the required fields");
    }
  };

  const enterHandler = (e) => {
    e.keyCode === 13 && loginOnClickHandler();
  };

  return (
    <div className="container">
      <div className="loginCardContainer">
        <div className="loginFormContainer">
          <div className="header"></div>
          <div className="inputTitle"></div>
          <div className="input">
            <TextField
              onChange={firstNameHandler}
              onKeyDown={enterHandler}
              value={firstName}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="First Name"
              name="firtName"
              autoComplete="first name"
              autoFocus
            />
          </div>
          <div className="inputTitle"></div>
          <div className="input">
            <TextField
              onChange={lastNameHandler}
              onKeyDown={enterHandler}
              value={lastName}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Last Name"
              name="firtName"
              autoComplete="first name"
            />
          </div>

          <Button
            variant="contained"
            color="primary"
            onClick={loginOnClickHandler}
          >
            Login
          </Button>
        </div>
      </div>
      <img className="cardImg" alt="login-img" src={LoginImg}></img>
    </div>
  );
};
export default Login;
