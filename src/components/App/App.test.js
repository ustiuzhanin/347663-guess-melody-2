import React from 'react';
import App from './App.jsx';
import renderer from 'react-test-renderer';

test(`App's snapshot`, () => {
  const tree = renderer
    .create(<App settings={{gameTime: 3, errorCount: 3}} questions={[`0`]} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
