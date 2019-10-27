import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.jsx';
import {questions} from './mocks/questions';
import {settings} from './mocks/settings';

const init = (gameQuestions) => {
  ReactDOM.render(
      <App questions={gameQuestions} settings={settings} />,
      document.querySelector(`#root`)
  );
};

init(questions);
