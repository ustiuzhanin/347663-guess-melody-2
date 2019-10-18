import React from 'react';
import Welcome from './Welcome.jsx';
import renderer from 'react-test-renderer';

test(`Welcome's snapshot`, () => {
  const tree = renderer.create(<Welcome time={0} mistakes={0} />).toJSON();

  expect(tree).toMatchSnapshot();
});
