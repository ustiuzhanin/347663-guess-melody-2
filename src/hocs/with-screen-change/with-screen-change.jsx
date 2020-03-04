import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {compose} from "recompose";
import {Switch, Route, Redirect, withRouter} from "react-router-dom";
import PrivateRoute from "../with-private-route/with-private-route.jsx";

import ArtistQuestionScreen from "../../components/artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../../components/genre-questionScreen/genre-question-screen.jsx";
import Welcome from "../../components/welcome/welcome.jsx";
import AuthorizationScreen from "../../components/authorization-screen/authorization-screen.jsx";
import ErrorWidget from "../../components/error-widget/error-widget.jsx";
import ResultLose from "../../components/result-lose/result-lose.jsx";
import ResultWin from "../../components/result-win/result-win.jsx";
import ModalError from "../../components/modal-error/modal-error.jsx";

import withActivePlayer from "../with-active-player/with-active-player.jsx";
import withUserAnswer from "../with-user-answer/with-user-answer.jsx";
import withUserAuth from "../with-user-auth/with-user-auth.jsx";

import {ActionCreator} from "../../reducer";

import PropTypes from "prop-types";

const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);
const GenreQuestionScreenWrapped = withUserAnswer(
    withActivePlayer(GenreQuestionScreen)
);
const AuthorizationScreenWrapped = withRouter(
    withUserAuth(AuthorizationScreen)
);

const withScreenChange = (Component) => {
  class WithScreenChange extends PureComponent {
    constructor(props) {
      super(props);

      this.runTimer = this.runTimer.bind(this);
      this.stopTimer = this.stopTimer.bind(this);
      this.getScreen = this.getScreen.bind(this);
    }

    runTimer(time) {
      const {startTimer} = this.props;

      this.timer = setInterval(() => {
        startTimer((time -= 1));
      }, 1000);
    }

    stopTimer() {
      clearInterval(this.timer);
    }

    getScreen(question) {
      const {maxErrors, gameTime} = this.props.settings;
      const {
        questions,
        errorCount,
        onUserAnswer,
        resetProgress,
        incrementStep,
        time,
        step,
        loading
      } = this.props;

      const currentQuestion = questions[question];

      if (step >= questions.length) {
        this.stopTimer();

        return <Redirect to="/win" />;
      }

      if (errorCount >= maxErrors || time <= 0) {
        resetProgress();
        this.stopTimer();
        return <Redirect to="/lose" />;
      }

      if (step === -1) {
        resetProgress();

        const onWelcomeScreenClick = () => {
          incrementStep();

          this.runTimer(time);
        };

        return (
          <Welcome
            time={gameTime}
            errorCount={maxErrors}
            onStartButtonClick={onWelcomeScreenClick}
            loading={loading}
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
      const {isAuthorizationRequired, errorMessage} = this.props;
      const showMessage = Object.entries(errorMessage).length !== 0 && (
        <ModalError errorMessage={errorMessage} />
      );

      return (
        <Switch>
          {showMessage}
          <Route
            path="/auth"
            render={() => (
              <AuthorizationScreenWrapped
                isAuthorizationRequired={isAuthorizationRequired}
              />
            )}
          />
          <PrivateRoute
            path="/"
            exact
            isAuthorizationRequired={isAuthorizationRequired}
          >
            <Component
              {...this.props}
              getScreen={(question) => this.getScreen(question)}
              renderErrors={(errors) => this.renderErrors(errors)}
            />
          </PrivateRoute>

          <Route path="/lose" component={ResultLose} />

          <Route
            path="/win"
            render={() => (
              <ResultWin
                time={this.props.time}
                errors={this.props.errorCount}
                onClick={this.props.resetProgress}
              />
            )}
          />
        </Switch>
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
    loading: PropTypes.bool.isRequired,
    incrementStep: PropTypes.func.isRequired,
    startTimer: PropTypes.func.isRequired,
    errorMessage: PropTypes.object.isRequired,
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
    loading: state.loading,
    questions: state.questions,
    errorMessage: state.errorMessage,
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
