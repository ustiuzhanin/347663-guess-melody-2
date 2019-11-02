import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ArtistQuestionScreen from './artist-question-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`check the type of user's answer data`, () => {
  const getUserAnswer = jest.fn((answr) => {
    expect(typeof answr === `string`).toBeTruthy();
  });

  const artistQuestionScreen = shallow(
      <ArtistQuestionScreen
        screenIndex={2}
        question={{
          answers: [{artist: `Snow`, picture: `http://placehold.it/134x134`}],
          song: {artist: `str`, src: `str`}
        }}
        onAnswer={getUserAnswer}
      />
  );

  const gameAnswer = artistQuestionScreen.find(`.artist__input`);
  gameAnswer.simulate(`click`, {target: {value: `33`}});
});
