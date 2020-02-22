import React from 'react';
import renderer from 'react-test-renderer';
import ErrorWidget from './error-widget.jsx';

test(`ErrorWidget's snapshot`, () => {
  const tree = renderer.create(<ErrorWidget />).toJSON();

  expect(tree).toMatchSnapshot();
});
