const isArtistAnswerCorrect = (userAnswer, question) => {
  return question.answers[userAnswer].artist === question.song.artist;
};

const isGenreAnswerCorrect = (userAnswer, question) => {
  const rightAnswers = question.answers
    .map((answer, i) => {
      if (answer.genre === question.genre) {
        return i;
      }
      return null;
    })
    .filter((item) => item !== null);

  if (rightAnswers.length === userAnswer.length) {
    return rightAnswers.every((answer) => {
      return userAnswer.indexOf(answer) !== -1;
    });
  }
  return false;
};

const ActionCreator = {
  incrementStep: () => ({
    type: `INCREMENT_STEP`,
    payload: 1
  }),

  incrementErrors: (userAnswer, question, errors, maxErrors) => {
    let isAnswerCorrert = false;

    switch (question.type) {
      case `artist`:
        isAnswerCorrert = isArtistAnswerCorrect(userAnswer, question);
        break;
      case `genre`:
        isAnswerCorrert = isGenreAnswerCorrect(userAnswer, question);
        break;
    }

    if (!isAnswerCorrert && errors + 1 >= maxErrors) {
      return {
        type: `RESET_STEP`
      };
    }

    return {
      type: `INCREMENT_ERRORS`,
      payload: isAnswerCorrert ? 0 : 1
    };
  },

  resetStep: () => ({
    type: `RESET_STEP`
  }),

  startTimer: (time) => ({
    type: `START_TIMER`,
    payload: time
  }),

  loadQuestions: (questions) => {
    return {
      type: `LOAD_QUESTIONS`,
      payload: questions
    };
  },

  requestSignUp: (user) => {
    return {
      type: `REQUEST_SIGNUP`,
      payload: user
    };
  },

  requireAuthorization: (status) => {
    return {
      type: `REQUIRED_AUTHORIZATION`,
      payload: status
    };
  }
};

const initialState = {
  step: -1,
  errorCount: 0,
  time: 5 * 60,
  questions: [],
  isAuthorizationRequired: true,
  user: ``
};

const Operations = {
  loadQuestions: () => (dispatch, getState, api) => {
    return api.get(`/questions`).then((response) => {
      dispatch(ActionCreator.loadQuestions(response.data));
    });
  },
  requestSignUp: (email, password) => (dispatch, _, api) => {
    return api.post(`/login`, {email, password}).then((response) => {
      dispatch(ActionCreator.requestSignUp(response.request.response));
      dispatch(ActionCreator.requireAuthorization(false));
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `LOAD_QUESTIONS`:
      return Object.assign({}, state, {
        questions: action.payload
      });
    case `REQUEST_SIGNUP`:
      return Object.assign({}, state, {
        user: action.payload
      });
    case `INCREMENT_STEP`:
      return Object.assign({}, state, {
        step: state.step + action.payload
      });
    case `INCREMENT_ERRORS`:
      return Object.assign({}, state, {
        errorCount: state.errorCount + action.payload
      });
    case `RESET_STEP`:
      return Object.assign({}, state, {
        step: -1,
        errorCount: 0,
        time: 5 * 60
      });
    case `START_TIMER`:
      return Object.assign({}, state, {
        time: action.payload
      });
    case `REQUIRED_AUTHORIZATION`:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload
      });
  }
  return state;
};

export {ActionCreator, reducer, Operations};
