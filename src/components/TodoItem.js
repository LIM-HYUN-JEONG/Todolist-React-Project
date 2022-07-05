import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import "./styles/TodoItem.css";
import { useDispatch } from "react-redux";
import allActions from "../actions/index";

const TodoItem = ({ todo, onChangeToggle, onChangeSelectedTodo }) => {
  const { id, text, checked } = todo;

  const dispatch = useDispatch();

  //css통일성을 갖게만들기, 리액트 컴포넌트네이밍 기법
  //스타일css ,scss를 사용할때랑 헷갈릴 가능성이 있어서 네이밍규칙을 지키기

  return (
    <div className="TodoItem">
      <div className={`content ${checked ? "checked" : ""}`}>
        {checked ? (
          <MdCheckBox
            onClick={() => {
              dispatch(allActions.todoActions.onCheck(id));
            }}
          />
        ) : (
          <MdCheckBoxOutlineBlank
            onClick={() => {
              dispatch(allActions.todoActions.onCheck(id));
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
