import onChangeToggle from "../App";

const CREATE = "CREATE";
const REMOVE = "REMOVE";
const EDIT = "EDIT";
const CHECK = "CHECK";

let nextId = 1;

const onCreate = (text) => {
  return {
    type: CREATE,
    data: {
      id: nextId++,
      text,
      checked: false,
    },
  };
};

const onRemove = (targetId) => {
  return {
    onChangeToggle,
    type: REMOVE,
    targetId,
  };
};

const onEdit = (targetId, text, checked) => {
  return {
    onChangeToggle,
    type: EDIT,
    data: {
      id: targetId,
      text,
      checked,
    },
  };
};

const onCheck = (id, text, checked) => {
  return {
    type: CHECK,
    data: {
      id,
      text,
      checked,
    },
  };
};

const todoActions = { onCreate, onRemove, onEdit, onCheck };
export default todoActions;
