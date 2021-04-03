import { useState } from "react";
import "./Todo.scss";
const Todo = () => {
  let fName = localStorage.getItem("firstName");
  let lName = localStorage.getItem("lastName");
  const [todoCards, setTodoCards] = useState([
    [1, 2],
    [3, 4],
    [5, 6],
  ]);
  const [todoList, setTodoList] = useState([]);
  const [todoItem, setTodoItem] = useState("");
  const createHandler = () => {
    setTodoCards([...todoCards, []]);
  };
  const onChangeHandler = (e) => {
    setTodoItem(e.target.value);
    console.log(e.target.value);
  };
  const addTodo = (index) => {
    setTodoList([...todoList, todoItem]);
    //todoCards[index] = todoItem;

    setTodoItem("");
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
      {/* 
      <ul>
                {todo.length > 0 &&
                  todo.map((listItem, index) => (
                    <div key={index} className="cardContent">
                      <div className="cardTitle">
                        <input></input>
                      </div>
                      <input></input>
                      <li>{listItem}</li>
                    </div>
                  ))}
              </ul> */}
      <div className="cardContainer">
        {todoCards.length > 0 &&
          todoCards.map((todo, i) => (
            <div key={i} className="card">
              <div className="cardContent">
                <div className="cardTitle">
                  <input type="text"></input>
                </div>
                <input
                  type="text"
                  value={todoItem}
                  onChange={onChangeHandler}
                ></input>
                <button onClick={() => addTodo(i)}>add</button>
                {todo}
                {todoList.length > 0 &&
                  todoList.map((listItem, index) => (
                    <div key={index}>
                      <li
                        style={{
                          display: "flex",
                        }}
                      >
                        <input type="checkbox" />
                        <p>{listItem}</p>
                        <button></button>
                      </li>
                    </div>
                  ))}
              </div>
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
