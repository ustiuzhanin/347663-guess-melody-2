import React from "react";
import {App} from "./app.jsx";
import renderer from "react-test-renderer";

test(`App's snapshot`, () => {
  const tree = renderer
    .create(
        <App
          settings={{gameTime: 3, maxErrors: 3}}
          questions={[`0`]}
          errorCount={2}
          onUserAnswer={jest.fn()}
          resetProgress={jest.fn()}
          startTimer={jest.fn()}
          incrementStep={jest.fn()}
          time={300}
          step={-1}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
