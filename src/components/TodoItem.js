import { useContext } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { TodoStateContext, TodoDispatchContext } from "../App";
import "./styles/TodoItem.css";

const TodoItem = ({ todo }) => {
  const { id, text, checked } = todo;
  const { onChangeToggle, onChangeSelectedTodo } = useContext(TodoStateContext);
  const { onCheck } = useContext(TodoDispatchContext);
  return (
    <div className="TodoItem">
      <div className={`content ${checked ? "checked" : ""}`}>
        {checked ? (
          <MdCheckBox
            onClick={() => {
              onCheck(id);
            }}
          />
        ) : (
          <MdCheckBoxOutlineBlank
            onClick={() => {
              onCheck(id);
            }}
          />
        )}
        <div
          className="text"
          onClick={() => {
            onChangeSelectedTodo(todo);
            onChangeToggle();
          }}
          key={todo.id}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
