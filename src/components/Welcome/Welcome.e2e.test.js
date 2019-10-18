import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Welcome from './Welcome';

Enzyme.configure({adapter: new Adapter()});

it(`game launch on click`, () => {
  const clickHandler = jest.fn();
  const welcome = shallow(<Welcome onClick={clickHandler} />);

  const welcomeBtn = welcome.find(`.welcome__button`);
  welcomeBtn.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
