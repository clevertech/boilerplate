import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Settings } from './Settings';
Enzyme.configure({ adapter: new Adapter() });

describe('<Settings />', () => {
  test('should render <Settings /> without errors', () => {
    const wrapper = Enzyme.shallow(<Settings getAccount={() => ({})} />);
    expect(wrapper).toMatchSnapshot();
  });
});
