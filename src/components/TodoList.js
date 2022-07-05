import TodoItem from "./TodoItem";
import "./styles/TodoList.css";

import { useSelector } from "react-redux";

const TodoList = ({ onChangeToggle, onChangeSelectedTodo }) => {
  const todoReducer = useSelector((state) => state.todoReducer);

  //Filter out unfinished tasks
  const notDone = todoReducer.filter((todo) => !todo.checked);

  return (
    <div className="TodoList">
      <div className="Template">
        <div className="title">오늘의 할 일 ({notDone.length})</div>
        <section className="section">
          {todoReducer.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onChangeToggle={onChangeToggle}
              onChangeSelectedTodo={onChangeSelectedTodo}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default TodoList;
