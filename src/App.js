import React, { useState } from "react";
import TodoList from "./components/TodoList";
import TodoEditor from "./components/TodoEditor";
import { AiFillFileAdd } from "react-icons/ai";

import "./App.css";

function App() {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false);

  // Shows which `todo` is selected
  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo(todo);
  };

  //Function that toggles activation when there is a `selectedTodo`
  const onChangeToggle = () => {
    if (selectedTodo) {
      setSelectedTodo(null);
      setInsertToggle(!insertToggle);
    } else {
      setInsertToggle(!insertToggle);
    }
  };

  return (
    <div>
      <TodoList
        onChangeToggle={onChangeToggle}
        onChangeSelectedTodo={onChangeSelectedTodo}
      />
      <footer className="add-todo-btn" onClick={onChangeToggle}>
        <AiFillFileAdd />
      </footer>
      {insertToggle && (
        <div>
          <TodoEditor
            onChangeToggle={onChangeToggle}
            selectedTodo={selectedTodo}
          />
        </div>
      )}
    </div>
  );
}

export default App;
