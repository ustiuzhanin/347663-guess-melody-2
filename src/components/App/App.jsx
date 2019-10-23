import React, {PureComponent} from 'react';
import Welcome from '../Welcome/Welcome.jsx';
import ArtistQuestionScreen from '../ArtistQuestionScreen/ArtistQuestionScreen.jsx';
import GenreQuestionScreen from '../GenreQuestionScreen/GenreQuestionScreen.jsx';
import PropTypes from 'prop-types';

export default class App extends PureComponent {
  static getScreen(question, props, onUserAnswer) {
    if (question === -1) {
      const {errorCount, gameTime} = props.settings;
      return (
        <Welcome
          time={gameTime}
          errorCount={errorCount}
          onStartButtonClick={onUserAnswer}
        />
      );
    }
    const {questions} = props;
    const currentQuestion = questions[question];

    switch (currentQuestion.type) {
      case `genre`:
        return (
          <GenreQuestionScreen
            screenIndex={question}
            question={currentQuestion}
            onAnswer={onUserAnswer}
          />
        );
      case `artist`:
        return (
          <ArtistQuestionScreen
            screenIndex={question}
            question={currentQuestion}
            onAnswer={onUserAnswer}
          />
        );
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      question: -1
    };
  }

  render() {
    const {question} = this.state;
    const {questions} = this.props;
    return App.getScreen(question, this.props, (usrAnswer) => {
      // eslint-disable-next-line no-console
      console.log(usrAnswer);

      this.setState((prevState) => {
        const nextIndex = prevState.question + 1;
        const isEnd = nextIndex >= questions.length;

        return {
          question: !isEnd ? nextIndex : -1
        };
      });
    });
  }
}

App.propTypes = {
  settings: PropTypes.shape({
    gameTime: PropTypes.number.isRequired,
    errorCount: PropTypes.number.isRequired
  }).isRequired,
  questions: PropTypes.array.isRequired
};
