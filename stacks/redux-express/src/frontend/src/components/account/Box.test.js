import React from 'react';
import Box from './Box';

describe('<Box />', () => {
  test('should render <Box /> without errors', () => {
    const wrapper = shallow(<Box />);
    expect(wrapper).toMatchSnapshot();
  });
});
