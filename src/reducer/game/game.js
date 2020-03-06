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

const initialState = {
  step: -1,
  errorCount: 0,
  time: 5 * 60
};

const ActionType = {
  INCREMENT_STEP: `INCREMENT_STEP`,
  RESET_STEP: `RESET_STEP`,
  INCREMENT_ERRORS: `INCREMENT_ERRORS`,
  START_TIMER: `START_TIMER`
};

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1
  }),

  resetStep: () => ({
    type: ActionType.RESET_STEP
  }),

  incrementErrors: (userAnswer, question) => {
    let isAnswerCorrert = false;

    switch (question.type) {
      case `artist`:
        isAnswerCorrert = isArtistAnswerCorrect(userAnswer, question);
        break;
      case `genre`:
        isAnswerCorrert = isGenreAnswerCorrect(userAnswer, question);
        break;
    }

    return {
      type: ActionType.INCREMENT_ERRORS,
      payload: isAnswerCorrert ? 0 : 1
    };
  },

  startTimer: (time) => {
    return {
      type: ActionType.START_TIMER,
      payload: time
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      return Object.assign({}, state, {
        step: state.step + action.payload
      });
    case ActionType.RESET_STEP:
      return Object.assign({}, state, {
        step: -1,
        errorCount: 0,
        time: 5 * 60
      });
    case ActionType.INCREMENT_ERRORS:
      return Object.assign({}, state, {
        errorCount: state.errorCount + action.payload
      });
    case ActionType.START_TIMER:
      return Object.assign({}, state, {
        time: action.payload
      });
  }

  return state;
};

export {ActionCreator, ActionType, reducer};
