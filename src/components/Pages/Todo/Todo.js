import { useEffect, useState } from "react";
import "./Todo.scss";
const Todo = () => {
  let fName = localStorage.getItem("firstName");
  let lName = localStorage.getItem("lastName");
  const [todoCards, setTodoCards] = useState([]);
  //const [todoList, setTodoList] = useState([]);
  const [todoItem, setTodoItem] = useState([]);
  useEffect(() => {
    // console.log(todoCards, "cards", "useefect");
    console.log(todoItem, "todoItem useeffetc");
  }, [todoItem]);
  const createHandler = () => {
    let cards = [...todoCards];
    let card = [];
    setTodoCards([...cards, card]);
  };
  const onChangeHandler = (e, index) => {
    let itemList = [...todoItem];
    let item = todoItem[index];
    item = e.target.value;
    itemList[index] = item;
    setTodoItem(itemList);
    console.log(e.target.value, todoItem);
  };
  const addTodo = (index) => {
    let cards = [...todoCards];
    let todos = cards[index];
    let todo = todoItem[index];
    if (todo === undefined || todo === "") {
      alert("invalid");
    } else {
      todos = [...todos, todo];
      cards[index] = todos;
      setTodoCards(cards);
      let newTodoItems = [...todoItem];

      console.log(newTodoItems, "newTodoItems", todoItem, "todoItem");
      newTodoItems[index] = "";
      setTodoItem(newTodoItems);
      console.log(newTodoItems, "newTodoItem", todoItem, "todoItem");
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
                  {todoCard.length > 0 &&
                    todoCard.map((listItem, listItemIndex) => (
                      <div key={listItemIndex}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <input type="checkbox" />
                          <p>{listItem}</p>
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
                    ))}
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
