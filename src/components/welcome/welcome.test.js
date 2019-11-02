import React from 'react';
import Welcome from './welcome.jsx';
import renderer from 'react-test-renderer';

test(`Welcome's snapshot`, () => {
  const tree = renderer
    .create(<Welcome time={0} errorCount={0} onStartButtonClick={jest.fn()} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
