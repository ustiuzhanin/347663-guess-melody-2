import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer';

import Welcome from '../welcome/welcome.jsx';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen.jsx';
import GenreQuestionScreen from '../genre-questionScreen/genre-question-screen.jsx';
import ErrorWidget from '../error-widget/error-widget.jsx';
import PropTypes from 'prop-types';

class App extends PureComponent {
  getScreen(question) {
    const {maxErrors, gameTime} = this.props.settings;
    const {
      questions,
      errorCount,
      onUserAnswer,
      resetProgress,
      onWelcomeScreenClick
    } = this.props;

    const currentQuestion = questions[question];

    if (!currentQuestion) {
      resetProgress();

      return (
        <Welcome
          time={gameTime}
          errorCount={maxErrors}
          onStartButtonClick={onWelcomeScreenClick}
        />
      );
    }

    switch (currentQuestion.type) {
      case `genre`:
        return (
          <GenreQuestionScreen
            screenIndex={question}
            question={currentQuestion}
            onAnswer={(answer) =>
              onUserAnswer(answer, currentQuestion, errorCount, maxErrors)
            }
          />
        );
      case `artist`:
        return (
          <ArtistQuestionScreen
            screenIndex={question}
            question={currentQuestion}
            onAnswer={(answer) =>
              onUserAnswer(answer, currentQuestion, errorCount, maxErrors)
            }
          />
        );
    }

    return null;
  }

  renderErrors(errors) {
    return Array.from({length: errors}).map((e, i) => (
      <ErrorWidget key={`error-${i}`} />
    ));
  }

  render() {
    const {step, errorCount} = this.props;

    return (
      <section className='game'>
        <header
          style={{display: step === -1 ? `none` : `flex`}}
          className='game__header'
        >
          <a className='game__back' href='#'>
            <span className='visually-hidden'>Сыграть ещё раз</span>
            <img
              className='game__logo'
              src='img/melody-logo-ginger.png'
              alt='Угадай мелодию'
            />
          </a>

          <div className='timer__value'>
            <span className='timer__mins'>05</span>
            <span className='timer__dots'>:</span>
            <span className='timer__secs'>00</span>
          </div>

          <div className='game__mistakes'>{this.renderErrors(errorCount)}</div>
        </header>

        {this.getScreen(step)}
      </section>
    );
  }
}

App.defaultProps = {
  settings: {gameTime: 5, maxErrors: 3}
};

App.propTypes = {
  settings: PropTypes.shape({
    gameTime: PropTypes.number.isRequired,
    maxErrors: PropTypes.number.isRequired
  }).isRequired,
  questions: PropTypes.array.isRequired,
  errorCount: PropTypes.number.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  resetProgress: PropTypes.func.isRequired,
  onWelcomeScreenClick: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    step: state.step,
    errorCount: state.errorCount
  });

const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: () => {
    dispatch(ActionCreator.incrementStep());
  },
  resetProgress: () => {
    dispatch(ActionCreator.resetStep());
  },
  onUserAnswer: (userAnswer, question, mistakes, maxMistakes) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(
        ActionCreator.incrementErrors(userAnswer, question, mistakes, maxMistakes)
    );
  }
});

export {App};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);