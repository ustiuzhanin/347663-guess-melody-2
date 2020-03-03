import React from "react";
import renderer from "react-test-renderer";
import Spinner from "./spinner.jsx";

test(`Spinner's Snapshot`, () => {
  const tree = renderer.create(<Spinner />).toJSON();

  expect(tree).toMatchSnapshot();
});
