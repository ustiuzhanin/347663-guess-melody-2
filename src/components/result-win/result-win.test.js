import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import ResultWin from "./result-win.jsx";

test(`ResultWin's snapshot`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <ResultWin time={10} errors={1} onClick={jest.fn()} />
      </BrowserRouter>
  );

  expect(tree).toMatchSnapshot();
});
