// import {reducer, ActionType, ActionCreator} from "./user";
import {reducer, ActionType, Operations} from "./user";
import MockAdapter from "axios-mock-adapter";
import createAPI from "../../api";

describe(`reducer works correctly`, () => {
  it(`undefined action doesnt affect the state`, () => {
    expect(reducer(undefined, {})).toEqual({
      user: ``,
      isAuthorizationRequired: true
    });
  });

  it(`Should make a correct API call to /login`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const loginRequest = Operations.requestSignUp(`qq@gmail.com`, `123`);

    apiMock.onPost(`/login`).reply(200, [{fake: true}]);

    return loginRequest(dispatch, jest.fn(), api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.REQUEST_SIGNUP,
        payload: [{fake: true}]
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.REQUIRED_AUTHORIZATION,
        payload: false
      });
    });
  });
});
