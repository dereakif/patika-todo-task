import { useState } from "react";
import "./Todo.scss";
const Todo = () => {
  let fName = localStorage.getItem("firstName");
  let lName = localStorage.getItem("lastName");
  const [todos, setTodos] = useState([
    ["asd", 2, 4, 5],
    ["d", 2, 4, 1, 111],
    [5],
  ]);
  const createHandler = () => {
    setTodos([...setTodos, todos]);
  };
  return (
    <div>
      <div className="userInfoContainer"></div>
      <div className="cardContainer">
        {todos.length > 0 &&
          todos.map((todo, i) => (
            <div key={i} className="card">
              <ul>
                {todo.map((listItem, index) => (
                  <li key={index}>{listItem}</li>
                ))}
              </ul>
              <div className="cardBody"></div>
            </div>
          ))}
        <div className="createCard card">
          <button onClick={createHandler}>CREATE</button>
        </div>
      </div>
    </div>
  );
};
export default Todo;
