import { useEffect, useState } from "react";
import "./Todo.scss";
const Todo = () => {
  let fName = localStorage.getItem("firstName");
  let lName = localStorage.getItem("lastName");
  const [todoCards, setTodoCards] = useState([]);
  const [todoItem, setTodoItem] = useState([]);
  //const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    console.log(todoCards, "cards", "useefect");
    console.log(todoItem, "todoItem useeffetc");
  }, [todoItem, todoCards]);
  const createHandler = () => {
    let cards = [...todoCards];
    let card = { todos: [] };
    setTodoCards([...cards, card]);
  };
  const onChangeHandler = (e, index) => {
    let itemList = [...todoItem];
    let item = todoItem[index];
    item = e.target.value;
    itemList[index] = item;
    setTodoItem(itemList);
  };
  const addTodo = (index) => {
    let cards = [...todoCards];
    let card;
    card = cards[index];

    let todo = todoItem[index];
    if (todo === undefined || todo === "") {
      alert("invalid");
    } else {
      let cardTodos = card.todos;
      cardTodos = [...cardTodos, { todo: todo, isChecked: false }];
      console.log(cardTodos, "cardtodos ın addtodo");
      card.todos = cardTodos;
      cards[index] = card;
      setTodoCards(cards);
      console.log(cards, "cards");
      let newTodoItems = [...todoItem];
      newTodoItems[index] = "";
      setTodoItem(newTodoItems);
      /*  console.log(card, "card in addtodo", card["todos"]);
      card.todos = [...card.todos, { todos: todo, isChecked: false }];
      cards[index] = card.todos;
      setTodoCards(cards);
      console.log(cards, "cards");
      let newTodoItems = [...todoItem];
      newTodoItems[index] = "";
      setTodoItem(newTodoItems); */
    }
  };
  const deleteHandler = (cardIndex, listItemIndex) => {
    let cards = [...todoCards];
    let card = cards[cardIndex];
    card.splice(listItemIndex, 1);
    cards[cardIndex] = card;
    //card.length === 0 && cards.splice(cardIndex, 1);
    setTodoCards(cards);
  };
  const closeHandler = (cardIndex) => {
    let cards = [...todoCards];
    cards.splice(cardIndex, 1);
    setTodoCards(cards);
  };
  const checkBoxHandler = () => {};
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
        {todoCards.length > 0 &&
          todoCards.map((todoCard, cardIndex) => (
            <div key={cardIndex} className="card">
              <div className="cardContent">
                <div
                  className="closeBtnCotainer"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <div
                    className="closeBtn"
                    style={{ cursor: "pointer", width: "max-content" }}
                    onClick={() => closeHandler(cardIndex)}
                  >
                    &#10006;
                  </div>
                </div>
                <div className="cardTitle">
                  <input type="text"></input>
                </div>
                <input
                  type="text"
                  value={todoItem[cardIndex]}
                  onChange={(e) => onChangeHandler(e, cardIndex)}
                ></input>
                <button onClick={() => addTodo(cardIndex)}>add</button>
                <div style={{ overflowY: "auto", height: "200px" }}>
                  {todoCard.todos.map((item, todoIndex) => (
                    <div
                      key={todoIndex}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <input
                        type="checkbox"
                        onClick={() => checkBoxHandler(cardIndex, todoIndex)}
                      />
                      <p>{item.todo}</p>
                      <button
                        onClick={() => deleteHandler(cardIndex, todoIndex)}
                        style={{ height: "max-content" }}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  {console.log(todoCard.todos, "todocard mapto") &&
                    todoCard.todos.map((items) =>
                      console.log(items, "itemsssss")
                    )}
                  {/* {console.log(todoCard.todos, "todocard mapto") &&
                    todoCard.todos.length > 0 &&
                    todoCard.todos.map((todo, listItemIndex) => (
                      <div key={listItemIndex}>
                        {console.log(todo, "listItem")}
                        <h1>bullshit</h1>
                         <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <input
                            type="checkbox"
                            onClick={() =>
                              checkBoxHandler(cardIndex, listItemIndex)
                            }
                          />
                          <p>{todo}</p>
                          <button
                            onClick={() =>
                              deleteHandler(cardIndex, listItemIndex)
                            }
                            style={{ height: "max-content" }}
                          >
                            &times;
                          </button>
                        </div>
                      </div>
                    ))} */}
                </div>
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
