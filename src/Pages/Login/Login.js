import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

import LoginImg from "../../assets/pixel.png";
import "./Login.scss";
import { TextField } from "@material-ui/core";
import { useEffect, useState } from "react";

const Login = () => {
  let history = useHistory();

  const [firstName, setfirstName] = useState(undefined);
  const [lastName, setlastName] = useState(undefined);
  useEffect(() => {
    console.log(firstName, lastName);
  }, [firstName, lastName]);

  const firstNameHandler = (e) => {
    setfirstName(e.target.value);
  };

  const lastNameHandler = (e) => {
    setlastName(e.target.value);
  };

  const loginOnClickHandler = () => {
    if (
      firstName !== "" &&
      firstName !== undefined &&
      lastName !== "" &&
      lastName !== undefined
    ) {
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
              error={firstName === ""}
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
              inputProps={{
                style: {
                  fontWeight: "600",
                  fontSize: "24px",
                  textTransform: "capitalize",
                  color: "#113485e8",
                },
              }}
            />
          </div>
          <div className="inputTitle"></div>
          <div className="input">
            <TextField
              error={lastName === ""}
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
              inputProps={{
                style: {
                  fontWeight: "600",
                  fontSize: "24px",
                  textTransform: "capitalize",
                  color: "#113485e8",
                },
              }}
            />
          </div>

          <Button
            className="loginBtn"
            style={{ marginTop: "1rem" }}
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
