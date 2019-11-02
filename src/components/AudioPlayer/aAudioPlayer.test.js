import React from 'react';
import renderer from 'react-test-renderer';
import AudioPlayer from './AudioPlayer.jsx';

test(`AudioPlayer snapshot's`, () => {
  const tree = renderer
    .create(
        <AudioPlayer
          isPlaying={false}
          onPlayButtonClick={jest.fn()}
          src='url1'
        />,
        {
          createNodeMock: (element) => {
            if (element.type === `audio`) {
              return {
                oncanplaythrough: jest.fn(),
                onplay: jest.fn(),
                onpause: jest.fn(),
                ontimeupdate: jest.fn(),
                src: `ss`
              };
            }
            return null;
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
