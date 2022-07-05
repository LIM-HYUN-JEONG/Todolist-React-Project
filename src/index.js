import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./index.css";

import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import rootReducer from "./reducers/index";
import { createStore } from "redux";

const store = createStore(rootReducer);
const persistor = persistStore(store);

//db.json사용해보기

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
