import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GenreQuestionScreen from './genre-question-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`check the type of user's answer data`, () => {
  const getUserAnswer = jest.fn((answr) => {
    expect(answr instanceof Array).toBeTruthy();
  });

  const genreQuestionScreen = shallow(
      <GenreQuestionScreen
        screenIndex={0}
        question={{
          genre: `rock`,
          answers: [{genre: `rock`, src: `url1`}, {genre: `pop`, src: `url2`}]
        }}
        onAnswer={getUserAnswer}
      />
  );

  const answerButton = genreQuestionScreen.find(`.game__input`);
  answerButton.at(0).simulate(`click`, {target: {value: [`mockAnswer`]}});

  const gameSubmit = genreQuestionScreen.find(`.game__tracks`);
  gameSubmit.simulate(`submit`, {preventDefault() {}});
});
