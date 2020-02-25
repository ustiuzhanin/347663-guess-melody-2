import React from "react";
import App from "./app.jsx";
import renderer from "react-test-renderer";

test(`App's snapshot`, () => {
  const tree = renderer
    .create(
        <App
          errorCount={2}
          time={300}
          step={-1}
          renderErrors={jest.fn()}
          getScreen={jest.fn()}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
