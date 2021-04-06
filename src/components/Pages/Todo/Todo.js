import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Button, TextField, Checkbox } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import "./Todo.scss";
const styles = {
  root: {
    borderColor: "white",
  },
  input: {
    color: "#310c40",
  },
};
const Todo = (props) => {
  const { classes } = props;
  let fName = localStorage.getItem("firstName");
  let lName = localStorage.getItem("lastName");
  const [todoCards, setTodoCards] = useState([]);
  const [cardId, setCardId] = useState(0);
  const [todoItem, setTodoItem] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  useEffect(() => {
    console.log(todoCards, "cards");
    console.log(categories, "categories");
  }, [todoItem, todoCards, cardId, categories]);

  const createHandler = () => {
    let selectedCategoryList = categories
      .map((item) => item.isChecked === true && item.name)
      .filter(Boolean);
    if (selectedCategoryList.length === 0) {
      alert("First select a category.");
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
    let todo = todoItem[cardId];
    if (todo === undefined || todo === "") {
      alert("Invalid input. Please enter a todo.");
    } else {
      let cardTodos = card.todos;
      cardTodos = [...cardTodos, { todo: todo, isChecked: false }];
      card.todos = cardTodos;
      cards[cardIndex] = card;
      setTodoCards(cards);
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
    cardTodos.splice(cardIndex, 1);
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
      alert("Invalid input. Plase enter a category.");
    } else if (categories.includes(category)) {
      alert("This category already exists.");
    } else {
      let newCategory = { id: categoryId, name: category, isChecked: false };
      let newCategories = [...categories, newCategory];
      setCategories(newCategories);
      setCategory("");
      setCategoryId(categoryId + 1);
    }
  };

  const categoryCheckBoxHandler = (id) => {
    let categoryIndex = categories.indexOf(
      categories.find((cat) => cat.id === id)
    );
    let newCategories = [...categories];
    let newCategory = newCategories[categoryIndex];
    newCategory.isChecked = !newCategory.isChecked;
    newCategories[categoryIndex] = newCategory;
    setCategories(newCategories);
  };

  const saveHandler = (cardId) => {
    let cards = [...todoCards];
    let cardIndex = cards.indexOf(cards.find((card) => card.id === cardId));
    let card = cards[cardIndex];
    let isCardSaved = !card.isSaved;
    card.isSaved = isCardSaved;
    cards[cardIndex] = card;
    setTodoCards(cards);
  };

  const deleteCategoryHandler = (id) => {
    let categoryIndex = categories.indexOf(
      categories.find((cat) => cat.id === id)
    );
    let newCategories = [...categories];
    let deleted = newCategories.splice(categoryIndex, 1);
    let deletedCategory = deleted[0].name;
    setCategories(newCategories);
    let cards = todoCards.filter(
      (card) => !card.category.includes(deletedCategory) && card
    );
    setTodoCards(cards);
  };

  const titleOnChangeHandler = (event, id) => {
    let cards = [...todoCards];
    let cardIndex = cards.indexOf(cards.find((card) => card.id === id));
    let card = cards[cardIndex];
    card.title = event.target.value;
    cards[cardIndex] = card;
    setTodoCards(cards);
  };

  const categoryEnterHandler = (e) => {
    e.keyCode === 13 && addCategory();
  };
  const resetAll = () => {
    setTodoCards([]);
    setCardId(0);
    setTodoItem([]);
    setCategory("");
    setCategories([]);
    setCategoryId(0);
  };
  return (
    <div className="todoPageContainer">
      <div className="column">
        <div className="userInfoContainer">
          <FontAwesomeIcon size="5x" icon={faUserCircle} />
          <div className="nameContainer">
            <div className="userFirstName">{fName}</div>
            <div className="userLastName"> {lName}</div>
          </div>
        </div>
        <div className="categorySection">
          <div id="categoryTitle">Categories</div>
          <div className="categoryInputContainer">
            <TextField
              onChange={categoryOnChangeHandler}
              onKeyDown={categoryEnterHandler}
              value={category}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Category"
              name="category"
              InputProps={{
                className: classes.input,
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                style={{ marginTop: "1rem" }}
                variant="contained"
                color="primary"
                onClick={addCategory}
              >
                Add
              </Button>
              <Button
                style={{ marginTop: "1rem" }}
                variant="contained"
                color="secondary"
                onClick={resetAll}
              >
                Reset All
              </Button>
            </div>
          </div>
          <div className="categoryList">
            {categories.length > 0 &&
              categories.map((category, index) => (
                <div key={index} className="categoryContainer">
                  <Checkbox
                    name="checkedB"
                    color="primary"
                    checked={category.isChecked}
                    onClick={() => categoryCheckBoxHandler(category.id)}
                  />

                  <p className="category">{category.name}</p>
                  <div onClick={() => deleteCategoryHandler(category.id)}>
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              ))}
          </div>
          <p></p>
        </div>
      </div>

      <div className="cardContainer">
        {todoCards.length > 0 &&
          categories.length > 0 &&
          todoCards
            .filter((card) => {
              return card.category.every((category) =>
                categories
                  .map((item) => item.isChecked === true && item.name)
                  .filter(Boolean)
                  .includes(category)
              );
            })
            .map((todoCard, cardIndex) => (
              <div key={cardIndex} className="card">
                <div
                  className="overlay"
                  style={{
                    display: todoCard.isSaved ? "flex" : "none",
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
                  <div className="closeBtnCotainer">
                    <div style={{ alignSelf: "center" }}>
                      {todoCard.category.map((item, i) => (
                        <span key={i}>{item} </span>
                      ))}
                    </div>
                    <div
                      className="closeBtn"
                      style={{
                        display: todoCard.isSaved ? "none" : "unset",
                      }}
                      onClick={() => closeHandler(todoCard.id)}
                    >
                      &#10006;
                    </div>
                  </div>
                  <div className="cardTitle">
                    <input
                      type="text"
                      value={todoCard.title}
                      onChange={(e) => titleOnChangeHandler(e, todoCard.id)}
                    ></input>
                  </div>
                  <input
                    type="text"
                    value={todoItem[todoCard.id]}
                    onChange={(e) => onChangeHandler(e, todoCard.id)}
                  ></input>
                  <button onClick={() => addTodo(todoCard.id)}>add</button>
                  <div className="todoOverflow">
                    {todoCard.todos.map((item, todoIndex) => (
                      <div className="todoContainer" key={todoIndex}>
                        <input
                          type="checkbox"
                          onClick={() =>
                            checkBoxHandler(todoCard.id, todoIndex)
                          }
                        />
                        <div
                          className="todoItem"
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
export default withStyles(styles)(Todo);
