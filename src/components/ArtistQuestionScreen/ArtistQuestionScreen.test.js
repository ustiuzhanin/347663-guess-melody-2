import React from 'react';
import renderer from 'react-test-renderer';
import ArtistQuestionScreen from './ArtistQuestionScreen.jsx';

test(`ArtistQuestionScreen's shapshot`, () => {
  const tree = renderer
    .create(
        <ArtistQuestionScreen
          screenIndex={0}
          onAnswer={jest.fn()}
          question={{answers: [{}]}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
