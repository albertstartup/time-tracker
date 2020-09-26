import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./app/store";

import "./index.css";

const render = () => {
  const App = require("./app/App").default

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

render()

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./app/App", render);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
