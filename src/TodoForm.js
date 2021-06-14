import React, { useState, useEffect } from "react";
import Todos from "./Todos";

function TodoForm() {
  const [todoValue, setTodoValue] = useState("");
  const [todos, updateTodosList] = useState([]);
  const [appliedFilter, setFilter] = useState("All");

  // handling enter key pressed
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleButtonClick();
    }
  };

  const handleInputChange = (event) => {
    setTodoValue(event.target.value);
  };

  const handleButtonClick = () => {
    if (todoValue !== "") {
      const newItem = {
        id: Date.now(),
        name: todoValue,
        isDone: false,
      };
      //   console.log(newItem)
      updateTodosList((todos) => {
        var list = [newItem, ...todos];
        return list;
      });
      setTodoValue("");
    }
  };

  // handling toggle of particular todo item
  const markComplete = (id) => {
    const updatedTodo = todos.map((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
      }
      return item;
    });

    updateTodosList(updatedTodo);
  };

  // handling deletion of particular todo item
  const delTodo = (id) => {
    updateTodosList([
      ...todos.filter((todo) => {
        return todo.id !== id;
      }),
    ]);
  };


  // handling rendering filter of particular state(All,Active,Comleted)
  const currentItem = () => {
    let filterType;
    appliedFilter === "Completed" ? (filterType = true) : (filterType = false);
    return todos
      .filter((todo) => {
        return appliedFilter === "All" ? todo : todo.isDone === filterType;
      })
      .map((item) => (
        <li key={item.id}>
          <input
            type="checkbox"
            onClick={() => markComplete(item.id)}
            checked={item.isDone}
          />
          <span className="ml-3" >{item.name} </span>
          <button
            onClick={() => delTodo(item.id)}
            style={{ cursor: "pointer" }}
          >
            Delete
          </button>
        </li>
      ));
  };

  return (
    <div id="root">
      <section>
        <input
          type="text"
          value={todoValue}
          onChange={handleInputChange}
          placeholder="Enter Something..."
          onKeyDown={handleKeyPress}
        />
        {/* <input type='submit'  onClick={handleButtonClick}/> */}
      </section>
      <div className="taskList">
        <ul className="todo-list">
          {currentItem()}
        </ul>
      </div>
      <div className="btn-filter">
        <button onClick={() => setFilter("Active")}>Active</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
        <button onClick={() => setFilter("All")}>All</button>
      </div>
    </div>
  );
}

export default TodoForm;
