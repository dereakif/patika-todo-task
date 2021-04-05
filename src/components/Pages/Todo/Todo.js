import { useEffect, useState } from "react";
import "./Todo.scss";
const Todo = () => {
  let fName = localStorage.getItem("firstName");
  let lName = localStorage.getItem("lastName");
  const [todoCards, setTodoCards] = useState([]);
  const [cardId, setCardId] = useState(0);
  const [todoItem, setTodoItem] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategoryList, setSelectedCategoryList] = useState([]);

  useEffect(() => {
    // console.log(todoCards, "cards", "useefect");
    console.log(todoItem, "todoItem useeffetc");
    console.log(todoCards, "testingggg");
    console.log(cardId, "cardId");
    //console.log(selectedCategoryList, "selectedCategoryList");
    //console.log(category, "category");
    //console.log(categories, "categories");
  }, [todoItem, todoCards, selectedCategoryList, cardId]);
  const createHandler = () => {
    if (selectedCategoryList.length === 0) {
      alert("first select a category");
    } else {
      let card = {
        todos: [],
        category: selectedCategoryList,
        id: cardId,
        isSaved: false,
      };
      let cards = [...todoCards];
      setTodoCards([...cards, card]);
      setCardId(cardId + 1);
    }
  };
  const onChangeHandler = (e, cardId) => {
    let itemList = [...todoItem];
    let text = e.target.value;
    itemList[cardId] = text;
    setTodoItem(itemList);
  };
  const addTodo = (cardId) => {
    let cards = [...todoCards];
    let cardIndex = cards.indexOf(cards.find((card) => card.id === cardId));
    let card = cards[cardIndex];
    console.warn(card);
    let todo = todoItem[cardId];
    console.warn(todo);
    if (todo === undefined || todo === "") {
      alert("invalid");
    } else {
      let cardTodos = card.todos;
      cardTodos = [...cardTodos, { todo: todo, isChecked: false }];
      console.log(cardTodos, "cardtodos ın addtodo");
      card.todos = cardTodos;
      cards[cardIndex] = card;
      setTodoCards(cards);
      console.log(cards, "cards");
      let newTodoItems = [...todoItem];
      newTodoItems[cardId] = "";
      setTodoItem(newTodoItems);
    }
  };
  const deleteHandler = (cardIndex, cardId) => {
    let cards = [...todoCards];
    let newCardIndex = cards.indexOf(cards.find((card) => card.id === cardId));
    let card = cards[newCardIndex];
    let cardTodos = card.todos;
    console.log(cardIndex, "cardIndex");
    console.log(cardTodos, "cardTodos");
    cardTodos.splice(cardIndex, 1);
    console.log(cardTodos, "cardTodos");
    card.todos = cardTodos;
    cards[newCardIndex] = card;
    setTodoCards(cards);
  };
  const closeHandler = (id) => {
    let cards = [...todoCards];
    let cardIndex = cards.indexOf(cards.find((card) => card.id === id));
    cards.splice(cardIndex, 1);
    setTodoCards(cards);
    let newTodoItems = [...todoItem];
    newTodoItems[id] = "";
    setTodoItem(newTodoItems);
    setCardId(cardId + 1);
  };
  const checkBoxHandler = (cardIndex, todoIndex) => {
    let cards = [...todoCards];
    let newCardIndex = cards.indexOf(
      cards.find((card) => card.id === cardIndex)
    );
    let card = cards[newCardIndex];
    let cardTodos = card.todos;
    let todo = cardTodos[todoIndex];
    let isTodoChecked = !todo.isChecked;
    todo.isChecked = isTodoChecked;
    cardTodos[todoIndex] = todo;
    card.todos = cardTodos;
    cards[newCardIndex] = card;
    setTodoCards(cards);
  };
  const categoryOnChangeHandler = (e) => {
    setCategory(e.target.value);
  };
  const addCategory = () => {
    if (category === "" || category === undefined) {
      alert("invalid category");
    } else {
      let newCategories = [...categories, category];
      setCategories(newCategories);
      setCategory("");
    }
  };
  const categoryCheckBoxHandler = (index) => {
    let selectedCategory = categories[index];
    let newSelectedCategoryList = selectedCategoryList.filter(
      (item) => item !== selectedCategory
    );
    !selectedCategoryList.includes(selectedCategory)
      ? setSelectedCategoryList([...selectedCategoryList, selectedCategory])
      : setSelectedCategoryList(newSelectedCategoryList);

    /*  !selectedCategoryList.includes(selectedCategory) &&
      setSelectedCategoryList([...selectedCategoryList, selectedCategory]); */
  };
  const saveHandler = (cardId) => {
    let cards = [...todoCards];
    console.warn(cards);
    let cardIndex = cards.indexOf(cards.find((card) => card.id === cardId));
    console.warn(cardIndex, "cardIndex");
    let card = cards[cardIndex];
    console.warn(card);
    let isCardSaved = !card.isSaved;
    console.warn(isCardSaved);
    card.isSaved = isCardSaved;
    console.warn(card);
    cards[cardIndex] = card;
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
          <div className="nameContainer">
            <p>{fName}</p>
            <p> {lName}</p>
          </div>
        </div>
        <div className="categorySection">
          <h2>Categories</h2>
          <input onChange={categoryOnChangeHandler} value={category}></input>
          <button onClick={addCategory}>add</button>
          <div className="categoryList">
            {categories.length > 0 &&
              categories.map((category, index) => (
                <div key={index} className="categoryContainer">
                  <input
                    type="checkbox"
                    onClick={() => categoryCheckBoxHandler(index)}
                  ></input>
                  <p className="category">{category}</p>
                </div>
              ))}
          </div>
          <p></p>
        </div>
      </div>

      <div className="cardContainer">
        {todoCards.length > 0 &&
          selectedCategoryList.length > 0 &&
          todoCards
            .filter((card) => {
              return card.category.every((category) =>
                selectedCategoryList.includes(category)
              );
            })
            .map((todoCard, cardIndex) => (
              <div key={cardIndex} className="card">
                <div
                  className="overlay"
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    backgroundColor: "rgba(0,0,0,.9)",
                    zIndex: "2",
                    display: todoCard.isSaved ? "flex" : "none",
                    justifyContent: "space-around",
                    alignItems: "center",
                    "&:hover": {
                      backgroundColor: "black",
                    },
                  }}
                >
                  <div
                    className="editBtn"
                    onClick={() => saveHandler(todoCard.id)}
                  >
                    Edit
                  </div>
                  <div
                    className="deleteBtn"
                    onClick={() => closeHandler(todoCard.id)}
                  >
                    Delete
                  </div>
                </div>
                <div className="cardContent">
                  <div
                    className="closeBtnCotainer"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ alignSelf: "center" }}>
                      {todoCard.category.map((item, i) => (
                        <span key={i}>{item} </span>
                      ))}
                    </div>
                    <div
                      className="closeBtn"
                      style={{
                        cursor: "pointer",
                        width: "max-content",
                        display: todoCard.isSaved ? "none" : "unset",
                      }}
                      onClick={() => closeHandler(todoCard.id)}
                    >
                      &#10006;
                    </div>
                  </div>
                  <div className="cardTitle">
                    <input type="text"></input>
                  </div>
                  <input
                    type="text"
                    value={todoItem[todoCard.id]}
                    onChange={(e) => onChangeHandler(e, todoCard.id)}
                  ></input>
                  <button onClick={() => addTodo(todoCard.id)}>add</button>
                  <div style={{ overflowY: "auto", height: "170px" }}>
                    {todoCard.todos.map((item, todoIndex) => (
                      <div className="todoContainer" key={todoIndex}>
                        <input
                          type="checkbox"
                          onClick={() =>
                            checkBoxHandler(todoCard.id, todoIndex)
                          }
                        />
                        <div
                          style={{
                            textDecoration: item.isChecked
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {item.todo}
                        </div>
                        <button
                          onClick={() => deleteHandler(todoIndex, todoCard.id)}
                          style={{ height: "max-content" }}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>

                  <div
                    className="saveBtn"
                    style={{ display: todoCard.isSaved ? "none" : "unset" }}
                    onClick={() => saveHandler(todoCard.id)}
                  >
                    SAVE
                  </div>
                </div>
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
