import React from 'react';
import GenreQuestionScreen from './genre-question-screen.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';

test(`GenreQuestionScreen's snapshot`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(
      <GenreQuestionScreen
        screenIndex={0}
        question={{
          genre: `folk`,
          answers: [{genre: `rock`, src: `url1`}, {genre: `pop`, src: `url2`}]
        }}
        onAnswer={jest.fn()}
      />
  );
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
