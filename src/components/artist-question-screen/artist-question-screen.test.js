import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ArtistQuestionScreen from './artist-question-screen.jsx';

test(`ArtistQuestionScreen's shapshot`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(
      <ArtistQuestionScreen
        screenIndex={0}
        onAnswer={jest.fn()}
        question={{answers: [{}], song: {artist: `str`, src: `str`}}}
      />
  );

  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
