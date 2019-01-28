import React from 'react';
import { Settings } from './Settings';

describe('<Settings />', () => {
  test('should render <Settings /> without errors', () => {
    const wrapper = shallow(<Settings getAccount={() => ({})} />);
    expect(wrapper).toMatchSnapshot();
  });
});
