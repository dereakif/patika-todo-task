import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Button, TextField, Checkbox } from "@material-ui/core";
import "./Todo.scss";

const Todo = () => {
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
  const todoEnterHandler = (e, id) => {
    e.keyCode === 13 && addTodo(id);
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
              error={category === " "}
              onChange={categoryOnChangeHandler}
              onKeyDown={categoryEnterHandler}
              value={category}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Category"
              name="category"
              inputProps={{
                style: {
                  fontWeight: "500",
                  fontSize: "20px",
                  textTransform: "capitalize",
                  color: "#40426E",
                },
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                className="addCategory"
                style={{ marginTop: "1rem" }}
                variant="contained"
                onClick={addCategory}
              >
                Add
              </Button>
              <Button
                className="resetAll"
                style={{ marginTop: "1rem" }}
                variant="contained"
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
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Checkbox
                      name="categoryCheckbox"
                      checked={category.isChecked}
                      onClick={() => categoryCheckBoxHandler(category.id)}
                      style={{ color: "#2f3275" }}
                    />

                    <p className="category">{category.name}</p>
                  </div>
                  <FontAwesomeIcon
                    onClick={() => deleteCategoryHandler(category.id)}
                    icon={faTrashAlt}
                    style={{ cursor: "pointer" }}
                  />
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
                  <Button
                    className="editBtn"
                    onClick={() => saveHandler(todoCard.id)}
                    variant="contained"
                  >
                    Edit
                  </Button>
                  <Button
                    className="deleteBtn"
                    onClick={() => closeHandler(todoCard.id)}
                    variant="contained"
                  >
                    Delete
                  </Button>
                </div>
                <div className="cardContent">
                  <div className="closeBtnCotainer">
                    <div style={{ alignSelf: "center" }}>
                      {todoCard.category.length > 1
                        ? "Categories: "
                        : "Category: "}
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
                    {todoCard.isSaved ? (
                      <h2>{todoCard.title}</h2>
                    ) : (
                      <TextField
                        error={todoCard.title === " "}
                        value={todoCard.title}
                        onChange={(e) => titleOnChangeHandler(e, todoCard.id)}
                        inputProps={{
                          style: {
                            textAlign: "center",
                            fontWeight: "600",
                            fontSize: "24px",
                            textTransform: "uppercase",
                            color: "#40426E",
                          },
                        }}
                        label="Title"
                        id="todo-title"
                        variant="filled"
                        size="small"
                      />
                    )}
                  </div>
                  <div
                    style={{
                      display: todoCard.isSaved ? "none" : "inherit",
                      margin: "1rem 0",
                    }}
                  >
                    <TextField
                      error={todoItem[todoCard.id] === " "}
                      value={todoItem[todoCard.id]}
                      onChange={(e) => onChangeHandler(e, todoCard.id)}
                      onKeyDown={(e) => todoEnterHandler(e, todoCard.id)}
                      inputProps={{
                        style: { textAlign: "center", fontWeight: "500" },
                      }}
                      label="Todo"
                      id="todo-item"
                      size="small"
                    />
                    <Button
                      className="todoAdd"
                      style={{ marginTop: "1rem" }}
                      variant="contained"
                      onClick={() => addTodo(todoCard.id)}
                    >
                      Add
                    </Button>
                  </div>
                  <div
                    className="todoOverflow"
                    style={{
                      height: todoCard.isSaved && "240px",
                      display: todoCard.isSaved && "flex",
                      flexDirection: todoCard.isSaved && "column",
                      flexWrap: todoCard.isSaved && "wrap",
                      margin: todoCard.isSaved && "30px",
                    }}
                  >
                    {todoCard.todos.map((item, todoIndex) => (
                      <div className="todoContainer" key={todoIndex}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Checkbox
                            style={{
                              display: todoCard.isSaved ? "none" : "unset",
                            }}
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
                        </div>
                        <FontAwesomeIcon
                          onClick={() => deleteHandler(todoIndex, todoCard.id)}
                          icon={faTrashAlt}
                          style={{
                            display: todoCard.isSaved ? "none" : "unset",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={() => saveHandler(todoCard.id)}
                  className="saveBtn"
                  style={{ display: todoCard.isSaved ? "none" : "unset" }}
                  variant="contained"
                >
                  SAVE
                </Button>
              </div>
            ))}
        <div className="createCard card">
          <h1>NEW PROJECT</h1>
          <Button
            className="createBtn"
            style={{ margin: "auto" }}
            variant="contained"
            onClick={createHandler}
          >
            CREATE
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Todo;
