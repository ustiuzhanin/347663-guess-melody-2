import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer";

import Welcome from "../welcome/welcome.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-questionScreen/genre-question-screen.jsx";
import ErrorWidget from "../error-widget/error-widget.jsx";
import Timer from "../timer/timer.jsx";
import PropTypes from "prop-types";
import withActivePlayer from "../../hocs/with-active-player/with-active-player.jsx";
import withUserAnswer from "../../hocs/with-user-answer/with-user-answer.jsx";

const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);
const GenreQuestionScreenWrapped = withUserAnswer(
    withActivePlayer(GenreQuestionScreen)
);

class App extends PureComponent {
  getScreen(question) {
    const {maxErrors, gameTime} = this.props.settings;
    const {
      questions,
      errorCount,
      onUserAnswer,
      resetProgress,
      incrementStep,
      startTimer,
      time
    } = this.props;

    const currentQuestion = questions[question];

    if (!currentQuestion) {
      resetProgress();

      const onWelcomeScreenClick = () => {
        incrementStep();

        let counter = time;

        const timer = setInterval(() => {
          startTimer((counter -= 1));

          if (counter <= 0 || this.props.step === -1) {
            clearInterval(timer);
          }
        }, 1000);
      };

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
          <GenreQuestionScreenWrapped
            screenIndex={question}
            question={currentQuestion}
            onAnswer={(answer) =>
              onUserAnswer(answer, currentQuestion, errorCount, maxErrors)
            }
          />
        );
      case `artist`:
        return (
          <ArtistQuestionScreenWrapped
            key={question}
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
    const {step, errorCount, time} = this.props;

    return (
      <section className="game">
        <header
          style={{display: step === -1 ? `none` : `flex`}}
          className="game__header"
        >
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img
              className="game__logo"
              src="img/melody-logo-ginger.png"
              alt="Угадай мелодию"
            />
          </a>

          <Timer minutes={Math.floor(time / 60)} seconds={time % 60} />

          <div className="game__mistakes">{this.renderErrors(errorCount)}</div>
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
  step: PropTypes.number.isRequired,
  incrementStep: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    step: state.step,
    errorCount: state.errorCount,
    time: state.time
  });

const mapDispatchToProps = (dispatch) => ({
  resetProgress: () => {
    dispatch(ActionCreator.resetStep());
  },
  incrementStep: () => {
    dispatch(ActionCreator.incrementStep());
  },
  startTimer: (time) => {
    dispatch(ActionCreator.startTimer(time));
  },
  onUserAnswer: (userAnswer, question, mistakes, maxMistakes) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(
        ActionCreator.incrementErrors(userAnswer, question, mistakes, maxMistakes)
    );
  }
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
