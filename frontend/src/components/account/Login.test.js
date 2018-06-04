import { shallow } from 'enzyme';
import React from 'react';
import { Login } from './Login';

const noop = () => {};

describe('<Login />', () => {
  test('should render <Login /> without errors', () => {
    const wrapper = shallow(<Login login={noop} loggedIn={false} location={{}} />);
    expect(wrapper).toMatchSnapshot();
  });
});
