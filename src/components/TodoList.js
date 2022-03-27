import { useContext } from "react";
import { TodoStateContext } from "../App";
import TodoItem from "./TodoItem";
import "./styles/TodoList.css";

const TodoList = () => {
  const todos = useContext(TodoStateContext);
  const todoList = todos.data;

  //Filter out unfinished tasks
  const notDone = todoList.filter((todo) => !todo.checked);

  return (
    <div className="TodoList">
      <div className="Template">
        <div className="title">오늘의 할 일 ({notDone.length})</div>
        <section className="section">
          {todoList.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default TodoList;
