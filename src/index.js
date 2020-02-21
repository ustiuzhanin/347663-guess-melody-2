import {createStore} from 'redux';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import {reducer} from './reducer';
import {questions} from './mocks/questions';
import {settings} from './mocks/settings';
import App from './components/app/app.jsx';

const init = (gameQuestions) => {
  const store = createStore(
      reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
  );

  ReactDOM.render(
      <Provider store={store}>
        <App questions={gameQuestions} settings={settings} />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init(questions);
