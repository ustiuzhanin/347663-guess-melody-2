import {reducer, ActionType, ActionCreator} from "./errors";

describe(`reducer works correctly`, () => {
  it(`undefined action doesnt affect the state`, () => {
    expect(reducer(undefined, {})).toEqual({
      errorMessage: {}
    });
  });

  it(`should change the error message`, () => {
    expect(
        reducer(
            {errorMessage: {}},
            {
              type: ActionType.SHOW_ERROR_MESSAGE,
              payload: {status: `404`}
            }
        )
    ).toEqual({
      errorMessage: {status: `404`}
    });
  });
});

describe(`action creators works correctly`, () => {
  it(`showErrorMessage returns correct value`, () => {
    expect(ActionCreator.showErrorMessage(`err`)).toEqual({
      type: ActionType.SHOW_ERROR_MESSAGE,
      payload: `err`
    });
  });
});
