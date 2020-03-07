import {reducer, ActionType, Operations} from "./data";
import createAPI from "../../api";
import MockAdapter from "axios-mock-adapter";

describe(`reducer works correctly`, () => {
  it(`undefined action doesnt affect the state`, () => {
    expect(reducer(undefined, {})).toEqual({
      questions: [],
      loading: false
    });
  });

  it(`Should make a correct API call to /questions`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const questionLoader = Operations.loadQuestions();

    apiMock.onGet(`/questions`).reply(200, [{fake: true}]);

    return questionLoader(dispatch, jest.fn(), api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(3);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOADING_IN_PROGRESS,
        payload: true
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.LOAD_QUESTIONS,
        payload: [{fake: true}]
      });
      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.LOADING_IN_PROGRESS,
        payload: false
      });
    });
  });
});
