const INITIAL_STATE = [];

//it보다는 todo로 명확하게

function todoReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }

    case "CREATE": {
      state = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      state = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      state = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    case "CHECK": {
      state = state.map((todo) =>
        todo.id === action.data.id ? { ...todo, checked: !todo.checked } : todo
      );

      break;
    }
    default:
      return state;
  }

  return state;
}

export default todoReducer;
