import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Welcome from "./welcome.jsx";

Enzyme.configure({adapter: new Adapter()});

it(`game launch on click`, () => {
  const clickHandler = jest.fn();
  const welcome = shallow(
      <Welcome
        onStartButtonClick={clickHandler}
        time={100}
        errorCount={1}
        loading={false}
      />
  );

  const welcomeBtn = welcome.find(`.welcome__button`);
  welcomeBtn.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
