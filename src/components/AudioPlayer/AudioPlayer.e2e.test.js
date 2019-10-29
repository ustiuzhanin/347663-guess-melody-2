import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AudioPlayer from './AudioPlayer.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`check the playing status`, () => {
  const clickHandler = jest.fn();
  const audioplayer = mount(
      <AudioPlayer
        isPlaying={false}
        onPlayButtonClick={clickHandler}
        src='url1'
      />
  );

  // to fix console error
  audioplayer.instance().audioRef.current.pause = jest.fn();

  audioplayer.setState({isLoading: false});

  expect(audioplayer.state().isPlaying).toBeFalsy();

  const playBtn = audioplayer.find(`button`);
  playBtn.simulate(`click`);

  expect(audioplayer.state().isPlaying).toBeTruthy();
});
