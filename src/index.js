import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import {compose} from "recompose";

import {reducer, Operations} from "./reducer";
// import {questions} from "./mocks/questions";
import {settings} from "./mocks/settings";
import createAPI from "./api";
import App from "./components/app/App.jsx";
import withScreenChange from "./hocs/with-screen-change/with-screen-change.jsx";

const AppWrapped = withScreenChange(App);

const init = () => {
  const api = createAPI((...args) => store.dispatch(...args));

  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : (f) => f
      )
  );

  store.dispatch(Operations.loadQuestions());

  ReactDOM.render(
      <Provider store={store}>
        <AppWrapped settings={settings} />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
