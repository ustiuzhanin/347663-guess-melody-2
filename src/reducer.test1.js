import {reducer, ActionCreator} from "./reducer";

describe(`reducer works correctly`, () => {
  it(`undefined action doesnt affect the state`, () => {
    expect(reducer(undefined, {})).toEqual({
      step: -1,
      errorCount: 0,
      time: 300,
      questions: [],
      isAuthorizationRequired: true,
      user: ``,
      loading: false,
      errorMessage: {}
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
            {type: `INCREMENT_STEP`, payload: 1}
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
            {type: `INCREMENT_STEP`, payload: 0}
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
            {type: `INCREMENT_ERRORS`, payload: 1}
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
            {type: `INCREMENT_ERRORS`, payload: 0}
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
            {type: `RESET_STEP`}
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
            {type: `START_TIMER`, payload: 299}
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
      type: `INCREMENT_STEP`,
      payload: 1
    });
  });

  it(`incrementErrors returns correct value`, () => {
    // expect(ActionCreator.incrementErrors(0, {}, 5, 4)).toEqual({
    //   type: `RESET_STEP`
    // });

    // TODO: change incrementErrors() arguments

    const mockQuestion = {
      type: `artist`,
      answers: [{artist: `John`}, {artist: `Brian`}],
      song: {artist: `John`}
    };

    // right answer
    expect(ActionCreator.incrementErrors(0, mockQuestion, 0, 3)).toEqual({
      type: `INCREMENT_ERRORS`,
      payload: 0
    });

    // wrong answer (incresing mistakes count)
    expect(ActionCreator.incrementErrors(1, mockQuestion, 0, 3)).toEqual({
      type: `INCREMENT_ERRORS`,
      payload: 1
    });

    // wrong answer resets the state because the max amount of mistakes has been reached
    // expect(ActionCreator.incrementErrors(1, mockQuestion, 2, 3)).toEqual({
    //   type: `RESET_STEP`
    // });
  });

  it(`resetStep returns correct value`, () => {
    expect(ActionCreator.resetStep()).toEqual({
      type: `RESET_STEP`
    });
  });

  it(`startTimer returns correct value`, () => {
    expect(ActionCreator.startTimer(100)).toEqual({
      type: `START_TIMER`,
      payload: 100
    });
  });
});
