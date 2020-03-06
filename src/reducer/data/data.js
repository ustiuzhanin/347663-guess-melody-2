const initialState = {
  questions: [],
  loading: false
};

const ActionType = {
  LOAD_QUESTIONS: `LOAD_QUESTIONS`,
  LOADING_IN_PROGRESS: `LOADING_IN_PROGRESS`
};

const ActionCreator = {
  loadQuestions: (questions) => {
    return {
      type: ActionType.LOAD_QUESTIONS,
      payload: questions
    };
  },

  loadingInProgress: (status) => {
    return {
      type: ActionType.LOADING_IN_PROGRESS,
      payload: status
    };
  }
};

const Operations = {
  loadQuestions: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.loadingInProgress(true));

    return api.get(`/questions`).then((response) => {
      dispatch(ActionCreator.loadQuestions(response.data));
      dispatch(ActionCreator.loadingInProgress(false));
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_QUESTIONS:
      return Object.assign({}, state, {
        questions: action.payload
      });
  }

  return state;
};

export {ActionCreator, ActionType, Operations, reducer};
