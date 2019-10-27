import React from 'react';
import GenreQuestionScreen from './GenreQuestionScreen.jsx';
import renderer from 'react-test-renderer';

test(`GenreQuestionScreen's snapshot`, () => {
  const tree = renderer
    .create(
        <GenreQuestionScreen
          screenIndex={0}
          question={{genre: `folk`, answers: [{}, {}]}}
          onAnswer={jest.fn()}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
