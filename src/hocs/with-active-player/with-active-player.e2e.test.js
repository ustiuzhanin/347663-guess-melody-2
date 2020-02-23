import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withActivePlayer from "./with-active-player.jsx";

configure({adapter: new Adapter()});

const onPlayButtonClick = jest.fn();
const MockComponent = () => <div onClick={onPlayButtonClick} />;
const MockComponentWrapped = withActivePlayer(MockComponent);

it(`Should change activePlayer when user clicks on onPlayButtonClick`, () => {
  const wrapper = shallow(
      <MockComponentWrapped onPlayButtonClick={onPlayButtonClick} />
  );

  expect(wrapper.state().activePlayer).toEqual(-1);
});
