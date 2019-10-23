import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.jsx';
import {questions} from './mocks/questions';

const init = (gameQuestions) => {
  const settings = {
    gameTime: 3,
    errorCount: 3
  };
  ReactDOM.render(
      <App questions={gameQuestions} settings={settings} />,
      document.querySelector(`#root`)
  );
};

init(questions);
