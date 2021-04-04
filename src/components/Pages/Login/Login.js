import { Link } from "react-router-dom";
//import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

import LoginImg from "../../../assets/pixel.png";
import "./Login.scss";
const Login = () => {
  let history = useHistory();
  const firstNameHandler = (e) => {
    localStorage.setItem("firstName", e.target.value);
  };
  const lastNameHandler = (e) => {
    localStorage.setItem("lastName", e.target.value);
  };
  const enterHandler = (e) => {
    e.keyCode === 13 && history.push("/todo");
  };
  return (
    <div className="container">
      <div className="loginCardContainer">
        <div className="loginFormContainer">
          <div className="header"></div>
          <div className="inputTitle"></div>
          <div className="input">
            <input placeholder="First Name" onChange={firstNameHandler}></input>
          </div>
          <div className="inputTitle"></div>
          <div className="input">
            <input
              placeholder="Last Name"
              onChange={lastNameHandler}
              onKeyDown={enterHandler}
            ></input>
          </div>

          <Button variant="contained" color="primary">
            <Link
              to="/todo"
              className="loginButton"
              style={{ textDecoration: "none", color: "white" }}
            >
              Login
            </Link>
          </Button>
        </div>
      </div>
      <img className="cardImg" alt="login-img" src={LoginImg}></img>
    </div>
  );
};
export default Login;
