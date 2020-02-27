import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {compose} from "recompose";

import ArtistQuestionScreen from "../../components/artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../../components/genre-questionScreen/genre-question-screen.jsx";
import Welcome from "../../components/welcome/welcome.jsx";
import AuthorizationScreen from "../../components/authorization-screen/authorization-screen.jsx";
import withActivePlayer from "../with-active-player/with-active-player.jsx";
import withUserAnswer from "../with-user-answer/with-user-answer.jsx";
import ErrorWidget from "../../components/error-widget/error-widget.jsx";
import {ActionCreator} from "../../reducer";

import PropTypes from "prop-types";

const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);
const GenreQuestionScreenWrapped = withUserAnswer(
    withActivePlayer(GenreQuestionScreen)
);

const withScreenChange = (Component) => {
  class WithScreenChange extends PureComponent {
    constructor(props) {
      super(props);
    }

    getScreen(question) {
      const {maxErrors, gameTime} = this.props.settings;
      const {
        questions,
        errorCount,
        onUserAnswer,
        resetProgress,
        incrementStep,
        startTimer,
        time,
        isAuthorizationRequired
      } = this.props;

      const currentQuestion = questions[question];

      if (isAuthorizationRequired) {
        return <AuthorizationScreen />;
      }

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
      return (
        <Component
          {...this.props}
          getScreen={(question) => this.getScreen(question)}
          renderErrors={(errors) => this.renderErrors(errors)}
        />
      );
    }
  }

  WithScreenChange.defaultProps = {
    settings: {gameTime: 5, maxErrors: 3}
  };

  WithScreenChange.propTypes = {
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
    time: PropTypes.number.isRequired,
    isAuthorizationRequired: PropTypes.bool.isRequired
  };

  return WithScreenChange;
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    step: state.step,
    errorCount: state.errorCount,
    time: state.time,
    questions: state.questions,
    isAuthorizationRequired: state.isAuthorizationRequired
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

export {withScreenChange};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withScreenChange
);
