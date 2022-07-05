import { combineReducers } from "redux";
import todoReducer from "./todoReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "todos",
  storage: storage,
};

const rootReducer = combineReducers({
  todoReducer,
});

export default persistReducer(persistConfig, rootReducer);
