import {reducer, ActionCreator, ActionType} from "./game";

describe(`reducer works correctly`, () => {
  it(`undefined action doesnt affect the state`, () => {
    expect(reducer(undefined, {})).toEqual({
      step: -1,
      errorCount: 0,
      time: 5 * 60
    });
  });

  it(`should increment the step by a given value`, () => {
    expect(
        reducer(
            {
              step: -1,
              errorCount: 0,
              time: 300
            },
            {type: ActionType.INCREMENT_STEP, payload: 1}
        )
    ).toEqual({
      step: 0,
      errorCount: 0,
      time: 300
    });

    expect(
        reducer(
            {
              step: -1,
              errorCount: 0,
              time: 300
            },
            {type: ActionType.INCREMENT_STEP, payload: 0}
        )
    ).toEqual({
      step: -1,
      errorCount: 0,
      time: 300
    });
  });

  it(`should increment errors by a given value`, () => {
    expect(
        reducer(
            {
              step: -1,
              errorCount: 0,
              time: 300
            },
            {type: ActionType.INCREMENT_ERRORS, payload: 1}
        )
    ).toEqual({
      errorCount: 1,
      step: -1,
      time: 300
    });

    expect(
        reducer(
            {
              step: -1,
              errorCount: 0,
              time: 300
            },
            {type: ActionType.INCREMENT_ERRORS, payload: 0}
        )
    ).toEqual({
      step: -1,
      errorCount: 0,
      time: 300
    });
  });

  it(`should reset the state`, () => {
    expect(
        reducer(
            {step: 1111, errorCount: 1112, time: 300},
            {type: ActionType.RESET_STEP}
        )
    ).toEqual({
      step: -1,
      errorCount: 0,
      time: 300
    });
  });

  it(`should start timer`, () => {
    expect(
        reducer(
            {step: 1, errorCount: 1, time: 300},
            {type: ActionType.START_TIMER, payload: 299}
        )
    ).toEqual({
      step: 1,
      errorCount: 1,
      time: 299
    });
  });
});

describe(`action creators works correctly`, () => {
  it(`incrementStep returns correct value`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: ActionType.INCREMENT_STEP,
      payload: 1
    });
  });

  it(`incrementErrors returns correct value`, () => {
    const mockQuestion = {
      type: `artist`,
      answers: [{artist: `John`}, {artist: `Brian`}],
      song: {artist: `John`}
    };

    // right answer
    expect(ActionCreator.incrementErrors(0, mockQuestion)).toEqual({
      type: ActionType.INCREMENT_ERRORS,
      payload: 0
    });

    // wrong answer (incresing errors count)
    expect(ActionCreator.incrementErrors(1, mockQuestion)).toEqual({
      type: ActionType.INCREMENT_ERRORS,
      payload: 1
    });
  });

  it(`resetStep returns correct value`, () => {
    expect(ActionCreator.resetStep()).toEqual({
      type: ActionType.RESET_STEP
    });
  });

  it(`startTimer returns correct value`, () => {
    expect(ActionCreator.startTimer(100)).toEqual({
      type: ActionType.START_TIMER,
      payload: 100
    });
  });
});
