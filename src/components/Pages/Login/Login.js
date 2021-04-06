import { Link } from "react-router-dom";
//import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

import LoginImg from "../../../assets/pixel.png";
import "./Login.scss";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";

const styles = {
  root: {
    borderColor: "white",
  },
  input: {
    color: "#310c40",
  },
};
const Login = (props) => {
  const { classes } = props;
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
            {firstName === "" ? (
              <TextField
                error
                required
                fullWidth
                label="First Name"
                value={firstName}
                onChange={firstNameHandler}
                variant="outlined"
                margin="normal"
                className={classes.root}
                InputProps={{
                  className: classes.input,
                }}
              />
            ) : (
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
                InputProps={{
                  className: classes.input,
                }}
              />
            )}
          </div>
          <div className="inputTitle"></div>
          <div className="input">
            {lastName === "" ? (
              <TextField
                error
                required
                fullWidth
                label="Last Name"
                value={lastName}
                onChange={lastNameHandler}
                variant="outlined"
                margin="normal"
                InputProps={{
                  className: classes.input,
                }}
              />
            ) : (
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
                InputProps={{
                  className: classes.input,
                }}
              />
            )}
          </div>

          <Button
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
export default withStyles(styles)(Login);
