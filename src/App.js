import React, { useRef, useState, useReducer, useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoEditor from "./components/TodoEditor";
import { AiFillFileAdd } from "react-icons/ai";
import "./App.css";

//contextAPI랑 Redux(라이브러리)차이...
export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }

    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );

      break;
    }
    case "CHECK": {
      newState = state.map((todo) =>
        todo.id === action.data.id ? { ...todo, checked: !todo.checked } : todo
      );

      break;
    }
    default:
      return state;
  }
  localStorage.setItem("todo", JSON.stringify(newState));
  return newState;
};

function App() {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false);
  const todoId = useRef(0);
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const localData = localStorage.getItem("todo");

    //If `localData` exists, display in the most recent order.
    if (localData) {
      const dataList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      if (dataList.length >= 1) {
        todoId.current = parseInt(dataList[0].id) + 1;
        dispatch({ type: "INIT", data: dataList });
      }
    }
  }, []);

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

  //Function to check todo
  const onCheck = (id, text, checked) => {
    dispatch({
      type: "CHECK",
      data: {
        id,
        text,
        checked,
      },
    });
  };

  //Function to add todos to todolist
  const onCreate = (text) => {
    dispatch({
      type: "CREATE",
      data: {
        id: todoId.current,
        text,
        checked: false,
      },
    });
    todoId.current += 1;
  };

  //Function to delete todos to todolist
  const onRemove = (targetId) => {
    onChangeToggle();
    dispatch({ type: "REMOVE", targetId });
  };

  //Function to edit todos to todolist
  const onEdit = (targetId, text, checked) => {
    onChangeToggle();
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        text,
        checked,
      },
    });
  };
  return (
    <TodoStateContext.Provider
      value={{
        data,
        selectedTodo,
        onChangeToggle,
        onChangeSelectedTodo,
      }}
    >
      <TodoDispatchContext.Provider
        value={{ onCheck, onCreate, onEdit, onRemove }}
      >
        <TodoList />
        <footer className="add-todo-btn" onClick={onChangeToggle}>
          <AiFillFileAdd />
        </footer>
        {insertToggle && (
          <div>
            <TodoEditor />
          </div>
        )}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export default App;
