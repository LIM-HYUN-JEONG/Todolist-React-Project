import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { AiFillFileAdd } from "react-icons/ai";
import "./styles/TodoEditor.css";
import { useDispatch } from "react-redux";
import allActions from "../actions/index";

const TodoEditor = ({ onChangeToggle, selectedTodo }) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const onChange = (e) => {
    setValue(e.target.value);
  };

  //Function to submit when adding a `todo`
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(allActions.todoActions.onCreate(value));
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
                  dispatch(
                    allActions.todoActions.onEdit(selectedTodo.id, value)
                  );
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
                  dispatch(
                    allActions.todoActions.onEdit(selectedTodo.id, value)
                  );
                  onChangeToggle();
                }}
              />
              <FaTrash
                onClick={() => {
                  dispatch(allActions.todoActions.onRemove(selectedTodo.id));
                  onChangeToggle();
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
