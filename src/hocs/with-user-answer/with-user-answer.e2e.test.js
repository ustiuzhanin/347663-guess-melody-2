import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withUserAnswer from "./with-user-answer.jsx";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withUserAnswer(MockComponent);
const mock = {target: {value: 1, checked: true}};

it(`Should change user answer on click`, () => {
  const wrapper = shallow(<MockComponentWrapped onAnswer={jest.fn()} />);

  expect(wrapper.state().userAnswer).toEqual([]);

  wrapper.simulate(`click`, mock);
  expect(wrapper.state().userAnswer).toEqual([1]);
});
