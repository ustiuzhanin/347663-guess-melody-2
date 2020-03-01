import React from "react";
import renderer from "react-test-renderer";
import AuthorizationScreen from "./authorization-screen.jsx";

test(`AuthorizationScreen's snapshot`, () => {
  const tree = renderer.create(
      <AuthorizationScreen onChange={jest.fn()} onSubmit={jest.fn()} />
  );

  expect(tree).toMatchSnapshot();
});
