import { useState } from "react";
import "./Todo.scss";
const Todo = () => {
  let fName = localStorage.getItem("firstName");
  let lName = localStorage.getItem("lastName");
  const [todos, setTodos] = useState([]);
  const createHandler = () => {
    setTodos([...todos, ["your next project", "asd", "125"]]);
    console.log(todos);
  };
  return (
    <div className="todoPageContainer">
      <div className="column">
        <div className="userInfoContainer">
          <div
            style={{
              height: " 100px",
              width: "100px",
              border: "1px solid black",
            }}
          ></div>
          <p>
            {fName} {lName}
          </p>
        </div>
      </div>

      <div className="cardContainer">
        {todos.length > 0 &&
          todos.map((todo, i) => (
            <div key={i} className="card">
              <ul>
                {todo.length > 0 &&
                  todo.map((listItem, index) => (
                    <li key={index}>{listItem}</li>
                  ))}
              </ul>
              <div className="cardBody"></div>
            </div>
          ))}
        <div className="createCard card">
          <h1>YOUR NEXT PROJECT</h1>
          <button onClick={createHandler}>CREATE</button>
        </div>
      </div>
    </div>
  );
};
export default Todo;
