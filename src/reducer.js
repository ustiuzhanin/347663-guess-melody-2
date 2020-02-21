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
  })
};

const initialState = {
  step: -1,
  errorCount: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `INCREMENT_STEP`:
      return Object.assign({}, state, {
        step: state.step + action.payload
      });
    case `INCREMENT_ERRORS`:
      return Object.assign({}, state, {
        errorCount: state.errorCount + action.payload
      });
    case `RESET_STEP`:
      return Object.assign({}, initialState);
  }
  return state;
};

export {ActionCreator, reducer};
