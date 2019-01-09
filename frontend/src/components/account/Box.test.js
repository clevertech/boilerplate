import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Box from './Box';
Enzyme.configure({ adapter: new Adapter() });
describe('<Box />', () => {
  test('should render <Box /> without errors', () => {
    const wrapper = Enzyme.shallow(<Box />);
    expect(wrapper).toMatchSnapshot();
  });
});
