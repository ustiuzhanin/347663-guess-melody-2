import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import ResultLose from "./result-lose.jsx";

test(`ResultLose's snapshot`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <ResultLose onClick={jest.fn()} time={100} />
        </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
