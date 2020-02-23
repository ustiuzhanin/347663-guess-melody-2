import React from "react";
import renderer from "react-test-renderer";
import Timer from "./timer.jsx";

test(`Timer's Snapshot`, () => {
  const tree = renderer.create(<Timer minutes={4} seconds={30} />).toJSON();

  expect(tree).toMatchSnapshot();
});
