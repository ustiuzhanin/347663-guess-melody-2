import {createStore} from "redux";
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";

import {reducer} from "./reducer";
import {questions} from "./mocks/questions";
import {settings} from "./mocks/settings";
import App from "./components/app/App.jsx";
import withScreenChange from "./hocs/with-screen-change/with-screen-change.jsx";

const AppWrapped = withScreenChange(App);

const init = (gameQuestions) => {
  const store = createStore(
      reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
  );

  ReactDOM.render(
      <Provider store={store}>
        <AppWrapped questions={gameQuestions} settings={settings} />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init(questions);
