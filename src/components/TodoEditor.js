import { useEffect, useState, useContext } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { AiFillFileAdd } from "react-icons/ai";
import { TodoDispatchContext, TodoStateContext } from "../App";
import "./styles/TodoEditor.css";

const TodoEditor = () => {
  const { onCreate, onEdit, onRemove } = useContext(TodoDispatchContext);
  const { onChangeToggle, selectedTodo } = useContext(TodoStateContext);
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  //Function to submit when adding a `todo`
  const onSubmit = (e) => {
    e.preventDefault();
    onCreate(value);
    setValue("");
    onChangeToggle();
  };

  //When the `selectedTodo` changes,
  //Function that setValue the `selectedTodo` text
  useEffect(() => {
    if (selectedTodo) {
      setValue(selectedTodo.text);
    }
  }, [selectedTodo]);

  return (
    <div>
      <div className="background" onClick={onChangeToggle}></div>
      <div>
        <form
          onSubmit={
            selectedTodo
              ? () => {
                  onEdit(selectedTodo.id, value);
                }
              : onSubmit
          }
        >
          <textarea
            placeholder="To Do"
            value={value}
            onChange={onChange}
            autoFocus
          />
          {selectedTodo ? (
            <div className="edit">
              <FaEdit
                onClick={() => {
                  onEdit(selectedTodo.id, value);
                }}
              />
              <FaTrash
                onClick={() => {
                  onRemove(selectedTodo.id);
                }}
              />
            </div>
          ) : (
            <button type="submit" className="add">
              <AiFillFileAdd />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default TodoEditor;
