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
      let card = { todos: [], category: selectedCategoryList, id: cardId };
      let cards = [...todoCards];
      setTodoCards([...cards, card]);
      setCardId([...cards, card].length);
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
    let card = cards[cardId];
    let todo = todoItem[cardId];
    if (todo === undefined || todo === "") {
      alert("invalid");
    } else {
      let cardTodos = card.todos;
      cardTodos = [...cardTodos, { todo: todo, isChecked: false }];
      console.log(cardTodos, "cardtodos ın addtodo");
      card.todos = cardTodos;
      cards[cardId] = card;
      setTodoCards(cards);
      console.log(cards, "cards");
      let newTodoItems = [...todoItem];
      newTodoItems[cardId] = "";
      setTodoItem(newTodoItems);
    }
  };
  const deleteHandler = (cardIndex, cardId) => {
    let cards = [...todoCards];
    let card = cards[cardId];
    let cardTodos = card.todos;
    cardTodos.splice(cardIndex, 1);
    card.todos = cardTodos;
    cards[cardId] = card;
    setTodoCards(cards);
  };
  const closeHandler = (cardId) => {
    let cards = [...todoCards];
    cards.splice(cardId, 1);
    setTodoCards(cards);
    let newTodoItems = [...todoItem];
    newTodoItems[cardId] = "";
    setTodoItem(newTodoItems);
    setCardId(cards.length);
  };
  const checkBoxHandler = (cardIndex, todoIndex) => {
    let cards = [...todoCards];
    let card = cards[cardIndex];
    let cardTodos = card.todos;
    let todo = cardTodos[todoIndex];
    let isTodoChecked = !todo.isChecked;
    todo.isChecked = isTodoChecked;
    cardTodos[todoIndex] = todo;
    card.todos = cardTodos;
    cards[cardIndex] = card;
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
    console.log(categories);
    !selectedCategoryList.includes(selectedCategory)
      ? setSelectedCategoryList([...selectedCategoryList, selectedCategory])
      : setSelectedCategoryList(newSelectedCategoryList);

    /*  !selectedCategoryList.includes(selectedCategory) &&
      setSelectedCategoryList([...selectedCategoryList, selectedCategory]); */
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
        <div className="categorySection">
          <h2>Categories</h2>
          <input onChange={categoryOnChangeHandler} value={category}></input>
          <button onClick={addCategory}>add</button>
          <div className="categoryList">
            {categories.length > 0 &&
              categories.map((category, index) => (
                <div className="categoryContainer">
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
                        <p
                          style={{
                            textDecoration: item.isChecked
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {item.todo}
                        </p>
                        <button
                          onClick={() => deleteHandler(cardIndex, todoCard.id)}
                          style={{ height: "max-content" }}
                        >
                          &times;
                        </button>
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
