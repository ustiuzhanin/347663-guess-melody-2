// import {reducer, ActionCreator} from './reducer';

// describe(`reducer works correctly`, () => {
//   it(`undefined action doesnt affect the state`, () => {
//     expect(reducer(undefined, {})).toEqual({
//       step: -1,
//       errorCount: 0
//     });
//   });

//   it(`should increment the step by a given value`, () => {
//     expect(
//         reducer(
//             {
//               step: -1,
//               errorCount: 0
//             },
//             {type: `INCREMENT_STEP`, payload: 1}
//         )
//     ).toEqual({
//       step: 0,
//       errorCount: 0
//     });

//     expect(
//         reducer(
//             {
//               step: -1,
//               errorCount: 0
//             },
//             {type: `INCREMENT_STEP`, payload: 0}
//         )
//     ).toEqual({
//       step: -1,
//       errorCount: 0
//     });
//   });

//   it(`should increment errors by a given value`, () => {
//     expect(
//         reducer(
//             {
//               step: -1,
//               errorCount: 0
//             },
//             {type: `INCREMENT_ERROR`, payload: 1}
//         )
//     ).toEqual({
//       step: -1,
//       errorCount: 1
//     });

//     expect(
//         reducer(
//             {
//               step: -1,
//               errorCount: 0
//             },
//             {type: `INCREMENT_ERROR`, payload: 0}
//         )
//     ).toEqual({
//       step: -1,
//       errorCount: 0
//     });
//   });

//   it(`should reset the state`, () => {
//     expect(reducer({step: 1111, errorCount: 1112}, {type: `RESET`})).toEqual({
//       step: -1,
//       errorCount: 0
//     });
//   });
// });

// describe(`action creators works correctly`, () => {
//   it(`incrementStep returns correct value`, () => {
//     expect(ActionCreator.incrementStep()).toEqual({
//       type: `INCREMENT_STEP`,
//       payload: 1
//     });
//   });
// });
