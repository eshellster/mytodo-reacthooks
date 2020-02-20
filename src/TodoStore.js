import React, { useState, useEffect } from "react";
import "./TodoStore.css";
import List from "./List";
import useFetch from "./useFetch";
import Header from "./header";
import Form from "./Form";

export const TodoContext = React.createContext();

const App = () => {
  const [todos, setTodos] = useState([]);
  const loading = useFetch(setTodos, "http://localhost:8080/todo");

  const addTodo = newTodoTitle => {
    setTodos([
      ...todos,
      { id: todos.length + 1, title: newTodoTitle, status: "todo" }
    ]);
  };

  const changeTodoStatus = id => {
    const updateTodos = todos.map(todo => {
      if (todo.id === +id) {
        if (todo.status === "done") todo.status = "todo";
        else todo.status = "done";
      }
      return todo;
    });
    setTodos(updateTodos);
  };

  useEffect(() => {
    console.log("새로운 내용이 랜더링 됐네요", todos);
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, addTodo, loading, changeTodoStatus }}>
      <div className="App">
        <Header />

        <Form />

        <List />
      </div>
    </TodoContext.Provider>
  );
};

export default App;
