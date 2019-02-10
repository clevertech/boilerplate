import { shallow } from 'enzyme';
import React from 'react';
import { LoginTwoFactor } from './LoginTwoFactor';

const noop = () => {};

describe('<LoginTwoFactor />', () => {
  test('should render <LoginTwoFactor /> without errors', () => {
    const wrapper = shallow(
      <LoginTwoFactor twoFactor={{}} loginTwoFactor={noop} location={{}} loggedIn={false} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
