import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Pages/Login/Login";
import Todo from "./components/Pages/Todo/Todo";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route path="/todo">
              <Todo />
            </Route>
            <Route exact path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
